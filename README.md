# Events_NeoOrtho_Medartis

Project management hub for NeoOrtho Medartis events and training programs. A static web app hosted on **GitHub Pages** with **Firebase** as backend (Auth + Realtime Database).

## Important: Configure Your GitHub Username

Before deploying, replace `SEU_USERNAME` with your actual GitHub username in these files:

- **`app.js`** line 1: `const GITHUB_BASE = 'https://SEU_USERNAME.github.io/Events_NeoOrtho_Medartis/';`
- **`index.html`** (sidebar links): all `href="https://SEU_USERNAME.github.io/..."` URLs

## Project Structure

### Root Files

| File | Description |
|------|-------------|
| `index.html` | Project Hub — Dashboard, project management, team access |
| `EAD - NeoOrtho.html` | EAD Course Builder — Medical Device training (Coluna, Trauma, CMF) |
| `Essential.html` | Curso Essential — Project management training |
| `Gantt - Steps2Walk v3.html` | Gantt chart — Steps2Walk project timeline |
| `Cadaver Lab IBRA (Apoio Medartis) Foot and Ankle - Gestão de Projetos.html` | Project management — IBRA Foot & Ankle |
| `Cadaver Lab IBRA (Apoio Medartis) Hand and Wrist - Gestão de Projetos.html` | Project management — IBRA Hand & Wrist |
| `Template Step by Step.html` | Step-by-step template for new project pages |
| `shared.css` | Shared utility styles (toast, modal, buttons, cards, badges, form elements) |
| `shared.js` | Shared utilities — Firebase config, toast, modal helpers, formatters, file helpers |
| `app.js` | Application-level JavaScript |
| `README.md` | This file |

### libs/

Vendored third-party libraries (no CDN dependency at runtime).

#### `libs/css/`
| File | Description |
|------|-------------|
| `font-awesome-6.5.0.min.css` | Font Awesome 6.5.0 CSS |

#### `libs/fonts/`
| File | Description |
|------|-------------|
| `dm-sans.css` | DM Sans font (Google Fonts) |
| `space-grotesk.css` | Space Grotesk font (Google Fonts) |

#### `libs/js/`
| File | Description |
|------|-------------|
| `firebase-app-compat.js` | Firebase App SDK (compat) |
| `firebase-auth-compat.js` | Firebase Auth SDK (compat) |
| `firebase-database-compat.js` | Firebase Realtime Database SDK (compat) |
| `jspdf.umd.min.js` | jsPDF — PDF generation |
| `jspdf.plugin.autotable.min.js` | jsPDF AutoTable plugin |
| `xlsx.full.min.js` | SheetJS — Excel export |

#### `libs/img/`
| File | Description |
|------|-------------|
| `logo.png` | Project logo |

#### `libs/webfonts/`
Font Awesome webfont files (`.ttf` and `.woff2`):
- `fa-brands-400` (2 weights)
- `fa-regular-400` (2 weights)
- `fa-solid-900` (2 weights)
- `fa-v4compatibility` (2 weights)

## Architecture

- **Hosting**: GitHub Pages (static files only)
- **Backend**: Firebase Auth + Realtime Database (external service)
- **Cross-origin**: The app loads from `github.io` and connects to Firebase via SDK (CORS-enabled by Firebase)

## Deployment (GitHub Pages)

### First time setup

1. Create a repository on GitHub named `Events_NeoOrtho_Medartis`
2. Push this project to the repository
3. Go to **Settings > Pages** in the repository
4. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`
5. Click **Save**

### Update GitHub username

In `app.js` and `index.html`, replace `SEU_USERNAME` with your GitHub username.

### Push updates

```bash
git add .
git commit -m "Update project"
git push origin main
```

GitHub Pages will auto-deploy in ~1-2 minutes.

Your app will be live at: `https://SEU_USERNAME.github.io/Events_NeoOrtho_Medartis/`

## Firebase Configuration

The Firebase config is in `shared.js` (single source). The project uses:
- **Project ID**: `neoorthomedartis`
- **Database**: Realtime Database at `neoorthomedartis-default-rtdb.firebaseio.com`
- **Auth**: Firebase Authentication (Email/Password)

### Firebase Auth requirement

Make sure **Email/Password** sign-in is enabled in Firebase Console > Authentication > Sign-in method.

### Firebase Database rules

Configure your Firebase Realtime Database rules in Firebase Console > Realtime Database > Rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "people": {
      ".read": "auth != null",
      ".write": "auth != null && root.child('users/' + auth.uid + '/role').val() === 'admin'"
    },
    "projects": {
      ".read": "auth != null",
      "$projectId": {
        ".write": "auth != null && (root.child('users/' + auth.uid + '/role').val() === 'admin' || data.child('permissions').child(auth.uid).exists() || newData.child('permissions').child(auth.uid).exists())"
      }
    }
  }
}
```

## Login (index.html)
- First user to register becomes the Administrator
- Demo credentials (if seeded): `admin@neoortho.com` / `admin123`
