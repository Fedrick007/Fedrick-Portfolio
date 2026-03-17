# Analog Glitch Portfolio — Flask

A unique developer portfolio built with Python Flask using the **application factory** pattern.

---

## Folder Structure

```
portfolio/
│
├── run.py                  # ← Entry point — start the server here
├── requirements.txt        # Python dependencies
│
└── app/                    # Application package
    ├── __init__.py         # App factory (create_app)
    ├── routes.py           # All URL route handlers
    ├── data.py             # Portfolio content (edit this!)
    │
    ├── templates/
    │   └── index.html      # Jinja2 HTML template
    │
    └── static/
        ├── css/
        │   └── style.css   # Full stylesheet (Analog Glitch theme)
        └── js/
            └── main.js     # Animations, cursor, scroll effects
```

---

## Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the development server
python run.py

# 3. Open in your browser
#    http://localhost:5000
```

---

## Personalising Your Portfolio

All content is in **`app/data.py`**. Edit the `portfolio` dict:

```python
portfolio = {
    "name":     "Your Name",
    "title":    "Your Job Title",
    "email":    "you@example.com",
    "location": "Your City",
    "github":   "https://github.com/you",
    ...
    "projects":   [...],   # your projects
    "skills":     [...],   # skill categories
    "experience": [...],   # work history
}
```

No other file needs to change for content updates.

---

## API Endpoints

The app also exposes JSON endpoints for each content section:

| Route             | Returns              |
|-------------------|----------------------|
| `GET /`           | Full portfolio page  |
| `GET /api/projects`   | Projects JSON    |
| `GET /api/skills`     | Skills JSON      |
| `GET /api/experience` | Experience JSON  |

---

## Production Deployment

```bash
pip install gunicorn
gunicorn "app:create_app()" -w 4 -b 0.0.0.0:8000
```
