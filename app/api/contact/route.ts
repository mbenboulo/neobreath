import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const { name, email, comment } = await request.json();

        // Validate input
        if (!name || !email || !comment) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Configure transporter
        // Note: For Gmail, you often need to use an App Password if 2FA is enabled.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // e.g. 'your-email@gmail.com'
                pass: process.env.EMAIL_PASS, // e.g. 'app-specific-password'
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to: "mackleodebenboulo+neobreath@gmail.com", // receiver address
            replyTo: email,
            subject: `Neobreath Support Inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Comment:
${comment}
            `,
            html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>New Support Inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <hr />
    <p><strong>Comment:</strong></p>
    <p style="white-space: pre-wrap;">${comment}</p>
</div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
