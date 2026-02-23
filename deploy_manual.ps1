# Manual Deploy Script (Local Build -> Server PM2)
$User = "olcay"
$IP = "162.55.168.224"
$RemotePath = "/home/$User/projects/luma-manual"
$Port = 4000

Write-Host "1. Deploy paketleniyor..." -ForegroundColor Cyan

# Temp klasörü hazırla
if (Test-Path "deploy_temp_manual") { Remove-Item -Recurse -Force "deploy_temp_manual" }
New-Item -ItemType Directory -Force -Path "deploy_temp_manual" | Out-Null
New-Item -ItemType Directory -Force -Path "deploy_temp_manual/server" | Out-Null

# Dosyaları kopyala
Copy-Item "dist" -Destination "deploy_temp_manual" -Recurse
Copy-Item "server/*" -Destination "deploy_temp_manual/server" -Recurse
# node_modules hariç tutmamız lazım ama basit kopyalamada node_modules gelmez zaten server altında yoksa.
# Server altında node_modules varsa silelim
if (Test-Path "deploy_temp_manual/server/node_modules") { Remove-Item -Recurse -Force "deploy_temp_manual/server/node_modules" }

# Server index.js düzenlemesi gerekebilir mi? Hayır, Dockerfile için yaptığımız değişiklik ../dist arıyordu.
# Biz server klasörünü /app/server, dist'i /app/dist yaparsak ../dist çalışır.
# Scriptte klasör yapısını şöyle kuracağız:
#  ~/projects/luma-manual/
#      server/
#      dist/

# Zip oluştur
$PackageName = "luma_manual.zip"
Compress-Archive -Path "deploy_temp_manual/*" -DestinationPath $PackageName -Force

# Temp temizle
Remove-Item -Recurse -Force "deploy_temp_manual"

Write-Host "2. Sunucuya gönderiliyor..." -ForegroundColor Cyan
scp $PackageName ${User}@${IP}:~/

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dosyalar gönderildi. Sunucuda kurulum başlatılıyor..." -ForegroundColor Green
    
    $RemoteCmd = "
        # 1. Klasörü hazırla
        mkdir -p $RemotePath
        
        # 2. Zip aç
        unzip -o ~/$PackageName -d $RemotePath
        rm ~/$PackageName
        
        # 3. Bağımlılıkları yükle
        cd $RemotePath/server
        npm ci --production
        
        # 4. PM2 ile başlat (Port 4000)
        # Önce eski process varsa sil
        pm2 delete luma-manual 2>/dev/null || true
        
        # Environment variables
        export PORT=$Port
        export NODE_ENV=production
        
        # Başlat
        # index.js ../dist arıyor, bu yapı (server ve dist yan yana) uygun.
        PORT=$Port pm2 start index.js --name 'luma-manual'
        pm2 save
        
        echo 'Uygulama 4000 portunda çalışıyor!'
    "
    
    ssh -t $User@$IP $RemoteCmd
    
    Write-Host "TAMAMLANDI!" -ForegroundColor Green
    Write-Host "Şimdi Dokploy Paneline gidip:" -ForegroundColor Yellow
    Write-Host "1. Yeni bir Application DEĞİL, 'Service' veya direkt Domain yönlendirmesi yapın."
    Write-Host "   Ama en kolayı: Dokploy'da 'Compose' kısmını kullanmak yerine..."
    Write-Host "   Dokploy paneline gidin -> Projects -> luma (veya yeni proje)"
    Write-Host "   Services -> Create Service -> 'Application' (Boşverin bunu)"
    Write-Host "   Bence şunu yapın: Dokploy panelinde herhangi bir işlem yapmanıza gerek yok eğer Nginx kullanacaksanız. Ama madem Dokploy var..."
    Write-Host "   Dokploy'da 'luma' projesinin içine girin."
    Write-Host "   Create Service -> 'Traefik' (Var mı? Yoksa Application seçin)"
    Write-Host "   Dur! Dokploy'da 'External Service' gibi bir şey yok mu?"
    Write-Host "   Var! Docker dışı çalışan bir app'i Dokploy ile yönetemezsiniz ama Traefik ile yönlendirebilirsiniz."
    Write-Host "   Ama en basiti: Dokploy'da PORT 4000'e yönlendiren bir App oluşturun."
    Write-Host "   YOKSA: Dokploy'u boşverip Nginx kuralım mı? Hayır 80 dolu."
    
    Write-Host "Sizden ricam: Dokploy'da yeni bir uygulama oluşturun (Empty/Docker olmayan)." 
    Write-Host "VEYA daha kolayı: Dokploy panelinde luma projesini silin."
    Write-Host "Biz manuel Nginx Proxy ayarı yapacağız."
    
} else {
    Write-Host "Yükleme Başarısız!" -ForegroundColor Red
}
