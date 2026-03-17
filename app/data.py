# ============================================================
#  portfolio/app/data.py
#  All portfolio content lives here
# ============================================================

portfolio = {
    "name": "Fedrick Samuel W",
    "title": "Full-Stack Developer & Creative Technologist",
    "tagline": "I build things that live on the internet",
    "bio": (
        "A developer obsessed with the intersection of code and design. "
        "1+ years crafting digital experiences that are fast, accessible, "
        "and unforgettable."
    ),
    "details": {
    "hometown":      "Chennai, IN",
    "education": "M.Tech Computer Science Engineering — VIT University (2024)",
    "languages": "English, Tamil",
    "interests": "Photography, Type Design, Open Source Contribution",
    "email":"fedricksamuel2000@gmail.com",
    "mobile":"+91-8124194752",
    "available": "Freelance & Full-time",
},

    "location": "Bangalore, IN",
    "email": "fedricksamuel2000@gmail.com",
    "github": "https://github.com/Fedrick007",
    "linkedin": "https://www.linkedin.com/in/fedricksamuel/",
    "twitter": "https://x.com/fedrickofficial",

    # ── Skills ────────────────────────────────────────────────
    "skills": [
        {"category": "Frontend",  "list": ["React", "TypeScript", "Next.js", "Three.js", "Tailwind CSS"]},
        {"category": "Backend",   "list": ["Python", "Flask", "FastAPI","Node.js", "PostgreSQL", "Redis"]},
        {"category": "Tools",     "list": ["Docker", "AWS", "Git", "Figma", "Linux"]},
        {"category": "Concepts",  "list": ["REST APIs", "CI/CD", "Agile", "System Design", "Performance"]},
    ],

    # ── Projects ──────────────────────────────────────────────
    "projects": [
        {
            "id": "01",
            "title": "NeuralCanvas",
            "category": "AI / Creative Tool",
            "description": (
                "A real-time collaborative canvas powered by generative AI. "
                "Users draw rough sketches and the model renders them into "
                "stunning artwork in under 200 ms."
            ),
            "tech": ["React", "Python", "WebSockets", "Stable Diffusion"],
            "year": "2026",
            "color": "#E8FF47",
            "link": "#",
        },
        {
            "id": "02",
            "title": "Chronos",
            "category": "Productivity / SaaS",
            "description": (
                "A time-tracking SaaS that uses ML to automatically categorize "
                "work, predict deadlines, and generate burnout-risk alerts for "
                "remote teams."
            ),
            "tech": ["Next.js", "FastAPI", "PostgreSQL", "scikit-learn"],
            "year": "2026",
            "color": "#FF6B6B",
            "link": "#",
        },
        {
            "id": "03",
            "title": "DeepRoute",
            "category": "Maps / Open Source",
            "description": (
                "An open-source routing engine optimised for cyclists and "
                "pedestrians, processing 2 M+ route requests daily with "
                "sub-50 ms latency."
            ),
            "tech": ["Go", "Redis", "OpenStreetMap", "Docker"],
            "year": "2025",
            "color": "#A8E6CF",
            "link": "#",
        },
        {
            "id": "04",
            "title": "Spectra UI",
            "category": "Design System",
            "description": (
                "A zero-dependency design system with 60+ accessible components, "
                "dark-mode support, and auto-generated documentation from "
                "TypeScript types."
            ),
            "tech": ["TypeScript", "Storybook", "CSS Variables", "Jest"],
            "year": "2025",
            "color": "#C9B8FF",
            "link": "#",
        },
    ],

    # ── Experience ────────────────────────────────────────────
    "experience": [
        {
            "role": "Data Annotator",
            "company": "OLA Krutrim",
            "period": "Mar 2025 — Jul 2025",
            "desc": (
                "Annotated and labeled 50,000+ data samples with 98% accuracy,"
                 "improving machine learning model performance and consistency."
            ),
        },
        {
            "role": "Full Stack Developer",
            "company": "Freelancer",
            "period": "Jul 2025 — Present",
            "desc": (
                "Delivered 10+ freelance full-stack projects,"
                " maintaining 100% on-time delivery and achieving strong client satisfaction with scalable, high-quality solutions."
                 
            ),
        },
    ],
    "motto": {
    "quote":  "Intelligence plus character - that is the goal...",
    "author": "Martin Luther King Jr.",
},
}
