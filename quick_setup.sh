#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Hizli Kurulum (Port 80 iptal)${NC}"

# Node.js Check
if ! command -v node &> /dev/null; then
    echo 'Node yukleniyor...'
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# PM2 Check
if ! command -v pm2 &> /dev/null; then
    echo 'PM2 yukleniyor...'
    sudo npm install -g pm2
    sudo pm2 startup systemd
fi

echo 'Bagimliliklar yukleniyor...'
# Ensure directory exists just in case
mkdir -p ~/projects/luma/server
cd ~/projects/luma/server
# Install deps
npm ci --production

cd ..

# Env file
if [ ! -f server/.env ]; then
    echo 'server/.env olusturuluyor...'
    echo 'PORT=3001' > server/.env
    echo 'JWT_SECRET=degistir_bunu_$(openssl rand -hex 16)' >> server/.env
    echo 'ADMIN_PASSWORD=admin123' >> server/.env
fi

echo 'Uygulama Baslatiliyor (Port 3001)...'
pm2 delete lumacafe 2>/dev/null || true
pm2 start server/index.js --name "lumacafe" --restart-delay=3000
pm2 save

echo -e "${GREEN}ISLEM TAMAM!${NC}"
echo 'Uygulama su an 3001 portunda calisiyor.'
echo 'Dokploy panelinden luma.cafe domainini sunucu IPsi ve 3001 portuna yonlendirin.'
