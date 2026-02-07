# Deploy Script for Luma Cafe (Projects Folder)
$User = "olcay"
$IP = "162.55.168.224"
$RemotePath = "/home/$User/projects/luma"

Write-Host "1. Frontend Build ediliyor..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build hatası!"; exit }

Write-Host "2. Dosyalar hazırlanıyor..." -ForegroundColor Cyan
$PackageName = "lumacafe_deploy.zip"
# Clean up previous temp
if (Test-Path "deploy_temp") { Remove-Item -Recurse -Force "deploy_temp" }
New-Item -ItemType Directory -Force -Path "deploy_temp" | Out-Null
New-Item -ItemType Directory -Force -Path "deploy_temp/server" | Out-Null

# Copy Files
Copy-Item "dist" -Destination "deploy_temp" -Recurse
Copy-Item "server/*" -Destination "deploy_temp/server" -Recurse
Copy-Item "setup_server.sh" -Destination "deploy_temp"
Copy-Item "package.json" -Destination "deploy_temp"

# Clean node_modules in backend to save bandwidth
if (Test-Path "deploy_temp/server/node_modules") { Remove-Item -Recurse -Force "deploy_temp/server/node_modules" -ErrorAction SilentlyContinue }

# Zip
Write-Host "3. Zip oluşturuluyor..." -ForegroundColor Cyan
Compress-Archive -Path "deploy_temp/*" -DestinationPath $PackageName -Force

# Clean temp
Remove-Item -Recurse -Force "deploy_temp"

Write-Host "4. Sunucuya gönderiliyor (HOME)..." -ForegroundColor Cyan
scp $PackageName ${User}@${IP}:~/

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dosyalar gönderildi." -ForegroundColor Green
    Write-Host "5. Sunucu kurulum scripti başlatılıyor..." -ForegroundColor Cyan
    Write-Host "Lütfen sorulduğunda SUDO şifrenizi girin." -ForegroundColor Yellow
    
    # Remote script: Clean target, Unzip, Fix permissions, Run setup
    # We use 'sudo rm' to force delete if it was owned by root
    $RemoteCmd = "
        echo 'Temizlik yapılıyor...'
        if ! command -v unzip &> /dev/null; then
            echo 'Unzip aracı yükleniyor...'
            sudo apt-get install -y unzip
        fi
        sudo rm -rf $RemotePath
        mkdir -p $RemotePath
        
        echo 'Zip açılıyor...'
        unzip -o ~/$PackageName -d $RemotePath 
        rm ~/$PackageName
        
        cd $RemotePath
        chmod +x setup_server.sh
        
        echo 'Kurulum başlatılıyor...'
        sudo ./setup_server.sh
    "
    
    ssh -t $User@$IP $RemoteCmd
    
    Write-Host "İşlem Tamamlandı!" -ForegroundColor Green
    Write-Host "Web sitesini kontrol edin: https://luma.cafe" -ForegroundColor Cyan
} else {
    Write-Host "Yükleme Başarısız!" -ForegroundColor Red
}
