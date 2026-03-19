import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Blueprint, render_template, jsonify, request, redirect, url_for, flash, current_app
from app.data import portfolio

main = Blueprint("main", __name__)

@main.route("/")
def index():
    return render_template("index.html", data=portfolio)

@main.route("/projects")
def projects():
    return render_template("projects.html", data=portfolio)

@main.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name    = request.form.get("name",    "").strip()
        email   = request.form.get("email",   "").strip()
        message = request.form.get("message", "").strip()
        if not name or not email or not message:
            flash("All fields are required.", "error")
            return render_template("contact.html", data=portfolio)
        success, error = send_email(name, email, message)
        if success:
            flash("Your message was sent! I'll get back to you soon.", "success")
            return redirect(url_for("main.contact"))
        else:
            flash(f"Failed to send message: {error}", "error")
            return render_template("contact.html", data=portfolio,
                                   form_data={"name": name, "email": email, "message": message})
    return render_template("contact.html", data=portfolio)

@main.route("/api/projects")
def get_projects():
    return jsonify(portfolio["all_projects"])

@main.route("/api/skills")
def get_skills():
    return jsonify(portfolio["skills"])

@main.route("/api/experience")
def get_experience():
    return jsonify(portfolio["experience"])

def send_email(sender_name, sender_email, message_body):
    try:
        cfg = current_app.config
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact — {sender_name}"
        msg["From"]    = cfg["SMTP_USER"]
        msg["To"]      = cfg["ADMIN_EMAIL"]
        msg["Reply-To"] = sender_email
        text = f"Name: {sender_name}\nEmail: {sender_email}\n\n{message_body}"
        html = f"""<div style="font-family:sans-serif;max-width:560px;margin:auto;background:#06060c;color:#F0ECE8;padding:40px;">
          <p style="font-family:monospace;font-size:11px;color:#00E5FF;letter-spacing:3px;text-transform:uppercase;margin:0 0 24px;">// New Portfolio Message</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
            <tr><td style="font-family:monospace;font-size:11px;color:#3C3830;text-transform:uppercase;letter-spacing:1px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:80px;">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">{sender_name}</td></tr>
            <tr><td style="font-family:monospace;font-size:11px;color:#3C3830;text-transform:uppercase;letter-spacing:1px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);"><a href="mailto:{sender_email}" style="color:#00E5FF;">{sender_email}</a></td></tr>
          </table>
          <p style="font-family:monospace;font-size:11px;color:#3C3830;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Message</p>
          <p style="line-height:1.7;color:#8A8480;font-style:italic;border-left:2px solid #00E5FF;padding-left:16px;margin:0;">{message_body.replace(chr(10),'<br>')}</p>
        </div>"""
        msg.attach(MIMEText(text, "plain"))
        msg.attach(MIMEText(html, "html"))
        with smtplib.SMTP(cfg["SMTP_HOST"], cfg["SMTP_PORT"]) as server:
            server.ehlo(); server.starttls()
            server.login(cfg["SMTP_USER"], cfg["SMTP_PASSWORD"])
            server.sendmail(cfg["SMTP_USER"], cfg["ADMIN_EMAIL"], msg.as_string())
        return True, None
    except Exception as e:
        return False, str(e)
