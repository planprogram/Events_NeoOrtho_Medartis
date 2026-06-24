// Firebase Config
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyChLYj0irOa1k-D07v4bf6wt-75CzhJu8I",
        authDomain: "neoorthomedartis.firebaseapp.com",
        databaseURL: "https://neoorthomedartis-default-rtdb.firebaseio.com",
        projectId: "neoorthomedartis",
        storageBucket: "neoorthomedartis.firebasestorage.app",
        messagingSenderId: "48492402152",
        appId: "1:48492402152:web:c395acaf1e365d491bc05d",
        measurementId: "G-W4JC235S2Y"
    });
}
const db = firebase.database();
const auth = firebase.auth();

// Hub links data
const hubLinks = [
    { name: 'Curso Essential', desc: 'Gestao de projetos - Curso Essential', icon: 'fa-graduation-cap', color: '#7B2D8E', url: 'Essential.html' },
    { name: 'Steps2Walk Gantt', desc: 'Grafico Gantt do projeto Steps2Walk v3', icon: 'fa-chart-gantt', color: '#1A3E6B', url: 'Gantt - Steps2Walk v3.html' },
    { name: 'EAD NeoOrtho', desc: 'Plataforma EAD - Medical Device Training (Coluna, Trauma, CMF)', icon: 'fa-laptop-code', color: '#8B5CF6', url: 'EAD - NeoOrtho.html' },
    { name: 'Cadaver Lab Foot & Ankle', desc: 'Gestao de projetos - IBRA Foot and Ankle', icon: 'fa-bone', color: '#28A745', url: 'Cadaver Lab IBRA (Apoio Medartis) Foot and Ankle - Gestao de Projetos.html' },
    { name: 'Cadaver Lab Hand & Wrist', desc: 'Gestao de projetos - IBRA Hand and Wrist', icon: 'fa-hand-holding-medical', color: '#E67E22', url: 'Cadaver Lab IBRA (Apoio Medartis) Hand and Wrist - Gestao de Projetos.html' },
    { name: 'Template Step by Step', desc: 'Template de treinamento hands-on - procedimentos passo a passo', icon: 'fa-list-ol', color: '#00B3B9', url: 'Template Step by Step.html' }
];

// State
const COLORS = ['#7B2D8E','#1A3E6B','#28A745','#E67E22','#DC3545','#F0AD4E','#16A085','#2980B9','#8E44AD','#D35400'];
const COVERS = Array.from({length:12},(_,i) => `https://picsum.photos/seed/neodart${i+1}/600/300.jpg`);
let people = [], projects = [], allUsers = [];
let currentUser = null, currentUserRole = '';
let currentFilter = 'all', searchQuery = '';
let tempPermissions = [], pendingConfirmAction = null;

// Seed data
function seedPeople() {
    return {
        p1:{name:'Carlos Mendes',email:'carlos@neoortho.com',role:'admin',color:COLORS[0]},
        p2:{name:'Ana Beatriz',email:'ana@neoortho.com',role:'editor',color:COLORS[1]},
        p3:{name:'Rafael Costa',email:'rafael@neoortho.com',role:'editor',color:COLORS[2]},
        p4:{name:'Juliana Ferreira',email:'juliana@neoortho.com',role:'viewer',color:COLORS[3]},
        p5:{name:'Pedro Almeida',email:'pedro@neoortho.com',role:'viewer',color:COLORS[4]},
        p6:{name:'Luciana Souza',email:'luciana@neoortho.com',role:'editor',color:COLORS[5]}
    };
}
function seedProjects() {
    return {
        pr1:{name:'3D Bracket Design v2',category:'Neoortho',status:'active',desc:'Redesign of the self-ligating bracket with improved torque control.',cover:COVERS[0],date:'2024-12-10',permissions:{a:{personId:'p1',role:'editor'},b:{personId:'p2',role:'editor'},c:{personId:'p4',role:'viewer'}}},
        pr2:{name:'AI Treatment Planner',category:'Neoortho',status:'active',desc:'ML model to predict optimal tooth movement sequences.',cover:COVERS[1],date:'2024-11-28',permissions:{d:{personId:'p1',role:'editor'},e:{personId:'p3',role:'editor'},f:{personId:'p5',role:'viewer'}}},
        pr3:{name:'NiTi Wire Thermal Study',category:'Medartis',status:'completed',desc:'Comparative analysis of superelastic NiTi wires.',cover:COVERS[2],date:'2024-10-15',permissions:{g:{personId:'p1',role:'editor'},h:{personId:'p6',role:'editor'},i:{personId:'p4',role:'viewer'}}},
        pr4:{name:'Patient App Redesign',category:'Neoortho',status:'paused',desc:'Complete UX overhaul of the patient-facing mobile app.',cover:COVERS[3],date:'2024-11-05',permissions:{j:{personId:'p2',role:'editor'},k:{personId:'p3',role:'viewer'}}},
        pr5:{name:'Clear Aligner Material Test',category:'Medartis',status:'active',desc:'Testing new multi-layer polymer for clear aligners.',cover:COVERS[4],date:'2024-12-01',permissions:{l:{personId:'p1',role:'editor'},m:{personId:'p6',role:'editor'},n:{personId:'p5',role:'viewer'},o:{personId:'p4',role:'viewer'}}},
        pr6:{name:'Clinic Dashboard Analytics',category:'IBRA',status:'draft',desc:'BI dashboard for clinic managers.',cover:COVERS[5],date:'2024-12-18',permissions:{p:{personId:'p1',role:'editor'},q:{personId:'p3',role:'editor'}}}
    };
}

// Load data from Firebase
async function loadData() {
    try {
        const [pSnap, prSnap, uSnap] = await Promise.all([
            db.ref('people').once('value'),
            db.ref('projects').once('value'),
            db.ref('users').once('value')
        ]);
        let p = pSnap.val(), pr = prSnap.val(), u = uSnap.val();
        if (!p || Object.keys(p).length === 0) { await db.ref('people').set(seedPeople()); p = seedPeople(); }
        if (!pr || Object.keys(pr).length === 0) { await db.ref('projects').set(seedProjects()); pr = seedProjects(); }
        people = toArray(p);
        projects = toArray(pr);
        allUsers = toArray(u);
    } catch(err) {
        console.error('Firebase error:', err);
        showToast('Database connection failed. Using local data.', 'error');
        people = toArray(seedPeople());
        projects = toArray(seedProjects());
        allUsers = [];
    }
}
function toArray(obj) {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj.filter(Boolean);
    return Object.entries(obj).map(([k,v]) => ({_fbKey:k,...v})).filter(Boolean);
}
function getPerms(pr) {
    if (!pr || !pr.permissions) return [];
    return toArray(pr.permissions);
}

// Login particles
(function(){
    const c = document.getElementById('loginParticles');
    for(let i=0;i<25;i++){
        const s = document.createElement('span');
        s.style.left = Math.random()*100+'%';
        s.style.animationDuration = (7+Math.random()*10)+'s';
        s.style.animationDelay = Math.random()*8+'s';
        const sz = 2+Math.random()*3;
        s.style.width = s.style.height = sz+'px';
        c.appendChild(s);
    }
})();

// Auth Tab Switching
function switchAuthTab(tab) {
    document.getElementById('tabLogin').classList.toggle('active', tab==='login');
    document.getElementById('tabRegister').classList.toggle('active', tab==='register');
    document.getElementById('loginForm').style.display = tab==='login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab==='register' ? 'block' : 'none';
    document.getElementById('authTitle').textContent = tab==='login' ? 'Welcome back' : 'Create account';
    document.getElementById('authSubtitle').textContent = tab==='login' ? 'Sign in to manage your projects' : 'Join the NeoOrtho platform';
    document.getElementById('authHint').textContent = tab==='login' ? 'First user to register becomes the Administrator' : 'Password must be at least 6 characters';
    hideAuthMessages();
}

function hideAuthMessages() {
    document.getElementById('authError').classList.remove('show');
    document.getElementById('authSuccess').classList.remove('show');
}

function showAuthError(msg) {
    document.getElementById('authErrorMsg').textContent = msg;
    document.getElementById('authError').classList.add('show');
    document.getElementById('authSuccess').classList.remove('show');
}
function showAuthSuccess(msg) {
    document.getElementById('authSuccessMsg').textContent = msg;
    document.getElementById('authSuccess').classList.add('show');
    document.getElementById('authError').classList.remove('show');
}

// Password strength
function checkPasswordStrength(val) {
    const bar = document.getElementById('pwStrengthBar');
    if (!val) { bar.className = 'bar'; return; }
    let s = 0;
    if (val.length >= 6) s++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) s++;
    if (/[0-9]/.test(val) && val.length >= 8) s++;
    bar.className = 'bar ' + (s === 0 ? 'weak' : s === 1 ? 'weak' : s === 2 ? 'medium' : 'strong');
}

// Check if this is the first user (admin bootstrap)
async function isFirstUser() {
    try {
        const snap = await db.ref('users').once('value');
        const users = snap.val();
        return !users || Object.keys(users).length === 0;
    } catch(e) { return true; }
}

// Login handler
async function handleLogin(e) {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    const em = document.getElementById('loginEmail').value.trim();
    const pw = document.getElementById('loginPassword').value;
    try {
        const result = await auth.signInWithEmailAndPassword(em, pw);
        const userSnap = await db.ref('users/' + result.user.uid).once('value');
        const userData = userSnap.val();
        if (!userData) {
            const isFirst = await isFirstUser();
            const role = isFirst ? 'admin' : 'viewer';
            await db.ref('users/' + result.user.uid).set({
                name: result.user.displayName || em.split('@')[0],
                email: em,
                role: role,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            });
        } else {
            await db.ref('users/' + result.user.uid + '/lastLogin').set(new Date().toISOString());
        }
        hideAuthMessages();
    } catch(err) {
        console.error('Login error:', err);
        let msg = 'Login failed. ';
        if (err.code === 'auth/user-not-found') msg += 'No account found with this email.';
        else if (err.code === 'auth/wrong-password') msg += 'Incorrect password.';
        else if (err.code === 'auth/invalid-email') msg += 'Invalid email format.';
        else if (err.code === 'auth/too-many-requests') msg += 'Too many attempts. Try later.';
        else if (err.code === 'auth/configuration-not-found') msg += 'Firebase Auth is not configured. Check project settings.';
        else if (err.code === 'auth/invalid-api-key') msg += 'Invalid API key. Check Firebase config.';
        else if (err.code === 'auth/network-request-failed') msg += 'Network error. Check your connection.';
        else msg += err.message;
        showAuthError(msg);
    } finally {
        btn.disabled = false; btn.innerHTML = 'Sign In';
    }
}

// Register handler
async function handleRegister(e) {
    e.preventDefault();
    const btn = document.getElementById('regBtn');
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pw = document.getElementById('regPassword').value;
    const pw2 = document.getElementById('regPassword2').value;
    if (pw !== pw2) { showAuthError('Passwords do not match.'); return; }
    if (pw.length < 6) { showAuthError('Password must be at least 6 characters.'); return; }
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    try {
        const isFirst = await isFirstUser();
        const role = isFirst ? 'admin' : 'viewer';
        const result = await auth.createUserWithEmailAndPassword(email, pw);
        await result.user.updateProfile({ displayName: name });
        await db.ref('users/' + result.user.uid).set({
            name: name,
            email: email,
            role: role,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        });
        if (isFirst) {
            showAuthSuccess('Account created! You are the Administrator. Please sign in.');
        } else {
            showAuthSuccess('Account created! You can now sign in.');
        }
        switchAuthTab('login');
        document.getElementById('loginEmail').value = email;
        document.getElementById('registerForm').reset();
        document.getElementById('pwStrengthBar').className = 'bar';
    } catch(err) {
        console.error('Register error:', err);
        let msg = 'Registration failed. ';
        if (err.code === 'auth/email-already-in-use') msg += 'This email is already registered.';
        else if (err.code === 'auth/invalid-email') msg += 'Invalid email format.';
        else if (err.code === 'auth/weak-password') msg += 'Password is too weak.';
        else if (err.code === 'auth/configuration-not-found') msg += 'Firebase Auth is not configured. Check project settings.';
        else if (err.code === 'auth/invalid-api-key') msg += 'Invalid API key. Check Firebase config.';
        else if (err.code === 'auth/network-request-failed') msg += 'Network error. Check your connection.';
        else msg += err.message;
        showAuthError(msg);
    } finally {
        btn.disabled = false; btn.innerHTML = 'Create Account';
    }
}

// Auth state listener
auth.onAuthStateChanged(async function(user) {
    if (user) {
        currentUser = user;
        const snap = await db.ref('users/' + user.uid).once('value');
        const data = snap.val();
        if (data) {
            currentUserRole = data.role || 'viewer';
            updateSidebarForUser(data);
        }
        showApp();
    } else {
        currentUser = null;
        currentUserRole = '';
        showLogin();
    }
});

function updateSidebarForUser(data) {
    const inits = (data.name || 'U').split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
    document.getElementById('sidebarAvatar').textContent = inits;
    document.getElementById('sidebarAvatar').style.background = 'linear-gradient(135deg, ' + (data.color || COLORS[0]) + ', var(--neo-blue-light))';
    document.getElementById('sidebarName').textContent = data.name || 'User';
    var roleLabel = data.role === 'admin' ? 'Administrator' : data.role === 'editor' ? 'Editor' : 'Viewer';
    var roleHtml = roleLabel + ' <span class="sync-ind"><span class="sync-dot"></span> synced</span>';
    if (data.role === 'admin') {
        roleHtml = '<span style="display:inline-flex;align-items:center;gap:4px">' + roleLabel + ' <span class="admin-badge">Admin</span></span> <span class="sync-ind"><span class="sync-dot"></span> synced</span>';
    }
    document.getElementById('sidebarRole').innerHTML = roleHtml;
    document.getElementById('navUsers').style.display = (data.role === 'admin') ? 'flex' : 'none';
}

function showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    setTimeout(function(){
        document.getElementById('loginScreen').classList.remove('visible');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appScreen').classList.add('active');
        loadData().then(function(){ renderAll(); });
    }, 600);
}

function showLogin() {
    document.getElementById('appScreen').classList.remove('active');
    document.getElementById('loginScreen').style.display = 'flex';
    setTimeout(function(){
        document.getElementById('loginScreen').classList.add('visible');
        document.getElementById('loginScreen').classList.remove('hidden');
    }, 10);
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

// Logout
async function logout() {
    try { await auth.signOut(); } catch(e) { console.error(e); }
}

// Navigation
function switchPage(page) {
    document.querySelectorAll('.page-section').forEach(function(s){ s.classList.remove('active'); });
    document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
    var sec = document.getElementById('page-'+page);
    if(sec) sec.classList.add('active');
    var ni = document.querySelector('.nav-item[data-page="'+page+'"]');
    if(ni) ni.classList.add('active');
    document.getElementById('sidebar').classList.remove('mobile-open');
    if(['dashboard','projects'].includes(page)) currentFilter = 'all';
    if(page === 'users') { renderUserTable(); }
    renderAll();
}
function filterByStatus(st) { switchPage(st); currentFilter = st; renderProjectGrids(); }
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('mobile-open'); }

// Render
function renderAll() { renderStats(); renderProjectGrids(); renderPeople(); renderHubCards(); document.getElementById('projectCount').textContent = projects.length; }

function getFiltered() {
    var f = projects.slice();
    if(currentFilter!=='all') f = f.filter(function(p){ return p.status===currentFilter; });
    if(searchQuery) { var q=searchQuery.toLowerCase(); f=f.filter(function(p){ return p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)||(p.desc||'').toLowerCase().includes(q); }); }
    return f;
}

function renderStats() {
    document.getElementById('statsGrid').innerHTML =
        '<div class="stat-card"><div class="stat-icon" style="background:rgba(123,45,142,.1);color:var(--neo-purple)"><i class="fas fa-folder-open"></i></div><div class="stat-value">'+projects.length+'</div><div class="stat-label">Total Projects</div></div>'+
        '<div class="stat-card"><div class="stat-icon" style="background:rgba(40,167,69,.1);color:var(--neo-success)"><i class="fas fa-bolt"></i></div><div class="stat-value">'+projects.filter(function(p){return p.status==='active';}).length+'</div><div class="stat-label">Active</div></div>'+
        '<div class="stat-card"><div class="stat-icon" style="background:rgba(43,111,168,.1);color:var(--neo-blue-light)"><i class="fas fa-check-circle"></i></div><div class="stat-value">'+projects.filter(function(p){return p.status==='completed';}).length+'</div><div class="stat-label">Completed</div></div>'+
        '<div class="stat-card"><div class="stat-icon" style="background:rgba(230,126,34,.1);color:#E67E22"><i class="fas fa-users"></i></div><div class="stat-value">'+allUsers.length+'</div><div class="stat-label">System Users</div></div>';
}

function initials(name) { return name.split(' ').map(function(n){return n[0];}).join('').substring(0,2).toUpperCase(); }
function findPerson(id) { return people.find(function(p){return p._fbKey===id||p.id===id;}); }

function cardHtml(pr) {
    var perms = getPerms(pr);
    var avs = perms.slice(0,3).map(function(pm){
        var ps = findPerson(pm.personId);
        if(!ps) return '';
        return '<div class="p-avatar" style="background:'+ps.color+'" title="'+ps.name+'">'+initials(ps.name)+'</div>';
    }).join('');
    var more = perms.length>3 ? '<div class="p-avatar more">+'+(perms.length-3)+'</div>' : '';
    return '<div class="project-card" onclick="openDetail(\''+pr._fbKey+'\')">'+
        '<div class="project-card-cover" style="background-image:url(\''+(pr.cover||COVERS[0])+'\')">'+
            '<span class="status-badge '+pr.status+'">'+pr.status+'</span>'+
            '<div class="project-card-actions">'+
                '<button class="card-act-btn" onclick="event.stopPropagation();editProject(\''+pr._fbKey+'\')" title="Edit"><i class="fas fa-pen"></i></button>'+
                '<button class="card-act-btn del" onclick="event.stopPropagation();deleteProject(\''+pr._fbKey+'\')" title="Delete"><i class="fas fa-trash"></i></button>'+
            '</div>'+
        '</div>'+
        '<div class="project-card-body">'+
            '<div class="project-category">'+pr.category+'</div>'+
            '<h3>'+pr.name+'</h3>'+
            '<p class="project-desc">'+(pr.desc||'')+'</p>'+
            '<div class="project-card-footer"><div class="project-avatars">'+avs+more+'</div><div class="project-date">'+fmtDate(pr.date)+'</div></div>'+
        '</div></div>';
}

function emptyHtml(msg) { return '<div class="empty-state"><i class="fas fa-folder-open"></i><h3>No projects found</h3><p>'+msg+'</p></div>'; }

function renderProjectGrids() {
    var f = getFiltered();
    var h = f.length ? f.map(cardHtml).join('') : emptyHtml('Try changing filters or create a new project');
    document.getElementById('dashboardProjects').innerHTML = h;
    document.getElementById('allProjects').innerHTML = h;
    ['active','completed','draft'].forEach(function(st){
        var sp = projects.filter(function(p){return p.status===st;});
        var el = document.getElementById(st+'Projects');
        if(el) el.innerHTML = sp.length ? sp.map(cardHtml).join('') : emptyHtml('No '+st+' projects yet');
    });
}

function renderPeople() {
    document.getElementById('peopleGrid').innerHTML = people.map(function(p){
        var cnt = projects.filter(function(pr){ return getPerms(pr).some(function(pm){ return pm.personId===p._fbKey || pm.personId===p.id; }); }).length;
        return '<div class="people-card">'+
            '<div class="p-big-avatar" style="background:'+p.color+'">'+initials(p.name)+'</div>'+
            '<h4>'+p.name+'</h4><div class="p-email">'+p.email+'</div>'+
            '<span class="p-role-badge '+p.role+'">'+p.role+'</span>'+
            '<div class="p-count"><strong>'+cnt+'</strong> projects assigned</div>'+
            '<div style="margin-top:.9rem;display:flex;gap:.45rem;justify-content:center">'+
                '<button class="btn-secondary" style="padding:.35rem .75rem;font-size:.78rem" onclick="editPerson(\''+p._fbKey+'\')"><i class="fas fa-pen" style="margin-right:3px"></i>Edit</button>'+
                '<button class="btn-secondary" style="padding:.35rem .75rem;font-size:.78rem;color:var(--neo-danger);border-color:rgba(220,53,69,.3)" onclick="deletePerson(\''+p._fbKey+'\')"><i class="fas fa-trash" style="margin-right:3px"></i>Remove</button>'+
            '</div></div>';
    }).join('');
}

function renderHubCards() {
    document.getElementById('hubGrid').innerHTML = hubLinks.map(function(hub){
        return '<a class="hub-card" href="'+hub.url+'" target="_blank">'+
            '<div class="hub-card-icon" style="background:'+hub.color+'"><i class="fas '+hub.icon+'"></i></div>'+
            '<h4>'+hub.name+'</h4>'+
            '<p>'+hub.desc+'</p>'+
            '<span class="hub-link">Open <i class="fas fa-arrow-right"></i></span>'+
        '</a>';
    }).join('');
}

function setFilter(f,btn) { currentFilter=f; btn.closest('.filter-bar').querySelectorAll('.filter-tab').forEach(function(t){t.classList.remove('active');}); btn.classList.add('active'); renderProjectGrids(); }
function handleSearch(q) { searchQuery=q; renderProjectGrids(); }

// Cover image preview
function previewCover(url) {
    var preview = document.getElementById('coverPreview');
    if (url && url.trim()) {
        preview.innerHTML = '<img src="'+url+'" alt="Cover preview" onerror="this.parentElement.innerHTML=\'<i class=\\\'fas fa-exclamation-triangle\\\' style=\\\'color:var(--neo-danger);font-size:1.5rem\\\'></i>\';this.parentElement.classList.remove(\'has-image\')">';
        preview.classList.add('has-image');
        preview.style.backgroundImage = 'url(\''+url+'\')';
    } else {
        preview.innerHTML = '<i class="fas fa-image" style="color:var(--neo-gray-400);font-size:1.5rem"></i>';
        preview.classList.remove('has-image');
        preview.style.backgroundImage = '';
    }
}

// Project CRUD
async function openProjectModal(fbKey) {
    if (currentUserRole === 'viewer') { showToast('You do not have permission to manage projects.', 'error'); return; }
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    document.getElementById('coverPreview').innerHTML = '<i class="fas fa-image" style="color:var(--neo-gray-400);font-size:1.5rem"></i>';
    document.getElementById('coverPreview').classList.remove('has-image');
    document.getElementById('coverPreview').style.backgroundImage = '';
    if(fbKey) {
        var pr = projects.find(function(p){return p._fbKey===fbKey;});
        if(!pr) return;
        document.getElementById('projectModalTitle').textContent = 'Edit Project';
        document.getElementById('projectId').value = fbKey;
        document.getElementById('projectName').value = pr.name;
        document.getElementById('projectCategory').value = pr.category;
        document.getElementById('projectStatus').value = pr.status;
        document.getElementById('projectDesc').value = pr.desc||'';
        document.getElementById('projectCover').value = pr.cover||'';
        previewCover(pr.cover||'');
        tempPermissions = getPerms(pr).map(function(pm){return {personId:pm.personId,role:pm.role};});
    } else {
        document.getElementById('projectModalTitle').textContent = 'New Project';
        tempPermissions = [];
    }
    renderPermList();
    document.getElementById('projectModal').classList.add('show');
}
function editProject(k) { openProjectModal(k); }

async function saveProject(e) {
    e.preventDefault();
    var btn = document.getElementById('projectSubmitBtn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    var fbKey = document.getElementById('projectId').value;
    var permObj = {};
    tempPermissions.forEach(function(pm,i) { permObj['p'+i] = {personId:pm.personId,role:pm.role}; });
    var coverUrl = document.getElementById('projectCover').value.trim();
    var data = {
        name: document.getElementById('projectName').value.trim(),
        category: document.getElementById('projectCategory').value,
        status: document.getElementById('projectStatus').value,
        desc: document.getElementById('projectDesc').value.trim(),
        cover: coverUrl || COVERS[Math.floor(Math.random()*COVERS.length)],
        permissions: permObj
    };
    try {
        if(fbKey) {
            var existing = projects.find(function(p){return p._fbKey===fbKey;});
            if(existing) { data.date = existing.date; if(!coverUrl) data.cover = existing.cover||COVERS[0]; }
            await db.ref('projects/'+fbKey).update(data);
            showToast('Project updated','success');
        } else {
            data.date = new Date().toISOString().split('T')[0];
            await db.ref('projects').push(data);
            showToast('Project created','success');
        }
        await loadData(); closeModal('projectModal'); renderAll();
    } catch(err) { console.error(err); showToast('Error saving project','error'); }
    finally { btn.disabled=false; btn.innerHTML='Save Project'; }
}

async function deleteProject(fbKey) {
    if (currentUserRole !== 'admin') { showToast('Only admins can delete projects.', 'error'); return; }
    var pr = projects.find(function(p){return p._fbKey===fbKey;});
    if(!pr) return;
    document.getElementById('confirmTitle').textContent = 'Delete Project?';
    document.getElementById('confirmMsg').textContent = '"'+pr.name+'" will be permanently removed.';
    document.getElementById('confirmBtn').textContent = 'Delete';
    pendingConfirmAction = async function() {
        try { await db.ref('projects/'+fbKey).remove(); await loadData(); showToast('Project deleted','info'); renderAll(); }
        catch(err) { showToast('Error deleting','error'); }
    };
    document.getElementById('confirmModal').classList.add('show');
}

function openDetail(fbKey) {
    var pr = projects.find(function(p){return p._fbKey===fbKey;});
    if(!pr) return;
    var perms = getPerms(pr);
    var ph = perms.map(function(pm){
        var ps = findPerson(pm.personId);
        if(!ps) return '';
        return '<div class="perm-item"><div class="perm-av" style="background:'+ps.color+'">'+initials(ps.name)+'</div><div class="perm-nm">'+ps.name+'</div><span class="p-role-badge '+pm.role+'" style="margin:0">'+pm.role+'</span></div>';
    }).join('');
    document.getElementById('detailContent').innerHTML =
        '<div style="height:170px;border-radius:11px;background-image:url(\''+(pr.cover||COVERS[0])+'\');background-size:cover;background-position:center;margin-bottom:1.15rem;position:relative">'+
            '<span class="status-badge '+pr.status+'" style="position:absolute;top:10px;right:10px">'+pr.status+'</span>'+
            '<button class="card-act-btn" style="position:absolute;top:10px;left:10px" onclick="editProject(\''+pr._fbKey+'\')" title="Edit cover"><i class="fas fa-camera"></i></button>'+
        '</div>'+
        '<div style="font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--neo-purple);margin-bottom:.3rem">'+pr.category+'</div>'+
        '<h3 style="font-family:\'Space Grotesk\',sans-serif;font-size:1.35rem;font-weight:700;margin-bottom:.45rem">'+pr.name+'</h3>'+
        '<p style="color:var(--neo-text-muted);font-size:.9rem;line-height:1.6;margin-bottom:1.15rem">'+(pr.desc||'No description.')+'</p>'+
        '<div style="display:flex;gap:1.3rem;margin-bottom:1.4rem;font-size:.83rem;color:var(--neo-text-muted)">'+
            '<span><i class="fas fa-calendar" style="margin-right:4px;color:var(--neo-purple)"></i>'+fmtDate(pr.date)+'</span>'+
            '<span><i class="fas fa-users" style="margin-right:4px;color:var(--neo-purple)"></i>'+perms.length+' people</span>'+
        '</div>'+
        '<div class="perm-title"><i class="fas fa-shield-alt"></i> Team Access</div>'+
        '<div class="perm-list">'+(ph||'<p style="color:var(--neo-text-muted);font-size:.83rem;padding:.4rem 0">No one assigned</p>')+'</div>'+
        '<div class="modal-actions" style="margin-top:1.15rem">'+
            '<button class="btn-secondary" onclick="closeModal(\'detailModal\')">Close</button>'+
            '<button class="btn-primary" onclick="closeModal(\'detailModal\');editProject(\''+pr._fbKey+'\')"><i class="fas fa-pen"></i> Edit</button>'+
        '</div>';
    document.getElementById('detailModal').classList.add('show');
}

// Permissions UI
function renderPermList() {
    document.getElementById('permList').innerHTML = tempPermissions.map(function(pm,i){
        var ps = findPerson(pm.personId);
        if(!ps) return '';
        return '<div class="perm-item">'+
            '<div class="perm-av" style="background:'+ps.color+'">'+initials(ps.name)+'</div>'+
            '<div class="perm-nm">'+ps.name+'</div>'+
            '<select class="perm-sel" onchange="tempPermissions['+i+'].role=this.value">'+
                '<option value="editor" '+(pm.role==='editor'?'selected':'')+'>Editor</option>'+
                '<option value="viewer" '+(pm.role==='viewer'?'selected':'')+'>Viewer</option>'+
            '</select>'+
            '<button type="button" class="perm-rm" onclick="tempPermissions.splice('+i+',1);renderPermList()" title="Remove"><i class="fas fa-times"></i></button>'+
        '</div>';
    }).join('');
}

function togglePermDD() {
    document.getElementById('permDD').classList.toggle('show');
    if(document.getElementById('permDD').classList.contains('show')) {
        document.getElementById('permSearchIn').value = '';
        filterPermDD('');
        document.getElementById('permSearchIn').focus();
    }
}
function filterPermDD(q) {
    var assigned = tempPermissions.map(function(pm){ return pm.personId; });
    var avail = people.filter(function(p){ return !assigned.includes(p._fbKey) && p.name.toLowerCase().includes(q.toLowerCase()); });
    document.getElementById('permDDList').innerHTML = avail.map(function(p){
        return '<div class="dd-item" onclick="addPerm(\''+p._fbKey+'\')"><div class="dd-av" style="background:'+p.color+'">'+initials(p.name)+'</div><span>'+p.name+'</span></div>';
    }).join('') || '<div class="dd-item" style="color:var(--neo-text-muted)">No people found</div>';
}
function addPerm(personId) { tempPermissions.push({personId:personId, role:'viewer'}); renderPermList(); document.getElementById('permDD').classList.remove('show'); }
document.addEventListener('click', function(e) { var w = document.getElementById('addPermWrap'); if(w && !w.contains(e.target)) document.getElementById('permDD').classList.remove('show'); });

// People CRUD
function openPeopleModal(fbKey) {
    if (currentUserRole === 'viewer') { showToast('You do not have permission to manage people.', 'error'); return; }
    document.getElementById('peopleForm').reset();
    document.getElementById('personId').value = '';
    if(fbKey) {
        var p = people.find(function(x){ return x._fbKey === fbKey; });
        if(!p) return;
        document.getElementById('peopleModalTitle').textContent = 'Edit Person';
        document.getElementById('personId').value = fbKey;
        document.getElementById('personName').value = p.name;
        document.getElementById('personEmail').value = p.email;
        document.getElementById('personRole').value = p.role;
    } else {
        document.getElementById('peopleModalTitle').textContent = 'Add Person';
    }
    document.getElementById('peopleModal').classList.add('show');
}
function editPerson(k) { openPeopleModal(k); }

async function savePerson(e) {
    e.preventDefault();
    var fbKey = document.getElementById('personId').value;
    var data = { name: document.getElementById('personName').value.trim(), email: document.getElementById('personEmail').value.trim(), role: document.getElementById('personRole').value, color: COLORS[Math.floor(Math.random() * COLORS.length)] };
    try {
        if(fbKey) { var ex = people.find(function(p){return p._fbKey===fbKey;}); if(ex) data.color=ex.color; await db.ref('people/'+fbKey).update(data); showToast('Person updated','success'); }
        else { await db.ref('people').push(data); showToast('Person added','success'); }
        await loadData(); closeModal('peopleModal'); renderAll();
    } catch(err) { console.error(err); showToast('Error saving person','error'); }
}

async function deletePerson(fbKey) {
    if (currentUserRole !== 'admin') { showToast('Only admins can remove people.', 'error'); return; }
    var p = people.find(function(x){ return x._fbKey === fbKey; });
    if(!p) return;
    document.getElementById('confirmTitle').textContent = 'Remove Person?';
    document.getElementById('confirmMsg').textContent = '"'+p.name+'" will be removed from the team.';
    document.getElementById('confirmBtn').textContent = 'Remove';
    pendingConfirmAction = async function() {
        try { await db.ref('people/'+fbKey).remove(); await loadData(); showToast('Person removed','info'); renderAll(); }
        catch(err) { showToast('Error removing person','error'); }
    };
    document.getElementById('confirmModal').classList.add('show');
}

// ==================== USER MANAGEMENT (Admin Panel) ====================

function openUserModal(fbKey) {
    if (currentUserRole !== 'admin') { showToast('Only admins can manage users.', 'error'); return; }
    document.getElementById('userForm').reset();
    document.getElementById('userEditId').value = '';
    document.getElementById('userPassword').required = true;
    if(fbKey) {
        var u = allUsers.find(function(x){ return x._fbKey === fbKey; });
        if(!u) return;
        document.getElementById('userModalTitle').textContent = 'Edit User';
        document.getElementById('userEditId').value = fbKey;
        document.getElementById('userName').value = u.name || '';
        document.getElementById('userEmail').value = u.email || '';
        document.getElementById('userRole').value = u.role || 'viewer';
        document.getElementById('userPassword').value = '';
        document.getElementById('userPassword').required = false;
    } else {
        document.getElementById('userModalTitle').textContent = 'Add User';
    }
    document.getElementById('userModal').classList.add('show');
}

async function saveUser(e) {
    e.preventDefault();
    var btn = document.getElementById('userSubmitBtn');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    var editId = document.getElementById('userEditId').value;
    var name = document.getElementById('userName').value.trim();
    var email = document.getElementById('userEmail').value.trim();
    var role = document.getElementById('userRole').value;
    var password = document.getElementById('userPassword').value;
    try {
        if (editId) {
            // Update existing user
            var updates = { name: name, email: email, role: role };
            await db.ref('users/' + editId).update(updates);
            showToast('User updated successfully', 'success');
        } else {
            // Create new user via Auth + DB
            var color = COLORS[Math.floor(Math.random() * COLORS.length)];
            // We need to create the auth user. Since we can't create without password, we use a temp approach.
            // For admin-created users, we generate a random password and ask them to reset.
            // Actually, Firebase admin SDK can do this, but from client we need the user to register themselves.
            // Better approach: Admin can only edit existing users' roles, not create new auth users.
            // But we'll allow creating a DB record that can be claimed.
            // For simplicity: we'll show a message that the user needs to register first.
            showToast('Ask the user to register first, then edit their role here.', 'info');
        }
        await loadData(); closeModal('userModal'); renderUserTable(); renderAll();
    } catch(err) {
        console.error(err);
        showToast('Error saving user: ' + err.message, 'error');
    } finally {
        btn.disabled = false; btn.innerHTML = 'Save User';
    }
}

async function changeUserRole(fbKey, newRole) {
    if (currentUserRole !== 'admin') { showToast('Only admins can change roles.', 'error'); return; }
    if (currentUser && currentUser.uid === fbKey && newRole !== 'admin') {
        showToast('You cannot remove your own admin role.', 'error');
        return;
    }
    try {
        await db.ref('users/' + fbKey + '/role').set(newRole);
        await loadData();
        renderUserTable();
        showToast('User role updated to ' + newRole, 'success');
    } catch(err) {
        showToast('Error updating role: ' + err.message, 'error');
    }
}

async function deleteUser(fbKey) {
    if (currentUserRole !== 'admin') { showToast('Only admins can delete users.', 'error'); return; }
    if (currentUser && currentUser.uid === fbKey) {
        showToast('You cannot delete your own account.', 'error');
        return;
    }
    var u = allUsers.find(function(x){ return x._fbKey === fbKey; });
    if(!u) return;
    document.getElementById('confirmTitle').textContent = 'Delete User?';
    document.getElementById('confirmMsg').textContent = '"'+u.name+'" will be permanently removed from the system.';
    document.getElementById('confirmBtn').textContent = 'Delete';
    pendingConfirmAction = async function() {
        try {
            await db.ref('users/' + fbKey).remove();
            // Note: Deleting from DB does not delete from Firebase Auth. 
            // For full deletion, use Firebase Admin SDK on a server.
            await loadData();
            showToast('User data deleted. Auth record may remain (requires server cleanup).', 'info');
            renderUserTable(); renderAll();
        } catch(err) { showToast('Error deleting user: ' + err.message, 'error'); }
    };
    document.getElementById('confirmModal').classList.add('show');
}

function renderUserTable() {
    var search = (document.getElementById('userSearch').value || '').toLowerCase();
    var users = allUsers.filter(function(u){
        return (u.name || '').toLowerCase().includes(search) || (u.email || '').toLowerCase().includes(search);
    });
    document.getElementById('userCountInfo').textContent = users.length + ' user' + (users.length !== 1 ? 's' : '');
    
    if (users.length === 0) {
        document.getElementById('userTableBody').innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--neo-text-muted)">No users found</td></tr>';
        return;
    }
    
    document.getElementById('userTableBody').innerHTML = users.map(function(u){
        var inits = (u.name || 'U').split(' ').map(function(n){return n[0];}).join('').substring(0,2).toUpperCase();
        var color = u.color || COLORS[0];
        var createdAt = u.createdAt ? fmtDate(u.createdAt) : '—';
        var lastLogin = u.lastLogin ? fmtDate(u.lastLogin) : '—';
        var isSelf = currentUser && currentUser.uid === u._fbKey;
        var selfBadge = isSelf ? ' <span class="admin-badge">You</span>' : '';
        
        return '<tr>'+
            '<td><div class="admin-user-cell">'+
                '<div class="admin-user-av" style="background:'+color+'">'+inits+'</div>'+
                '<div class="admin-user-info">'+
                    '<span class="name">'+(u.name || 'Unknown')+selfBadge+'</span>'+
                '</div>'+
            '</div></td>'+
            '<td>'+(u.email || '—')+'</td>'+
            '<td><select class="role-select" onchange="changeUserRole(\''+u._fbKey+'\', this.value)"'+(isSelf ? ' disabled':'')+'>'+
                '<option value="viewer"'+(u.role==='viewer'?' selected':'')+'>Viewer</option>'+
                '<option value="editor"'+(u.role==='editor'?' selected':'')+'>Editor</option>'+
                '<option value="admin"'+(u.role==='admin'?' selected':'')+'>Admin</option>'+
            '</select></td>'+
            '<td>'+createdAt+'</td>'+
            '<td>'+lastLogin+'</td>'+
            '<td><div class="admin-actions-cell">'+
                '<button class="admin-act-btn primary" onclick="openUserModal(\''+u._fbKey+'\')" title="Edit"><i class="fas fa-pen"></i></button>'+
                '<button class="admin-act-btn danger" onclick="deleteUser(\''+u._fbKey+'\')" title="Delete"'+(isSelf?' disabled':'')+'><i class="fas fa-trash"></i></button>'+
            '</div></td>'+
        '</tr>';
    }).join('');
}

// ==================== UTILITIES ====================

function closeModal(id) { document.getElementById(id).classList.remove('show'); }
function confirmAction() { if(pendingConfirmAction) pendingConfirmAction(); closeModal('confirmModal'); pendingConfirmAction = null; }
function showToast(msg, type) { sharedToast(msg, type); }
function fmtDate(d) { if(!d) return '\u2014'; try { return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); } catch(e) { return d; } }

// Init
async function init() {
    document.getElementById('loadingScreen').classList.add('hide');
    document.getElementById('loginScreen').classList.add('visible');
    try { await loadData(); } catch(e) { console.warn('Pre-load failed:', e); }
}
init();
