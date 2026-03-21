import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json(
                { error: 'Name, email and message are required.' },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: 'janarthansk@gmail.com',
            subject: subject || `New message from ${name}`,
            html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return Response.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error('Contact API error:', err);
        return Response.json(
            { error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}