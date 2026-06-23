$file = "index.html"
$content = Get-Content -Path $file -Raw
$content = $content -replace "url: 'Cadaver Lab IBRA \(Apoio Medartis\) Hand and Wrist - Gestao de Projetos.html' \];", "url: 'Cadaver Lab IBRA (Apoio Medartis) Hand and Wrist - Gestao de Projetos.html' },\n    { name: 'EAD NeoOrtho', desc: 'Construtor de curso EAD - Medical Device (Coluna, Trauma, CMF)', icon: 'fa-graduation-cap', color: '#8B5CF6', url: 'EAD - NeoOrtho.html' }\n];"
Set-Content -Path $file -Value $content -NoNewline
Write-Host "Done."
