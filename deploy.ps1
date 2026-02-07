# Deploy Script for Luma Cafe
# Bu script projeyi build eder, zipler ve sunucuya gönderir.

$User = "olcay"
$IP = "162.55.168.224"
$RemotePath = "/home/$User/lumacafe"

Write-Host "1. Frontend Build ediliyor..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build hatası!"; exit }

Write-Host "2. Dosyalar hazırlanıyor..." -ForegroundColor Cyan
$PackageName = "lumacafe_deploy.zip"
# Geçici deploy klasörü
if (Test-Path "deploy_temp") { Remove-Item -Recurse -Force "deploy_temp" }
New-Item -ItemType Directory -Force -Path "deploy_temp" | Out-Null
New-Item -ItemType Directory -Force -Path "deploy_temp/server" | Out-Null

# Dosyaları Kopyala
Copy-Item "dist" -Destination "deploy_temp" -Recurse
Copy-Item "server/*" -Destination "deploy_temp/server" -Recurse
Copy-Item "setup_server.sh" -Destination "deploy_temp"
Copy-Item "package.json" -Destination "deploy_temp"

# Node_modules temizle (Backend için, ne olur ne olmaz)
if (Test-Path "deploy_temp/server/node_modules") { Remove-Item -Recurse -Force "deploy_temp/server/node_modules" }

# Zip Oluştur
Write-Host "3. Zip oluşturuluyor..." -ForegroundColor Cyan
Compress-Archive -Path "deploy_temp/*" -DestinationPath $PackageName -Force

# Temizle
Remove-Item -Recurse -Force "deploy_temp"

Write-Host "4. Sunucuya yükleniyor ($IP)..." -ForegroundColor Cyan
Write-Host "Lütfen şifrenizi girin (eğer istenirse)..." -ForegroundColor Yellow

# SCP ile gönder
scp $PackageName ${User}@${IP}:~/

if ($LASTEXITCODE -eq 0) {
    Write-Host "Yükleme Başarılı!" -ForegroundColor Green
    Write-Host "---------------------------------------------------"
    Write-Host "Şimdi terminalinizde şu komutları sırasıyla çalıştırın:" -ForegroundColor White
    Write-Host ""
    Write-Host "1. ssh $User@$IP" -ForegroundColor Yellow
    Write-Host "2. unzip $PackageName -d lumacafe" -ForegroundColor Yellow
    Write-Host "3. cd lumacafe" -ForegroundColor Yellow
    Write-Host "4. chmod +x setup_server.sh" -ForegroundColor Yellow
    Write-Host "5. ./setup_server.sh" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Bu script sunucuyu otomatik olarak kurup siteyi yayınlayacaktır." -ForegroundColor Green
} else {
    Write-Host "SCP Yüklemesi Başarısız Oldu." -ForegroundColor Red
}
