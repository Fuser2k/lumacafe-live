#!/bin/bash

# Renkler
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Luma Cafe Sunucu Kurulumu Başlıyor...${NC}"

# 1. Sistem Güncelleme
echo "Sistem güncelleniyor..."
sudo apt update && sudo apt upgrade -y

# 2. Node.js (v20) Kurulumu
if ! command -v node &> /dev/null; then
    echo "Node.js kuruluyor..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "Node.js zaten kurulu: $(node -v)"
fi

# 3. PM2 Kurulumu
if ! command -v pm2 &> /dev/null; then
    echo "PM2 kuruluyor..."
    sudo npm install -g pm2
    sudo pm2 startup systemd
else
    echo "PM2 zaten kurulu."
fi

# 4. Nginx Kurulumu (DEVRE DISI - MEVCUT SISTEMLE CAKISABILIR)
# if ! command -v nginx &> /dev/null; then
#     echo "Nginx kuruluyor..."
#     sudo apt install -y nginx
# else
#     echo "Nginx zaten kurulu."
# fi

# 5. Certbot (SSL) Kurulumu (DEVRE DISI)
# if ! command -v certbot &> /dev/null; then
#     echo "Certbot kuruluyor..."
#     sudo apt install -y certbot python3-certbot-nginx
# fi

# 6. Bağımlılıkların Yüklenmesi (Backend)
echo "Bağımlılıklar yükleniyor..."
cd server
npm ci --production
cd ..

# 7. Çevresel Değişkenler (.env)
if [ ! -f server/.env ]; then
    echo "server/.env dosyası oluşturuluyor (Varsayılan ayarlarla)..."
    echo "PORT=3001" > server/.env
    echo "JWT_SECRET=$(openssl rand -hex 32)" >> server/.env
    echo "ADMIN_PASSWORD=admin123" >> server/.env
    echo -e "${GREEN}DİKKAT: server/.env dosyası varsayılan şifre 'admin123' ile oluşturuldu. Lütfen daha sonra değiştirin!${NC}"
fi

# 8. Uygulamayı Başlatma (PM2)
echo "Uygulama başlatılıyor..."
pm2 delete lumacafe 2>/dev/null || true
pm2 start server/index.js --name "lumacafe" --restart-delay=3000
pm2 save

# 9. Nginx Yapılandırması (DEVRE DISI)
# echo "Nginx yapılandırılıyor..."
# DOMAIN="luma.cafe"
# CONFIG_FILE="/etc/nginx/sites-available/$DOMAIN"
# 
# sudo tee $CONFIG_FILE > /dev/null <<EOF
# server {
#     listen 80;
#     server_name $DOMAIN www.$DOMAIN;
# 
#     location / {
#         proxy_pass http://localhost:3001;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade \$http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host \$host;
#         proxy_cache_bypass \$http_upgrade;
#     }
# }
# EOF
# 
# sudo ln -sfn $CONFIG_FILE /etc/nginx/sites-enabled/
# sudo nginx -t && sudo systemctl reload nginx

# 10. SSL (HTTPS) (DEVRE DISI)
# echo -e "${GREEN}SSL Sertifikası alınıyor...${NC}"
# echo "Eğer DNS ayarlarınız henüz yayılmadıysa bu adım başarısız olabilir."
# sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN --redirect

echo -e "${GREEN}Kurulum (Node.js/PM2) Tamamlandı!${NC}"
echo "Web uygulamanız şu anda içeride çalışıyor: http://localhost:3001"
echo "LÜTFEN DİKKAT: Port 80 dolu olduğu için Nginx kurulmadı."
echo "Mevcut panelinizden (Dokploy vb.) 'luma.cafe' domainini bu sunucunun 3001 portuna (http://localhost:3001) yönlendirmelisiniz."
