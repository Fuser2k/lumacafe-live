# Stage 1: Build Frontend
FROM node:20-alpine as frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Stage 2: Setup Backend & Serve
FROM node:20-alpine
WORKDIR /app

# Copy backend dependencies first
COPY server/package*.json ./
RUN npm ci --production

# Copy backend code
COPY server/ .

# Copy built frontend from Stage 1 to backend's public folder (or dist)
# Server is configured to serve static files from '../dist' relative to itself
# So we need to position files correctly. 
# In container: /app is the root. Server code is in /app.
# Server expects ../dist. So we should put dist in /dist (one level up from /app if we run from /app/server)
# BUT, let's simplify. We will run server from /app.
# The server code (index.js) does: path.join(__dirname, '../dist')
# So if index.js is in /app, it looks for /dist.
# Let's adjust the structure.

# Let's clean up:
# We will put server code in /app
# We will put frontend build in /app/dist (Wait, server says '../dist')
# If server/index.js is at /app/index.js, then '../dist' is /dist.

# Let's modify index.js slightly or ensure folder structure matches.
# Currently server/index.js: const buildPath = path.join(__dirname, '../dist');
# If we copy server contents to /app, __dirname is /app. '../dist' is /dist.

# Copy built frontend to /dist
COPY --from=frontend-builder /app/dist /dist

# Expose port (Internal container port)
EXPOSE 3000

# Environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Start command
CMD ["node", "index.js"]
