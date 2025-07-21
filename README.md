# 🎥 Bachata Practice Companion

A full-stack application to organize, tag, and practice Bachata dance videos — featuring video upload, compression, thumbnail preview, tagging by category & level, and persistent file system storage.

---

## 1. Project Structure

```
.
├── frontend   # React + TypeScript + Vite
└── backend    # Node.js + Express + File System / SQLite
```

---

## 2. Quick Start (Local Setup)

Clone the repository:

```sh
git clone https://github.com/runv/bachata-practice-companion.git
cd bachata-practice-companion
```

---

### 3. Start the Backend

```sh
cd backend
yarn install
yarn dev
```

- Runs on: [http://localhost:3000](http://localhost:3000)

> Make sure to create a `.env` file inside the `backend` folder with:
>
> ```env
> FRONTEND_URL=http://localhost:5173
> ```
> This prevents cross-origin errors during local development.

---

### 4. Start the Frontend

In a separate terminal window:

```sh
cd frontend
yarn install
yarn dev
```

- Runs on: [http://localhost:5173](http://localhost:5173)

---

## 5. Features

- Upload and organize practice videos
- Compress videos using `ffmpeg.wasm` (frontend)
- Tag videos by:
  - **Category** (e.g., Footwork, Dominican, Fusion)
  - **Level** (Beginner, Intermediate, Advanced)
- Auto-generate video thumbnails (backend)
- Filter videos by category, level, and custom tags
- Store:
  - Videos and thumbnails in the **filesystem**
  - Metadata in **JSON files** (scalable to a database)
- Modular UI with Vanilla Extract + Floating UI

---

## 6. Tech Stack

### Frontend
- React + TypeScript
- Vite
- ffmpeg.wasm (client-side compression)
- Vanilla Extract (CSS-in-TypeScript styling)
- Floating UI (dropdowns, dialogs, tooltips)

### Backend
- Node.js + Express
- Multer (file uploads)
- fluent-ffmpeg (server-side thumbnail extraction)
- File system storage
- `metadata.json`, `categories.json`, and `tags.json`

---

##  7. Development Notes

- `ffmpeg` must be installed locally and accessible for backend thumbnail generation
- `.env` is required in the backend to define the `FRONTEND_URL`
- Categories are initialized from `backend/config/categories.json`
- Tags are stored in `tags.json` and can evolve over time
- Video data and thumbnails are stored under `backend/storage/`

> The system is designed to allow easy migration to database storage if needed in the future.

---

## 8. Future Improvements

- Switch from filesystem/JSON to a real database (e.g., SQLite or PostgreSQL)
- Implement full test coverage:
  - Unit tests for backend and frontend logic
  - End-to-end tests using Playwright or Cypress
- Add video metadata editing: rename, change categories/tags, add descriptions
- Add full-text search across names, tags, and categories
- Delete video functionality 
- Add accessibility improvements (ARIA roles, focus traps, keyboard nav, contrast checking or semantic HTML elements)
- Build a tagging autocomplete UX with keyboard support
- Add user authentication 
- Optional future improvement: Add pagination or lazy loading for better performance with large video libraries

