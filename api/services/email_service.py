import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
try:
    from ..models import DailyBrief
except ImportError:
    try:
        from api.models import DailyBrief
    except ImportError:
        from models import DailyBrief

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_pass = os.getenv("SMTP_PASSWORD")
        self.from_email = os.getenv("FROM_EMAIL", self.smtp_user)

    def send_daily_brief(self, to_email: str, brief: DailyBrief):
        if not self.smtp_user or not self.smtp_pass:
            print("SMTP credentials not set. Skipping email.")
            # For verification, log content
            print(f"Would send email to {to_email} with subject 'Daily Brief {brief.date}'")
            return

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"🏠 Insights Imobiliários: {brief.date}"
        msg["From"] = self.from_email
        msg["To"] = to_email

        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #2563eb;">Elite Real Estate - Daily Insights</h2>
                <p>Aqui estão os destaques de hoje ({brief.date}):</p>
                
                <h3 style="color: #f97316;">🔥 Reddit Trends</h3>
                <ul>
                    {''.join([f'<li><a href="{p.url}">{p.title}</a> (Score: {p.score})</li>' for p in brief.reddit_posts])}
                </ul>

                <h3 style="color: #3b82f6;">📰 Notícias de Mercado</h3>
                <ul>
                    {''.join([f'<li><a href="{p.url}">{p.title}</a></li>' for p in brief.news_articles])}
                </ul>

                 <h3 style="color: #22c55e;">🕸️ Top Landing Pages</h3>
                <ul>
                    {''.join([f'<li><a href="{p.url}">{p.title}</a></li>' for p in brief.landing_pages])}
                </ul>
                
                <p style="margin-top: 30px; font-size: 12px; color: #888;">
                    Enviado automaticamente pelo Elite Agent.
                </p>
            </div>
          </body>
        </html>
        """

        part = MIMEText(html, "html")
        msg.attach(part)

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_user, self.smtp_pass)
            server.sendmail(self.from_email, to_email, msg.as_string())
            server.quit()
            print(f"Email sent to {to_email}")
        except Exception as e:
            print(f"Failed to send email: {e}")
