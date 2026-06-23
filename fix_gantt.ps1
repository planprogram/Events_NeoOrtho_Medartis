$file = "Gantt - Steps2Walk v3.html"
$content = Get-Content -Path $file -Raw

# 1. Add saveSilent to Storage
$content = $content -replace (
    'save\(\) \{ try \{ localStorage\.setItem\(this\.KEYS\.tasks, JSON\.stringify\(AppState\.tasks\)\); localStorage\.setItem\(this\.KEYS\.deliverables, JSON\.stringify\(AppState\.deliverables\)\); UI\.toast\("Progresso salvo com sucesso!", "success"\); \} catch \(e\) \{ UI\.toast\("Erro ao salvar dados\.", "error"\); \} \}'
), (
    'save() { try { localStorage.setItem(this.KEYS.tasks, JSON.stringify(AppState.tasks)); localStorage.setItem(this.KEYS.deliverables, JSON.stringify(AppState.deliverables)); UI.toast("Progresso salvo com sucesso!", "success"); } catch (e) { UI.toast("Erro ao salvar dados.", "error"); } }' + "`n" +
    '            saveSilent() { try { localStorage.setItem(this.KEYS.tasks, JSON.stringify(AppState.tasks)); localStorage.setItem(this.KEYS.deliverables, JSON.stringify(AppState.deliverables)); } catch (e) {} }'
)

# 2. Add auto-save to Deliverables.toggle
$content = $content -replace (
    'd\.done = !d\.done; App\.renderAll\(\); UI\.toast'
), (
    'd.done = !d.done; Storage.saveSilent(); App.renderAll(); UI.toast'
)

# 3. Add auto-save to Modal.save (after Modal.close)
$content = $content -replace (
    'Modal\.close\(\); App\.renderAll\(\); \},'
), (
    'Storage.saveSilent(); Modal.close(); App.renderAll(); },'
)

# 4. Add auto-save to Modal.deleteItem (after Modal.close)
$content = $content -replace (
    'Modal\.close\(\); App\.renderAll\(\); \} \}'
), (
    'Storage.saveSilent(); Modal.close(); App.renderAll(); } }'
)

Set-Content -Path $file -Value $content -NoNewline
Write-Host "Done. Replacements applied."
