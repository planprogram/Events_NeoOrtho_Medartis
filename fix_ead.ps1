$file = "EAD - NeoOrtho.html"
$content = Get-Content -Path $file -Raw

# 1. Add Firebase SDK after font-awesome
$content = $content -replace 'all\.min\.css">', 'all.min.css">' + "`n" + '    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>' + "`n" + '    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js"></script>'

# 2. Add Firebase init after tailwind config script closing
$content = $content -replace '    </script>' + "`n" + '    <style>', '    </script>' + "`n" + '    <script>' + "`n" + '    firebase.initializeApp({apiKey:"AIzaSyChLYj0irOa1k-D07v4bf6wt-75CzhJu8I",authDomain:"neoorthomedartis.firebaseapp.com",databaseURL:"https://neoorthomedartis-default-rtdb.firebaseio.com",projectId:"neoorthomedartis",storageBucket:"neoorthomedartis.firebasestorage.app",messagingSenderId:"48492402152",appId:"1:48492402152:web:c395acaf1e365d491bc05d",measurementId:"G-W4JC235S2Y"});' + "`n" + '    var eadDb = firebase.database();' + "`n" + '    </script>' + "`n" + '    <style>'

# 3. Replace saveState - use simple string replacement
$oldSave = 'localStorage.setItem('
$newSave = 'eadDb.ref("ead_data").set(d).catch(function(e){});'
$content = $content -replace 'localStorage\.setItem\('ead_md_data',JSON\.stringify\(d\)\);', 'eadDb.ref("ead_data").set(d).catch(function(e){});'

# 4. Replace loadState - use simple string replacement
$content = $content -replace 'const raw=localStorage\.getItem\('ead_md_data'\);', 'eadDb.ref("ead_data").once("value").then(function(snap){var raw=snap.val();'
$content = $content -replace 'if\(!raw\)return;', 'if(!raw){return;}}).catch(function(){});'

Set-Content -Path $file -Value $content -NoNewline
Write-Host "Done."
