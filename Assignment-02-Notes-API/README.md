# Notes Management REST API

## Objective
Build a complete Notes Management REST API with CRUD operations, route parameters, query parameters, pagination, and sorting.

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose

## Folder Structure
```
notes-app/
├── src/
│   ├── config/db.js
│   ├── models/note.model.js
│   ├── controllers/note.controller.js
│   ├── routes/note.routes.js
│   ├── middlewares/
│   ├── app.js
│   └── index.js
├── .env
├── .env.example
└── package.json
```

## Environment Variables
Create a `.env` file in the root directory and add the following:
```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

## Installation Steps
1. Clone the repository
2. Run `npm install`

## Local Run Command
```bash
npm run dev
```

## Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/notes | Create a new note |
| POST   | /api/notes/bulk | Create multiple notes |
| GET    | /api/notes | Get all notes |
| GET    | /api/notes/:id | Get note by ID |
| PUT    | /api/notes/:id | Replace note by ID |
| PATCH  | /api/notes/:id | Update note by ID |
| DELETE | /api/notes/:id | Delete note by ID |
| DELETE | /api/notes/bulk | Delete multiple notes |
| GET    | /api/notes/category/:category | Get notes by category |
| GET    | /api/notes/status/:isPinned | Get notes by pinned status |
| GET    | /api/notes/:id/summary | Get note summary |
| GET    | /api/notes/filter | Filter notes (category, isPinned) |
| GET    | /api/notes/filter/pinned | Get all pinned notes |
| GET    | /api/notes/filter/category | Filter by category name (query) |
| GET    | /api/notes/filter/date-range | Filter by date range |
| GET    | /api/notes/paginate | Paginate all notes |
| GET    | /api/notes/paginate/category/:category | Paginate notes by category |
| GET    | /api/notes/sort | Sort all notes |
| GET    | /api/notes/sort/pinned | Sort pinned notes |

## Sample Requests
### Create Note
```json
{
  "title": "Meeting",
  "content": "Discuss project updates",
  "category": "work",
  "isPinned": true
}
```

## Git Commit Discipline
- Each endpoint is committed individually with descriptive messages.

## Submission Links
- GitHub Repository: [Link Here]
- Postman Documentation: [Link Here]
- Deployed Backend: [Link Here]
