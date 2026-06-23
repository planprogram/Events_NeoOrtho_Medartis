/* =============================================
   SHARED UTILITIES
   Common JS functions across all NeoOrtho pages
   ============================================= */

/* ---- Firebase Init (shared config) ---- */
var NEO_FIREBASE_CONFIG = {
    apiKey: "AIzaSyChLYj0irOa1k-D07v4bf6wt-75CzhJu8I",
    authDomain: "neoorthomedartis.firebaseapp.com",
    databaseURL: "https://neoorthomedartis-default-rtdb.firebaseio.com",
    projectId: "neoorthomedartis",
    storageBucket: "neoorthomedartis.firebasestorage.app",
    messagingSenderId: "48492402152",
    appId: "1:48492402152:web:c395acaf1e365d491bc05d",
    measurementId: "G-W4JC235S2Y"
};

/* Auto-init Firebase if SDK is loaded */
if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(NEO_FIREBASE_CONFIG);
        }
    } catch (e) {
        // Firebase may already be initialized by the host page
    }
}

/* ---- Toast Notification ---- */
function sharedToast(msg, type) {
    type = type || 'success';
    var container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    var icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i><span>' + (msg || '') + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
        toast.classList.add('removing');
        setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
}

/* ---- Modal Helpers ---- */
function sharedOpenModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('show');
}
function sharedCloseModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('show');
}

/* ---- Utility Functions ---- */
function sharedUid() {
    return 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function sharedFormatDate(iso) {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }); } catch (e) { return iso; }
}

function sharedFormatDateUS(iso) {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } catch (e) { return iso; }
}

function sharedFormatFileSize(bytes) {
    if (!bytes) return '0 B';
    var k = 1024, s = ['B', 'KB', 'MB', 'GB'], i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + s[i];
}

function sharedEscapeHtml(str) {
    if (!str) return '';
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function sharedInitials(name) {
    if (!name) return '';
    return name.split(' ').map(function (n) { return n[0]; }).join('').substring(0, 2).toUpperCase();
}

/* ---- YouTube ID Extractor ---- */
function sharedExtractYoutubeId(url) {
    if (!url) return null;
    var patterns = [/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/, /youtu\.be\/([a-zA-Z0-9_-]{11})/, /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/];
    for (var i = 0; i < patterns.length; i++) {
        var m = url.match(patterns[i]);
        if (m) return m[1];
    }
    return null;
}

/* ---- File Type Helpers ---- */
function sharedGetFileIcon(type) {
    if (!type) return 'fa-file';
    if (type.includes('pdf')) return 'fa-file-pdf';
    if (type.includes('image')) return 'fa-file-image';
    if (type.includes('video')) return 'fa-file-video';
    if (type.includes('word') || type.includes('document')) return 'fa-file-word';
    if (type.includes('sheet') || type.includes('excel')) return 'fa-file-excel';
    if (type.includes('presentation') || type.includes('powerpoint')) return 'fa-file-powerpoint';
    if (type.includes('zip') || type.includes('rar')) return 'fa-file-zipper';
    if (type.includes('text')) return 'fa-file-lines';
    return 'fa-file';
}

function sharedGetFileColor(type) {
    if (!type) return 'text-gray-400';
    if (type.includes('pdf')) return 'text-red-500';
    if (type.includes('image')) return 'text-pink-500';
    if (type.includes('video')) return 'text-blue-500';
    if (type.includes('word') || type.includes('document')) return 'text-blue-600';
    if (type.includes('sheet') || type.includes('excel')) return 'text-green-600';
    if (type.includes('presentation') || type.includes('powerpoint')) return 'text-orange-500';
    if (type.includes('zip') || type.includes('rar')) return 'text-yellow-600';
    return 'text-gray-400';
}

/* ---- Confirm Dialog ---- */
function sharedConfirm(msg, onConfirm) {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.innerHTML = '<div class="modal" style="max-width:390px">' +
        '<div class="modal-body">' +
        '<div style="text-align:center;padding:.8rem 0">' +
        '<i class="fas fa-exclamation-triangle" style="font-size:2.3rem;color:#DC3545;margin-bottom:.9rem;display:block"></i>' +
        '<h4 style="font-size:1.1rem;font-weight:700;margin-bottom:.4rem">Confirmar</h4>' +
        '<p style="color:#6b6b80;font-size:.88rem;margin-bottom:1.3rem">' + sharedEscapeHtml(msg) + '</p>' +
        '<div style="display:flex;gap:.65rem;justify-content:center">' +
        '<button class="btn-secondary shared-confirm-cancel" style="padding:.6rem 1.4rem">Cancelar</button>' +
        '<button class="btn-danger shared-confirm-ok" style="padding:.6rem 1.4rem">Confirmar</button>' +
        '</div></div></div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.shared-confirm-cancel').onclick = function () { overlay.remove(); };
    overlay.querySelector('.shared-confirm-ok').onclick = function () { overlay.remove(); if (onConfirm) onConfirm(); };
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
}
