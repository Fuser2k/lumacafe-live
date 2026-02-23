# Deploy Script v2
# Windows -> Linux CRLF sorununu asmak icin komutlari Base64 encode edip gonderecegiz
$User = "olcay"
$IP = "162.55.168.224"
$RemotePath = "/home/$User/projects/luma-manual"

Write-Host "1. Dosyalar Hazirlaniyor..." -ForegroundColor Cyan

# Temp
if (Test-Path "deploy_temp_v2") { Remove-Item -Recurse -Force "deploy_temp_v2" }
New-Item -ItemType Directory -Force -Path "deploy_temp_v2" | Out-Null
New-Item -ItemType Directory -Force -Path "deploy_temp_v2/server" | Out-Null

# Kopyala - SADECE GEREKLI OLANLAR
Copy-Item "dist" -Destination "deploy_temp_v2" -Recurse
Copy-Item "server/*" -Destination "deploy_temp_v2/server" -Recurse
# node_modules varsa sil (bant genisligi tasarrufu ve platform farkliligi)
if (Test-Path "deploy_temp_v2/server/node_modules") { Remove-Item -Recurse -Force "deploy_temp_v2/server/node_modules" }

# Zip
$PackageName = "luma_v2.zip"
if (Test-Path $PackageName) { Remove-Item $PackageName }
Compress-Archive -Path "deploy_temp_v2/*" -DestinationPath $PackageName -Force

# Temizlik
Remove-Item -Recurse -Force "deploy_temp_v2"

Write-Host "2. Sunucuya Gonderiliyor..." -ForegroundColor Cyan
# Once sunucudaki eski zipi sil
ssh $User@$IP "rm -f ~/$PackageName"
# Gonder
scp $PackageName ${User}@${IP}:~/

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dosyalar Gonderildi. Kurulum Basliyor..." -ForegroundColor Green
    
    # Komutlari tek tek string olarak birlestirip gonderelim ki satir sonu hatasi olmasin
    # npm install kullaniyoruz (ci degil)
    $Commands = "
        export PORT=4000
        export NODE_ENV=production
        rm -rf $RemotePath
        mkdir -p $RemotePath
        unzip -o ~/$PackageName -d $RemotePath > /dev/null
        rm ~/$PackageName
        cd $RemotePath/server
        echo 'Bagimliliklar yukleniyor...'
        npm install --production --no-audit --prefer-offline
        echo 'PM2 baslatiliyor...'
        pm2 delete luma-manual 2>/dev/null || true
        pm2 start index.js --name 'luma-manual' --update-env
        pm2 save
        echo 'ISLEM BASARIYLA TAMAMLANDI!'
    "
    
    ssh -t $User@$IP $Commands
    
} else {
    Write-Host "HATA: Dosyalar gonderilemedi." -ForegroundColor Red
}
