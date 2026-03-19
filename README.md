# Fedrick Samuel W — Developer Portfolio

> Full-Stack Developer & Creative Technologist · Bangalore, IN

A personal portfolio website built with **Python Flask** and **Vanilla JS** — featuring a dark luxury design system, live smoke canvas effects, light/dark mode, 22+ project showcase, filterable skills, and a working SMTP contact form.

[![Live Demo](https://img.shields.io/badge/Live_Demo-fedrick--portfolio.onrender.com-00E5FF?style=flat-square&logo=render&logoColor=white)](https://fedrick-portfolio.onrender.com)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-BF5FFF?style=flat-square)](LICENSE)

---

## Pages

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Hero, About, Skills, Featured Projects, Experience, Contact CTA |
| **Projects** | `/projects` | Full archive of 22+ projects with hamburger filter drawer |
| **Contact** | `/contact` | SMTP-powered contact form |

---

## Features

- 🌫️ **Live smoke canvas** — multi-colour particle system that follows the cursor, toggleable
- 🌗 **Dark / Light mode** — persisted via `localStorage`, soft pastel smoke in light mode
- ⚡ **Loader animation** — spinning FS monogram with progress counter
- ✍️ **Typing effect** — cycles through Developer · Designer · Builder · Creator
- 📸 **Profile avatar** — conic-gradient halo ring with hover zoom
- 🎛️ **Hamburger project filter** — discipline, year, and status filters with live count
- 💊 **Skill pills** — horizontal scrollable rows with official Devicons CDN logos + proficiency dots
- 📱 **Fully responsive** — mobile-first with hamburger nav drawer
- 📬 **Contact form** — SMTP email delivery with flash feedback
- 🔄 **Scroll animations** — intersection-observer reveal on all sections
- 💼 **Work style badges** — Remote / Hybrid / On-site indicator

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.11, Flask 3.0 |
| Templating | Jinja2 |
| Frontend | Vanilla HTML5, CSS3, JavaScript (no frameworks) |
| Fonts | Cormorant Garamond, DM Mono, Plus Jakarta Sans |
| Icons | Devicons CDN (official tech logos) |
| Email | Python `smtplib` + Gmail SMTP |
| Deployment | Render (free tier) |

---

## Project Structure

```
portfolio_v2/
│
├── run.py                    # Entry point
├── requirements.txt          # Python dependencies
├── render.yaml               # Render deployment config
├── .env                      # Environment variables (never commit)
├── .gitignore
└── README.md
│
└── app/
    ├── __init__.py           # App factory — create_app()
    ├── routes.py             # URL route handlers
    ├── data.py               # All portfolio content — edit this
    ├── config.py             # Reads secrets from environment
    │
    ├── templates/
    │   ├── index.html        # Home page
    │   ├── projects.html     # Projects archive page
    │   └── contact.html      # Contact form page
    │
    └── static/
        ├── css/style.css     # Full stylesheet (dark/light tokens)
        ├── js/main.js        # Smoke canvas, filters, animations
        └── img/fedrick.jpg   # Profile photo
```

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Fedrick007/Fedrick-Portfolio.git
cd Fedrick-Portfolio
```

### 2. Create a virtual environment

```bash
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
SECRET_KEY=your-long-random-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your_gmail@gmail.com
```

> **Gmail App Password** — Google Account → Security → 2-Step Verification → App Passwords → Generate a 16-character password.

### 5. Run

```bash
python run.py
```

Open **http://localhost:5000**

---

## Personalising Content

Every piece of content lives in **`app/data.py`**. Edit the `portfolio` dictionary — no other file needs to change for content updates.

```python
portfolio = {
    "name":     "Your Name",
    "title":    "Your Role",
    "bio":      "Short bio...",
    "location": "Your City",
    "email":    "you@example.com",
    "github":   "https://github.com/you",
    "linkedin": "https://linkedin.com/in/you",
    "twitter":  "https://x.com/you",

    "details": {
        "hometown":  "City, Country",
        "education": "Degree — University (Year)",
        "languages": "English, Tamil",
        "interests": "Photography, Open Source",
        "email":     "you@example.com",
        "mobile":    "+91-XXXXXXXXXX",
        "available": "Freelance & Full-time",
    },

    "skills":       [...],   # Category → list of tech
    "projects":     [...],   # Featured (shown on homepage)
    "all_projects": [...],   # Full archive (shown on /projects)
    "experience":   [...],   # Work history
    "motto":        {...},   # Favourite quote
}
```

---

## API Endpoints

| Route | Method | Returns |
|---|---|---|
| `/` | GET | Home page |
| `/projects` | GET | Projects archive page |
| `/contact` | GET | Contact form |
| `/contact` | POST | Submits form, sends email |
| `/api/projects` | GET | All projects as JSON |
| `/api/skills` | GET | Skills as JSON |
| `/api/experience` | GET | Experience as JSON |

---

## Deployment on Render

1. Push to GitHub
2. [render.com](https://render.com) → **New Web Service** → connect your repo
3. Set commands:
   - **Build:** `pip install -r requirements.txt`
   - **Start:** `gunicorn "app:create_app()" --bind 0.0.0.0:$PORT`
4. Add environment variables in the Render dashboard:

| Variable | Value |
|---|---|
| `SECRET_KEY` | Any long random string |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASSWORD` | Gmail 16-char App Password |
| `ADMIN_EMAIL` | Where contact form emails are delivered |

5. Click **Deploy** ✅

---

## License

MIT — free to use, fork, and adapt with attribution.

---

## Author

**Fedrick Samuel W** — Full-Stack Developer & Creative Technologist

[![GitHub](https://img.shields.io/badge/@Fedrick007-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Fedrick007)
[![LinkedIn](https://img.shields.io/badge/fedricksamuel-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/fedricksamuel)
[![X](https://img.shields.io/badge/@fedrickofficial-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/fedrickofficial)
[![Email](https://img.shields.io/badge/fedricksamuel2000@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:fedricksamuel2000@gmail.com)