import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import Blueprint, render_template, jsonify, request, redirect, url_for, flash, current_app
from app.data import portfolio

main = Blueprint("main", __name__)


# ── Portfolio pages ───────────────────────────────────────────────────────────

@main.route("/")
def index():
    return render_template("index.html", data=portfolio)


@main.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name    = request.form.get("name",    "").strip()
        email   = request.form.get("email",   "").strip()
        message = request.form.get("message", "").strip()

        # Basic validation
        if not name or not email or not message:
            flash("All fields are required.", "error")
            return render_template("contact.html", data=portfolio)

        # Send email via SMTP
        success, error = send_email(name, email, message)

        if success:
            flash("Your message was sent! I'll get back to you soon.", "success")
            return redirect(url_for("main.contact"))
        else:
            flash(f"Failed to send message: {error}", "error")
            return render_template("contact.html", data=portfolio,
                                   form_data={"name": name, "email": email, "message": message})

    return render_template("contact.html", data=portfolio)


# ── JSON APIs ─────────────────────────────────────────────────────────────────

@main.route("/api/projects")
def get_projects():
    return jsonify(portfolio["projects"])


@main.route("/api/skills")
def get_skills():
    return jsonify(portfolio["skills"])


@main.route("/api/experience")
def get_experience():
    return jsonify(portfolio["experience"])


# ── Helper ────────────────────────────────────────────────────────────────────

def send_email(sender_name, sender_email, message_body):
    """Send a contact-form email to the admin via SMTP. Returns (success, error_msg)."""
    try:
        cfg = current_app.config

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact — {sender_name}"
        msg["From"]    = cfg["SMTP_USER"]
        msg["To"]      = cfg["ADMIN_EMAIL"]
        msg["Reply-To"] = sender_email

        # Plain-text fallback
        text = (
            f"New message from your portfolio contact form\n"
            f"{'─' * 40}\n"
            f"Name   : {sender_name}\n"
            f"Email  : {sender_email}\n"
            f"{'─' * 40}\n\n"
            f"{message_body}"
        )

        # HTML version
        html = f"""
        <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:auto;
                    background:#080C14;color:#EDE8DF;padding:40px;border-radius:4px;">
          <p style="font-family:monospace;font-size:11px;color:#E8FF47;
                    letter-spacing:3px;text-transform:uppercase;margin:0 0 24px;">
            // New Portfolio Message
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
            <tr>
              <td style="font-family:monospace;font-size:11px;color:#4A4843;
                         text-transform:uppercase;letter-spacing:1px;
                         padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);
                         width:80px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);
                         color:#EDE8DF;">{sender_name}</td>
            </tr>
            <tr>
              <td style="font-family:monospace;font-size:11px;color:#4A4843;
                         text-transform:uppercase;letter-spacing:1px;
                         padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                <a href="mailto:{sender_email}" style="color:#E8FF47;">{sender_email}</a>
              </td>
            </tr>
          </table>
          <p style="font-family:monospace;font-size:11px;color:#4A4843;
                    text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Message</p>
          <p style="line-height:1.7;color:#8A8680;font-style:italic;
                    border-left:2px solid #E8FF47;padding-left:16px;margin:0;">
            {message_body.replace(chr(10), '<br>')}
          </p>
          <p style="font-family:monospace;font-size:10px;color:#4A4843;
                    margin-top:32px;border-top:1px solid rgba(255,255,255,0.07);
                    padding-top:16px;">
            Sent via your portfolio contact form
          </p>
        </div>
        """

        msg.attach(MIMEText(text, "plain"))
        msg.attach(MIMEText(html,  "html"))

        with smtplib.SMTP(cfg["SMTP_HOST"], cfg["SMTP_PORT"]) as server:
            server.ehlo()
            server.starttls()
            server.login(cfg["SMTP_USER"], cfg["SMTP_PASSWORD"])
            server.sendmail(cfg["SMTP_USER"], cfg["ADMIN_EMAIL"], msg.as_string())

        return True, None

    except Exception as e:
        return False, str(e)