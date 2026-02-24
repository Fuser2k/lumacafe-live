import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Environment variables (Simulated for this stage, ideally from .env)
const PORT = process.env.PORT || 3001;
// In production, this should be in .env
const JWT_SECRET = process.env.JWT_SECRET || 'very_secret_key_change_me';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy for Traefik/Nginx
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', 'https://luma.cafe', 'https://www.luma.cafe']
}));
app.use(express.json());

// Rate Limiting
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: "{ \"error\": \"Too many login attempts, please try again after 15 minutes\" }",
    standardHeaders: true,
    legacyHeaders: false,
    // Disable strict validation to work with Traefik
    validate: { xForwardedForHeader: false }
});

// Serve static files (uploaded PDFs and images)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// File Storage Config (Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/uploads'));
    },
    filename: (req, file, cb) => {
        // ALWAYS save as menu.pdf to replace the old one
        cb(null, 'menu.pdf');
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Image Upload Config
const SIGNATURES_DIR = path.join(__dirname, 'public/uploads/signatures');
if (!fs.existsSync(SIGNATURES_DIR)) {
    fs.mkdirSync(SIGNATURES_DIR, { recursive: true });
}

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, SIGNATURES_DIR);
    },
    filename: (req, file, cb) => {
        const slot = req.body.slot || 'unknown';
        const ext = path.extname(file.originalname) || '.png';
        cb(null, `${slot}${ext}`);
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Data Path
const DATA_FILE = path.join(__dirname, 'data', 'menu.json');
const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');

// --- Middleware ---

import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(403).json({ error: "Oturum süresi doldu, lütfen tekrar giriş yapın." }); // Turkish message for user
        }
        req.user = user;
        next();
    });
};

// --- Routes ---

// Login Endpoint
app.post('/api/login', loginLimiter, (req, res) => {
    const { password } = req.body;

    // Simple check against env variable
    if (password === ADMIN_PASSWORD) {
        // User is "admin"
        const accessToken = jwt.sign({ name: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
        res.json({ accessToken });
    } else {
        res.status(401).json({ error: "Invalid Credentials" });
    }
});

// GET Menu Data
app.get('/api/menu', (req, res) => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            // Fail Fast if file is missing
            return res.status(500).json({ error: 'Menu data file not found on server.' });
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading/parsing menu data:', error);
        res.status(500).json({ error: 'Failed to retrieve menu data.' });
    }
});

// POST Update Menu (Protected)
app.post('/api/menu', authenticateToken, (req, res) => {
    const newMenuData = req.body;

    // Basic Validation: Must be an array
    if (!Array.isArray(newMenuData)) {
        return res.status(400).json({ error: "Invalid data format. Expected an array." });
    }

    try {
        // Atomic Write Strategy: Write to temp file, then rename
        const tempFile = `${DATA_FILE}.tmp`;
        fs.writeFileSync(tempFile, JSON.stringify(newMenuData, null, 2));
        fs.renameSync(tempFile, DATA_FILE);

        res.json({ message: "Menu updated successfully." });
    } catch (error) {
        console.error('Error saving menu data:', error);
        res.status(500).json({ error: "Failed to save menu data." });
    }
});

// POST Upload PDF (Protected)
app.post('/api/upload-pdf', authenticateToken, (req, res) => {
    console.log(`[UPLOAD START] Request received from user: ${req.user?.name}`);

    // Usage: upload.single('pdf')
    const startUpload = upload.single('pdf');

    startUpload(req, res, (err) => {
        console.log('[UPLOAD CALLBACK] Multer processing finished.');

        if (err instanceof multer.MulterError) {
            console.error('[UPLOAD ERROR] Multer Error:', err);
            return res.status(400).json({ error: `Upload Error: ${err.message}` });
        } else if (err) {
            console.error('[UPLOAD ERROR] Unknown Error:', err);
            return res.status(400).json({ error: err.message });
        }

        // Everything went fine.
        if (!req.file) {
            console.error('[UPLOAD ERROR] No file found in request.');
            return res.status(400).json({ error: "No file uploaded." });
        }

        console.log(`[UPLOAD SUCCESS] File saved to: ${req.file.path}, Size: ${req.file.size}`);
        res.json({ message: "PDF uploaded successfully." });
    });
});

// GET Check PDF Status
app.get('/api/menu-status', (req, res) => {
    const pdfPath = path.join(__dirname, 'public/uploads', 'menu.pdf');
    console.log("Checking PDF Path:", pdfPath);
    console.log("Exists?", fs.existsSync(pdfPath));

    if (fs.existsSync(pdfPath)) {
        const stats = fs.statSync(pdfPath);
        res.json({
            exists: true,
            lastModified: stats.mtime,
            size: stats.size
        });
    } else {
        res.json({ exists: false });
    }
});

// DELETE Remove PDF (Protected)
app.delete('/api/menu-pdf', authenticateToken, (req, res) => {
    const pdfPath = path.join(__dirname, 'public/uploads', 'menu.pdf');
    if (fs.existsSync(pdfPath)) {
        try {
            fs.unlinkSync(pdfPath);
            res.json({ message: "Menu PDF deleted successfully." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete file." });
        }
    } else {
        res.status(404).json({ error: "No menu PDF found to delete." });
    }
});

// GET Content Data
app.get('/api/content', (req, res) => {
    try {
        if (!fs.existsSync(CONTENT_FILE)) {
            // Return default if missing
            return res.json({ scrollingText: "LUMA CAFE • AUHOF CENTER • ALWAYS SUMMER • " });
        }
        const data = fs.readFileSync(CONTENT_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading content data:', error);
        res.status(500).json({ error: 'Failed to retrieve content data.' });
    }
});

// POST Update Content (Protected)
app.post('/api/content', authenticateToken, (req, res) => {
    const updates = req.body;

    try {
        let currentContent = {};
        if (fs.existsSync(CONTENT_FILE)) {
            currentContent = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
        }

        // Merge updates into current content
        const newContent = { ...currentContent, ...updates };

        fs.writeFileSync(CONTENT_FILE, JSON.stringify(newContent, null, 2));
        res.json({ message: "Content updated successfully.", content: newContent });
    } catch (error) {
        console.error('Error saving content data:', error);
        res.status(500).json({ error: "Failed to save content data." });
    }
});

// POST Upload Signature Image (Protected)
app.post('/api/upload-image', authenticateToken, (req, res) => {
    const startUpload = imageUpload.single('image');

    startUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Upload Error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded.' });
        }

        const imageUrl = `/uploads/signatures/${req.file.filename}?t=${Date.now()}`;
        console.log(`[IMAGE UPLOAD] Slot: ${req.body.slot}, File: ${req.file.filename}`);
        res.json({ message: 'Image uploaded successfully.', imageUrl });
    });
});

// Basic Health Check
// Serve static files from the React frontend app
// Serve static files from the React frontend app
// IN DOCKER: dist is at /dist, server is at /app. __dirname is /app.
// path.join(__dirname, '../dist') resolves to /dist. This is correct.
const buildPath = path.join(__dirname, '../dist');
app.use(express.static(buildPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running securely on http://0.0.0.0:${PORT}`);
});
