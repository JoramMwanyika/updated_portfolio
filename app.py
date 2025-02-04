from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']

    # Email configuration
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = email  # Use the email provided in the form
    receiver_email = "jorammwanyika@gmail.com"
    password = "your-app-password"  # Replace with your app password

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f"New Contact Form Submission: {subject}"

    body = f"""
    Name: {name}
    Email: {email}
    Subject: {subject}
    Message: {message}
    """
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Create a secure SSL context
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(receiver_email, password)
        server.send_message(msg)
        server.quit()
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({"error": "Failed to send email"}), 500

if __name__ == '__main__':
    app.run(debug=True)

