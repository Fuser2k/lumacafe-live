# Hetzner (veya VPS) Kurulum Rehberi

Projeniz hem Backend (Node.js/Express) hem de Frontend (React) içerdiği için, Hetzner, DigitalOcean veya herhangi bir Ubuntu sunucu üzerinde barındırmak en mantıklı seçimdir. 

Bu projeyi tek bir bütün olarak çalışacak şekilde yapılandırdık. Express sunucusu artık Frontend dosyalarını da sunuyor, yani sunucuda sadece tek bir port (3001) üzerinde çalışacak.

## 1. Sunucu Hazırlığı (Ubuntu)

Sunucunuza SSH ile bağlandıktan sonra sisteminizi güncelleyin ve gerekli araçları kurun:

```bash
# Sistem güncellemesi
sudo apt update && sudo apt upgrade -y

# Git kurulumu
sudo apt install git -y
```

## 2. Node.js Kurulumu (sürüm 20+)

Node.js'in güncel versiyonunu kurun:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Versiyon kontrolü
node -v
# v20.x.x vb. göstermeli
```

## 3. Projeyi Sunucuya Çekme

Projenizi sunucuya klonlayın (GitHub, GitLab vb. kullanıyorsanız):

```bash
git clone <REPO_ADRESINIZ> lumacafe
cd lumacafe
```
*Not: Eğer git kullanmıyorsanız, dosyaları SCP veya FileZilla ile yükleyebilirsiniz.*

## 4. Bağımlılıkların Yüklenmesi ve Build

Hem ana dizin hem de server dizini için kurulumları yapın:

```bash
# 1. Ana dizin bağımlılıkları (Frontend için)
npm install

# 2. Frontend'i Build et (Dist klasörünü oluşturur)
npm run build

# 3. Server bağımlılıkları (Backend için)
cd server
npm install

# .env Dosyasını Oluşturma
# Sunucuda environment değişkenlerini ayarlayın (JWT_SECRET, ADMIN_PASSWORD vb.)
nano .env 
# İçerisine kendi şifrelerinizi yazıp kaydedin (Ctrl+O, Enter, Ctrl+X)

cd ..
```

## 5. Uygulamayı Başlatma (PM2 ile)

Uygulamanın sürekli çalışması ve çökme durumunda otomatik yeniden başlaması için PM2 kullanacağız.

```bash
# PM2 kurulumu
sudo npm install -g pm2

# Uygulamayı başlat
pm2 start npm --name "lumacafe" -- start

# Başlangıçta otomatik açılması için kaydet
pm2 save
pm2 startup
```
*(Size verilen komutu kopyalayıp yapıştırın)*

Uygulama şu an **http://SUNUCU_IP:3001** adresinde çalışıyor olmalı.

## 6. Port 80 (Domain) Yönlendirmesi (Nginx)

Kullanıcıların `:3001` yazmadan girmesi için Nginx kurup yönlendirme (Reverse Proxy) yapacağız.

```bash
sudo apt install nginx -y
```

Ayarlar dosyasını düzenleyin:
`sudo nano /etc/nginx/sites-available/default`

İçeriği şununla değiştirin (server_name kısmına kendi domaininizi yazın yoksa IP kalsın):

```nginx
server {
    listen 80;
    server_name luma.cafe www.luma.cafe; # Veya IP adresiniz

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Kaydedip çıkın (Ctrl+O, Enter, Ctrl+X) ve Nginx'i yeniden başlatın:

```bash
sudo systemctl restart nginx
```

Artık siteniz **http://SUNUCU_IP** (veya domaininiz) adresinden erişilebilir!

## 7. SSL Sertifikası (HTTPS)

Domaininiz DNS'i sunucuya yönlenmişse, ücretsiz SSL alabilirsiniz:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d luma.cafe -d www.luma.cafe
```
