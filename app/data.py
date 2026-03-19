# ============================================================
#  portfolio/app/data.py
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
        "hometown":  "Chennai, IN",
        "education": "M.Tech Computer Science Engineering — VIT University (2024)",
        "languages": "English, Tamil",
        "interests": "Photography, Type Design, Open Source Contribution",
        "email":     "fedricksamuel2000@gmail.com",
        "mobile":    "+91-8124194752",
        "available": "Freelance & Full-time",
    },

    "location": "Bangalore, IN",
    "email":    "fedricksamuel2000@gmail.com",
    "github":   "https://github.com/Fedrick007",
    "linkedin": "https://www.linkedin.com/in/fedricksamuel/",
    "twitter":  "https://x.com/fedrickofficial",

    "skills": [
        {"category": "Frontend",  "list": ["React", "TypeScript", "Next.js", "Three.js", "Tailwind CSS"]},
        {"category": "Backend",   "list": ["Python", "Flask", "FastAPI", "Node.js", "PostgreSQL", "Redis"]},
        {"category": "Tools",     "list": ["Docker", "AWS", "Git", "Figma", "Linux"]},
        {"category": "Concepts",  "list": ["REST APIs", "CI/CD", "Agile", "System Design", "Performance"]},
    ],

    # ── Featured projects (shown on homepage) ─────────────────
    "projects": [
        {
            "id": "01", "title": "NeuralCanvas",
            "category": "AI / Creative Tool",
            "description": "A real-time collaborative canvas powered by generative AI. Users draw rough sketches and the model renders them into stunning artwork in under 200 ms.",
            "tech": ["React", "Python", "WebSockets", "Stable Diffusion"],
            "year": "2026", "color": "#00E5FF",
            "github": "https://github.com/Fedrick007/neuralcanvas",
            "live": "#",
        },
        {
            "id": "02", "title": "Chronos",
            "category": "Productivity / SaaS",
            "description": "A time-tracking SaaS that uses ML to automatically categorize work, predict deadlines, and generate burnout-risk alerts for remote teams.",
            "tech": ["Next.js", "FastAPI", "PostgreSQL", "scikit-learn"],
            "year": "2026", "color": "#BF5FFF",
            "github": "https://github.com/Fedrick007/chronos",
            "live": "#",
        },
        {
            "id": "03", "title": "DeepRoute",
            "category": "Maps / Open Source",
            "description": "An open-source routing engine optimised for cyclists and pedestrians, processing 2M+ route requests daily with sub-50 ms latency.",
            "tech": ["Go", "Redis", "OpenStreetMap", "Docker"],
            "year": "2025", "color": "#00E5B0",
            "github": "https://github.com/Fedrick007/deeproute",
            "live": "#",
        },
        {
            "id": "04", "title": "Spectra UI",
            "category": "Design System",
            "description": "A zero-dependency design system with 60+ accessible components, dark-mode support, and auto-generated documentation from TypeScript types.",
            "tech": ["TypeScript", "Storybook", "CSS Variables", "Jest"],
            "year": "2025", "color": "#FF4D8D",
            "github": "https://github.com/Fedrick007/spectra-ui",
            "live": "#",
        },
    ],

    # ── All projects (shown on /projects page) ─────────────────
    "all_projects": [
        # 2026
        {"id": "01", "title": "NeuralCanvas",       "category": "AI / Creative Tool",     "description": "Real-time collaborative canvas powered by generative AI, rendering sketches into artwork in under 200 ms.",         "tech": ["React", "Python", "WebSockets", "Stable Diffusion"], "year": "2026", "color": "#00E5FF", "github": "https://github.com/Fedrick007/neuralcanvas",        "live": "#", "status": "Live"},
        {"id": "02", "title": "Chronos",             "category": "Productivity / SaaS",    "description": "ML-powered time-tracking SaaS with deadline prediction and burnout-risk alerts for remote teams.",                    "tech": ["Next.js", "FastAPI", "PostgreSQL", "scikit-learn"],  "year": "2026", "color": "#BF5FFF", "github": "https://github.com/Fedrick007/chronos",            "live": "#", "status": "Live"},
        {"id": "03", "title": "PixelForge",          "category": "Developer Tool",          "description": "A browser-based pixel-art editor with export to CSS sprites, WebP, and animated GIF — zero dependencies.",           "tech": ["Vanilla JS", "Canvas API", "WASM"],                  "year": "2026", "color": "#FFB830", "github": "https://github.com/Fedrick007/pixelforge",         "live": "#", "status": "Live"},
        {"id": "04", "title": "FlowMind",            "category": "AI / Productivity",       "description": "AI-assisted mind-mapping tool that auto-suggests branches and links related ideas across sessions.",                  "tech": ["React", "OpenAI API", "D3.js", "SQLite"],            "year": "2026", "color": "#FF4D8D", "github": "https://github.com/Fedrick007/flowmind",           "live": "#", "status": "WIP"},
        {"id": "05", "title": "CodeVault",           "category": "Developer Tool",          "description": "Encrypted local-first code snippet manager with tagging, fuzzy search, and CLI access.",                            "tech": ["Electron", "TypeScript", "SQLite", "AES-256"],       "year": "2026", "color": "#00E5B0", "github": "https://github.com/Fedrick007/codevault",          "live": "#", "status": "Live"},
        # 2025
        {"id": "06", "title": "DeepRoute",           "category": "Maps / Open Source",      "description": "Open-source routing engine optimised for cyclists and pedestrians — 2M+ requests/day, sub-50 ms latency.",          "tech": ["Go", "Redis", "OpenStreetMap", "Docker"],            "year": "2025", "color": "#00E5FF", "github": "https://github.com/Fedrick007/deeproute",          "live": "#", "status": "Live"},
        {"id": "07", "title": "Spectra UI",          "category": "Design System",           "description": "Zero-dependency design system — 60+ accessible components, dark-mode, auto-docs from TypeScript types.",             "tech": ["TypeScript", "Storybook", "CSS Variables", "Jest"],  "year": "2025", "color": "#BF5FFF", "github": "https://github.com/Fedrick007/spectra-ui",         "live": "#", "status": "Live"},
        {"id": "08", "title": "DataLens",            "category": "Data Visualisation",      "description": "Interactive dashboards for large CSV/JSON datasets with auto-detected chart types and shareable embed links.",         "tech": ["React", "D3.js", "FastAPI", "Pandas"],               "year": "2025", "color": "#FF4D8D", "github": "https://github.com/Fedrick007/datalens",           "live": "#", "status": "Live"},
        {"id": "09", "title": "SwiftForm",           "category": "Fullstack / SaaS",        "description": "Drag-and-drop form builder with conditional logic, webhook integrations, and a 99.9% uptime SLA.",                  "tech": ["Next.js", "Node.js", "MongoDB", "Stripe"],           "year": "2025", "color": "#FFB830", "github": "https://github.com/Fedrick007/swiftform",          "live": "#", "status": "Live"},
        {"id": "10", "title": "BeatGrid",            "category": "Audio / Creative",        "description": "Browser-based step sequencer for lo-fi beats — 16-track grid, sample library, real-time export to WAV.",            "tech": ["Web Audio API", "React", "Tone.js"],                 "year": "2025", "color": "#00E5B0", "github": "https://github.com/Fedrick007/beatgrid",           "live": "#", "status": "Live"},
        {"id": "11", "title": "ShopSense",           "category": "E-Commerce",              "description": "Headless commerce storefront with AI-powered recommendations, sub-1s page loads, and PWA support.",                 "tech": ["Next.js", "Shopify API", "Redis", "TailwindCSS"],    "year": "2025", "color": "#FF4D8D", "github": "https://github.com/Fedrick007/shopsense",          "live": "#", "status": "Live"},
        {"id": "12", "title": "LogPilot",            "category": "DevOps / CLI",            "description": "Structured log aggregator with real-time tail, grep, and anomaly alerts — works locally and on remote SSH.",         "tech": ["Python", "Click", "Rich", "WebSockets"],             "year": "2025", "color": "#00E5FF", "github": "https://github.com/Fedrick007/logpilot",           "live": "#", "status": "Live"},
        # 2024
        {"id": "13", "title": "ResumeAI",            "category": "AI / Career",             "description": "GPT-4-powered resume tailor — parses job descriptions and rewrites your bullet points to match ATS keywords.",       "tech": ["Python", "OpenAI", "Flask", "React"],                "year": "2024", "color": "#BF5FFF", "github": "https://github.com/Fedrick007/resumeai",           "live": "#", "status": "Live"},
        {"id": "14", "title": "PingWatch",           "category": "Monitoring / DevOps",     "description": "Lightweight uptime monitor with SMS + email alerts, response-time graphs, and a public status page.",               "tech": ["Node.js", "Cron", "Twilio", "PostgreSQL"],           "year": "2024", "color": "#FFB830", "github": "https://github.com/Fedrick007/pingwatch",          "live": "#", "status": "Live"},
        {"id": "15", "title": "TypeForge",           "category": "Design / Typography",     "description": "Variable-font playground — tweak axis values live, preview on real text, and export CSS custom-property snippets.",  "tech": ["Vanilla JS", "CSS Houdini", "OpenType.js"],          "year": "2024", "color": "#00E5B0", "github": "https://github.com/Fedrick007/typeforge",          "live": "#", "status": "Live"},
        {"id": "16", "title": "QuickMeet",           "category": "Productivity",            "description": "One-click video-call rooms with no sign-up, E2E-encrypted chat, and ephemeral file sharing up to 100 MB.",          "tech": ["WebRTC", "Socket.io", "Node.js", "React"],           "year": "2024", "color": "#FF4D8D", "github": "https://github.com/Fedrick007/quickmeet",          "live": "#", "status": "Archived"},
        {"id": "17", "title": "GeoSnap",             "category": "Maps / Photography",      "description": "Geotagged photo journal — pins images on a map, clusters by location, and generates travel-path animations.",        "tech": ["React", "Mapbox", "Flask", "SQLite"],                "year": "2024", "color": "#00E5FF", "github": "https://github.com/Fedrick007/geosnap",            "live": "#", "status": "Live"},
        {"id": "18", "title": "AnnotateX",           "category": "ML / Data",               "description": "Fast image annotation tool with YOLO export — polygon, bbox, and keypoint modes with keyboard shortcuts.",           "tech": ["Python", "OpenCV", "React", "FastAPI"],              "year": "2024", "color": "#BF5FFF", "github": "https://github.com/Fedrick007/annotatex",          "live": "#", "status": "Live"},
        {"id": "19", "title": "Brainwave",           "category": "Education / AI",          "description": "Spaced-repetition flashcard app that auto-generates cards from uploaded PDFs using LLM summarisation.",             "tech": ["Next.js", "LangChain", "PostgreSQL", "OpenAI"],      "year": "2024", "color": "#FFB830", "github": "https://github.com/Fedrick007/brainwave",          "live": "#", "status": "Live"},
        {"id": "20", "title": "CryptoBoard",         "category": "Finance / Dashboard",     "description": "Real-time crypto portfolio tracker with P&L charts, tax-lot accounting, and CSV export for tax season.",             "tech": ["React", "WebSocket", "CoinGecko API", "Chart.js"],   "year": "2024", "color": "#00E5B0", "github": "https://github.com/Fedrick007/cryptoboard",        "live": "#", "status": "Live"},
        {"id": "21", "title": "DocuSign Clone",      "category": "Fullstack / Legal",       "description": "E-signature platform with PDF annotation, signer order, and audit trail — built as a learning project.",            "tech": ["React", "PDF.js", "Node.js", "MongoDB"],             "year": "2024", "color": "#FF4D8D", "github": "https://github.com/Fedrick007/docusign-clone",     "live": "#", "status": "Archived"},
        {"id": "22", "title": "CLI Portfolio",       "category": "Fun / Terminal",          "description": "Interactive terminal-style portfolio — navigate with keyboard commands just like a real shell. Try it yourself.",    "tech": ["Vanilla JS", "CSS", "Xterm.js"],                     "year": "2024", "color": "#BF5FFF", "github": "https://github.com/Fedrick007/cli-portfolio",       "live": "#", "status": "Live"},
    ],

    "experience": [
        {
            "role": "Data Annotator", "company": "OLA Krutrim",
            "period": "Mar 2025 — Jul 2025",
            "desc": "Annotated and labeled 50,000+ data samples with 98% accuracy, improving machine learning model performance and consistency.",
        },
        {
            "role": "Full Stack Developer", "company": "Freelancer",
            "period": "Jul 2025 — Present",
            "desc": "Delivered 10+ freelance full-stack projects, maintaining 100% on-time delivery and achieving strong client satisfaction with scalable, high-quality solutions.",
        },
    ],
    "motto": {
        "quote":  "Intelligence plus character - that is the goal...",
        "author": "Martin Luther King Jr.",
    },
}
