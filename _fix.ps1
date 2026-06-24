# Read the original file from git or from a backup
# Since the file is locked by VS Code, we need to close it first
# This script will be run by the user after closing the file in VS Code

$filePath = "C:\Users\usr13261\Desktop\Projetos - Cronogramas\Events_NeoOrtho_Medartis\Essential.html"

# Check if file is locked
$fileInfo = Get-Item $filePath
Write-Host "File size: $($fileInfo.Length) bytes"
Write-Host "File exists: $($fileInfo.Exists)"

# Try to read it
try {
    $content = [System.IO.File]::ReadAllText($filePath)
    Write-Host "Successfully read file, length: $($content.Length)"
} catch {
    Write-Host "Error reading file: $_"
}
