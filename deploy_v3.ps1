# Deploy Script v3 (Base64 Encoded to prevent CRLF issues)
$User = "olcay"
$IP = "162.55.168.224"
$RemotePath = "/home/$User/projects/luma-manual"

Write-Host "1. Dosyalar Hazirlaniyor..." -ForegroundColor Cyan

# Temp
if (Test-Path "deploy_temp_v3") { Remove-Item -Recurse -Force "deploy_temp_v3" }
New-Item -ItemType Directory -Force -Path "deploy_temp_v3" | Out-Null
New-Item -ItemType Directory -Force -Path "deploy_temp_v3/server" | Out-Null

# Kopyala - SADECE GEREKLI OLANLAR
Copy-Item "dist" -Destination "deploy_temp_v3" -Recurse
Copy-Item "server/*" -Destination "deploy_temp_v3/server" -Recurse
if (Test-Path "deploy_temp_v3/server/node_modules") { Remove-Item -Recurse -Force "deploy_temp_v3/server/node_modules" }

# Zip
$PackageName = "luma_v3.zip"
if (Test-Path $PackageName) { Remove-Item $PackageName }
Compress-Archive -Path "deploy_temp_v3/*" -DestinationPath $PackageName -Force

# Temizlik
Remove-Item -Recurse -Force "deploy_temp_v3"

Write-Host "2. Dosya Gonderiliyor..." -ForegroundColor Cyan
scp $PackageName ${User}@${IP}:~/

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dosyalar Gonderildi. Kurulum Basliyor..." -ForegroundColor Green
    
    # Linux Tarafinda Calisacak Komutlar (Saf Bash)
    # Bu komutlari Base64 encode edecegiz
    $LinuxScript = @"
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
echo 'ISLEM BASARIYLA TAMAMLANDI! SIP SAK!'
"@

    # Windows CRLF -> Linux LF donusumu ve Base64 Encode
    $Bytes = [System.Text.Encoding]::UTF8.GetBytes($LinuxScript.Replace("`r`n", "`n"))
    $EncodedCommand = [System.Convert]::ToBase64String($Bytes)
    
    # Sunucuya Base64 gonderip cozdurup calistiriyoruz
    ssh -t $User@$IP "echo '$EncodedCommand' | base64 -d | bash"
    
} else {
    Write-Host "HATA: Dosyalar gonderilemedi." -ForegroundColor Red
}
