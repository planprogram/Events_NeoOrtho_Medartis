# Events_NeoOrtho_Medartis

Project management hub for NeoOrtho Medartis events and training programs. A static Firebase-hosted web app providing dashboards, course builders, and project tracking for medical training events.

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
| `firebase.json` | Firebase hosting configuration |
| `database.rules.json` | Firebase Realtime Database security rules |
| `.firebaserc` | Firebase project aliases |
| `README.md` | This file |

### libs/

Vendored third-party libraries (no CDN dependency at runtime).

#### `libs/css/`
| File | Description |
|------|-------------|
| `font-awesome-6.5.0.min.css` | Font Awesome 6.5.0 CSS |

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

## Shared Resources

### `shared.css`
Common CSS utility classes available to all pages:
- **Reset**: `*, *::before, *::after` box-sizing, margin, padding
- **Toast**: `.toast-container`, `.toast`, `.toast.success/error/info/warning`
- **Modal**: `.modal-overlay`, `.modal`, `.modal-header`, `.modal-body`, `.modal-close`
- **Forms**: `.form-group`, `.form-input`
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-ghost`, `.btn-danger-ghost`
- **Cards**: `.card`
- **Badges**: `.badge`, `.badge-success`, `.badge-warning`, `.badge-danger`, `.badge-info`, `.badge-neutral`
- **Utilities**: `.hidden`, `.flex`, `.flex-center`, `.truncate`, spacing helpers
- **Scrollbar**: Custom webkit scrollbar styles

### `shared.js`
Common JavaScript functions and the single source of Firebase configuration:
- `NEO_FIREBASE_CONFIG` — Shared Firebase configuration (single source)
- `NEO_FB_APP`, `NEO_FB_DB`, `NEO_FB_AUTH` — Initialized Firebase instances
- `sharedToast(msg, type)` — Toast notification
- `sharedOpenModal(id)` / `sharedCloseModal(id)` — Modal helpers
- `sharedUid()` — Unique ID generator
- `sharedFormatDate(iso)` — Date formatter (pt-BR)
- `sharedFormatDateUS(iso)` — Date formatter (en-US)
- `sharedFormatFileSize(bytes)` — File size formatter
- `sharedEscapeHtml(str)` — HTML escaping
- `sharedInitials(name)` — Name initials extractor
- `sharedExtractYoutubeId(url)` — YouTube ID extractor
- `sharedGetFileIcon(type)` / `sharedGetFileColor(type)` — File type helpers
- `sharedConfirm(msg, onConfirm)` — Confirm dialog

## Login (index.html)
- Demo credentials: `admin@neoortho.com` / `admin123`

## Deployment

This project is hosted on Firebase Hosting. The `firebase.json` config treats the project root as the public directory and ignores hidden files, `node_modules`, `firebase.json`, and `$null`.

### Deploy steps

1. Install the Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

   To deploy only hosting (skip database rules):
   ```bash
   firebase deploy --only hosting
   ```

   To deploy only database rules:
   ```bash
   firebase deploy --only database
   ```

### Firebase Configuration
- **Project ID**: `neoorthomedartis`
- **Database**: Realtime Database at `neoorthomedartis-default-rtdb.firebaseio.com`
- **Auth**: Firebase Authentication
- **Storage**: `neoorthomedartis.firebasestorage.app`
