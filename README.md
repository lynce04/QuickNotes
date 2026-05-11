# QuickNotes

A web-based notes app inspired by the iPhone Notes layout, built with a C# backend and a vanilla JavaScript frontend.

## Features
- Create, edit, and delete notes
- Live search to filter notes
- Sidebar layout for easy navigation
- Custom theme — change sidebar color or background image

## Technologies
| Layer | Technology |
|---|---|
| Backend | C# / ASP.NET Core Web API |
| Frontend | HTML, CSS, JavaScript, Bootstrap 5 |
| Database | SQLite via Entity Framework Core |
| Versioning | Git / GitHub |

## How to run

**Backend**
1. Open `QuickNotes.API` in Visual Studio
2. Press F5 — the API starts at `https://localhost:7179`

**Frontend**
1. Open `QuickNotes.Frontend` in VS Code
2. Right click `index.html` → Open with Live Server

## Project structure
```
QuickNotes/
├── QuickNotes.API/         ← C# backend
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
└── QuickNotes.Frontend/    ← HTML/CSS/JS frontend
    ├── index.html
    ├── style.css
    └── app.js
```