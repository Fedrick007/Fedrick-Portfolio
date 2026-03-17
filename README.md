# Fedrick Samuel — Developer Portfolio

A personal portfolio website built with **Python Flask**, featuring a neo-brutalist editorial design with smooth animations, a working contact form via SMTP, and a clean application factory structure.

---

## Live Demo

🔗 [fedrick-portfolio.onrender.com](https://fedrick-portfolio.onrender.com)

---

## Preview

| Section | Description |
|---|---|
| **Hero** | Animated name reveal, circular profile photo with spinning ring, stats box |
| **About** | Personal details box, skills grid |
| **Projects** | Hover-animated project list with tech tags |
| **Experience** | Timeline-style work history |
| **Contact** | SMTP-powered contact form + social icons |

---

## Tech Stack

- **Backend** — Python 3.11, Flask 3.0
- **Templating** — Jinja2
- **Frontend** — Vanilla HTML, CSS, JavaScript (no frameworks)
- **Email** — Python `smtplib` + Gmail SMTP
- **Fonts** — Playfair Display, Space Mono, Crimson Pro (Google Fonts)
- **Deployment** — Render (free tier)

---

## Project Structure

```
portfolio_v2/
│
├── run.py                    # Entry point
├── requirements.txt          # Python dependencies
├── render.yaml               # Render deployment config
├── .gitignore
├── .env.example              # Environment variable template
├── README.md
│
└── app/
    ├── __init__.py           # App factory (create_app)
    ├── routes.py             # URL route handlers
    ├── data.py               # All portfolio content — edit this!
    ├── config.py             # Reads secrets from environment variables
    │
    ├── templates/
    │   ├── index.html        # Main portfolio page
    │   └── contact.html      # Contact form page
    │
    └── static/
        ├── css/
        │   └── style.css     # Full stylesheet
        ├── js/
        │   └── main.js       # Animations & interactions
        └── img/
            └── profile.jpg   # Profile photo
```

---

## Features

- ⚡ Loader animation with progress counter
- 🎨 Scroll-triggered reveal animations on all sections
- ✍️ Typing effect cycling through developer roles
- 🔄 Animated spinning ring around profile photo
- 📊 Counting number animations for stats
- 🎯 Scroll progress bar
- 📱 Fully responsive (mobile-friendly)
- 📬 Contact form with SMTP email delivery
- 💾 Flash messages for form success/error feedback
- 🖱️ Magnetic button hover effect
- ✨ Scrolling skills marquee ticker

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/fedrick-portfolio.git
cd fedrick-portfolio
```

### 2. Create a virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your real values:

```env
SECRET_KEY=your-super-secret-key
SMTP_USER=your_gmail@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your_gmail@gmail.com
```

> **Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords → Generate

### 5. Run the development server

```bash
python run.py
```

Open **http://localhost:5000** in your browser.

---

## Personalising Content

All portfolio content is in **`app/data.py`** — edit the `portfolio` dict:

```python
portfolio = {
    "name":     "Your Name",
    "title":    "Your Job Title",
    "bio":      "Your short bio...",
    "location": "Your City",
    "email":    "you@example.com",
    "github":   "https://github.com/you",
    "linkedin": "https://linkedin.com/in/you",
    "twitter":  "https://twitter.com/you",
    "details": {
        "born":      "Year, City",
        "education": "Degree — University (Year)",
        "languages": "English, Tamil",
        "interests": "Photography, Open Source",
        "available": "Freelance & Full-time",
    },
    "skills":     [...],
    "projects":   [...],
    "experience": [...],
}
```

No other file needs to change for content updates.

---

## API Endpoints

| Route | Method | Returns |
|---|---|---|
| `/` | GET | Portfolio home page |
| `/contact` | GET | Contact form page |
| `/contact` | POST | Submits form, sends email |
| `/api/projects` | GET | Projects JSON |
| `/api/skills` | GET | Skills JSON |
| `/api/experience` | GET | Experience JSON |

---

## Deployment on Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set build & start commands:
   - **Build:** `pip install -r requirements.txt`
   - **Start:** `gunicorn "app:create_app()" --bind 0.0.0.0:$PORT`
5. Add environment variables in the Render dashboard:
   ```
   SECRET_KEY
   SMTP_USER
   SMTP_PASSWORD
   ADMIN_EMAIL
   ```
6. Deploy ✅

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `SECRET_KEY` | Flask session signing key — any long random string |
| `SMTP_USER` | Gmail address used to send emails |
| `SMTP_PASSWORD` | Gmail 16-character App Password |
| `ADMIN_EMAIL` | Email address where contact form messages are delivered |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Fedrick Samuel W**
- GitHub: [@Fedrick007](https://github.com/Fedrick007)
- LinkedIn: [linkedin.com/in/fedricksamuel](https://linkedin.com/in/fedricksamuel)
- Portfolio: [fedrick-portfolio.onrender.com](https://fedrick-portfolio.onrender.com)
