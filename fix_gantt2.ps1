$file = "Gantt - Steps2Walk v3.html"
$content = Get-Content -Path $file -Raw

# Fix 1: Fix the broken save() method - add closing brace
$content = $content -replace (
    'save\(\) \{ try \{ localStorage\.setItem\(this\.KEYS\.tasks, JSON\.stringify\(AppState\.tasks\)\); localStorage\.setItem\(this\.KEYS\.deliverables, JSON\.stringify\(AppState\.deliverables\)\); UI\.toast\("Progresso salvo com sucesso!", "success"\); \} catch \(e\) \{ UI\.toast\("Erro ao salvar dados\.", "error"\); \} \}'
), (
    'save() { try { localStorage.setItem(this.KEYS.tasks, JSON.stringify(AppState.tasks)); localStorage.setItem(this.KEYS.deliverables, JSON.stringify(AppState.deliverables)); UI.toast("Progresso salvo com sucesso!", "success"); } catch (e) { UI.toast("Erro ao salvar dados.", "error"); } }'
)

# Fix 2: Add auto-save to Modal.save - line 624
$content = $content -replace (
    'Modal\.close\(\); App\.renderAll\(\); \},'
), (
    'Storage.saveSilent(); Modal.close(); App.renderAll(); },'
)

# Fix 3: Add auto-save to Modal.deleteItem - line 633
$content = $content -replace (
    'Modal\.close\(\); App\.renderAll\(\); \} \}'
), (
    'Storage.saveSilent(); Modal.close(); App.renderAll(); } }'
)

Set-Content -Path $file -Value $content -NoNewline
Write-Host "Done. Replacements applied."
