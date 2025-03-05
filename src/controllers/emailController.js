import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

// Create Transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Use 465 for SSL
    secure: false, // Use `true` for port 465
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});


const sendEmail = async (req, res) => {
    console.log("Request: ", req.body);
    const { name, email, message } = req.body;

    try {
        // Send email to user
        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,  // Send confirmation to user
            subject: "Message Received - Aditya's Portfolio",
            text: `Hello ${name},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\n Best Regards,\nAditya Pande`
        });

        // Send email to yourself
        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: process.env.SMTP_EMAIL, // Send to your email
            subject: "New Message from Portfolio",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        res.json({
            success: true,
            message: "Email sent successfully!"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to send email"
        });
    }
};

export { sendEmail };
