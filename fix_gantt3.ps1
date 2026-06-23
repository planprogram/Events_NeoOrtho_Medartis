$file = "Gantt - Steps2Walk v3.html"
$content = Get-Content -Path $file -Raw

# Fix Modal.save - add Storage.saveSilent() before Modal.close()
$content = $content -replace (
    'Modal\.close\(\); App\.renderAll\(\); \},'
), (
    'Storage.saveSilent(); Modal.close(); App.renderAll(); },'
)

# Fix Modal.deleteItem - add Storage.saveSilent() before Modal.close()  
$content = $content -replace (
    'Modal\.close\(\); App\.renderAll\(\); \} \}'
), (
    'Storage.saveSilent(); Modal.close(); App.renderAll(); } }'
)

Set-Content -Path $file -Value $content -NoNewline
Write-Host "Done."
