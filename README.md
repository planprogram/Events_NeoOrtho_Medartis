# Events_NeoOrtho_Medartis

Project management hub for NeoOrtho Medartis events and training programs.

## Files

| File | Description |
|------|-------------|
| `index.html` | Project Hub — Dashboard, project management, team access |
| `EAD - NeoOrtho.html` | EAD Course Builder — Medical Device training (Coluna, Trauma, CMF) |
| `Essential.html` | Curso Essential — Project management training |
| `Gantt - Steps2Walk v3.html` | Gantt chart — Steps2Walk project timeline |
| `Cadaver Lab IBRA (Apoio Medartis) Foot and Ankle - Gestão de Projetos.html` | Project management — IBRA Foot & Ankle |
| `Cadaver Lab IBRA (Apoio Medartis) Hand and Wrist - Gestão de Projetos.html` | Project management — IBRA Hand & Wrist |
| `shared.css` | Shared utility styles (toast, modal, buttons, cards, badges, form elements) |
| `shared.js` | Shared utilities (Firebase init, toast, modal helpers, formatters, file helpers) |

## Shared Resources

### shared.css
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

### shared.js
Common JavaScript functions:
- `NEO_FIREBASE_CONFIG` — Shared Firebase configuration
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
