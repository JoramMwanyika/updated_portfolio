from flask import Flask, request, render_template
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)

# Store your API key in an environment variable for security
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")  # Set this in your system's environment variables
TO_EMAIL = "jorammwanyika@gmail.com"  # Replace with your email

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    email_content = f"Name: {name}\nEmail: {email}\nMessage: {message}"

    # Create an email message using SendGrid
    mail = Mail(
        from_email="your_sendgrid_verified_jorammwanyika@gmail.com",  # Must be a verified sender in SendGrid
        to_emails=TO_EMAIL,
        subject="New Contact Form Submission",
        plain_text_content=email_content
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(mail)
        return "Form submitted successfully!"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    app.run(debug=True)
