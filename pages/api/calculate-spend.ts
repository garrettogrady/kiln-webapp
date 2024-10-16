// pages/api/calculate-spend.js

import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { type, content } = req.body;

        try {
            const totalSpend = calculateTotalSpend(content);

            if (type === 'email') {
                // Handle email logic here
                // You might want to use a service like SendGrid or Nodemailer
                console.log('Received email with total spend:', totalSpend);
            } else if (type === 'sms') {
                // Send SMS response using Twilio
                await twilioClient.messages.create({
                    body: `Total spend calculated: $${totalSpend.toFixed(2)}`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: req.body.from // Assuming the sender's phone number is passed in the request
                });
            }

            res.status(200).json({ success: true, totalSpend });
        } catch (error) {
            console.error('Error processing message:', error);
            res.status(500).json({ success: false, error: 'Error processing message' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

function calculateTotalSpend(content: string): number {
    // Simple regex to find all dollar amounts in the content
    const regex = /\$(\d+(\.\d{2})?)/g;
    const matches = content.match(regex);

    if (!matches) return 0;

    return matches.reduce((total, match) => {
        return total + parseFloat(match.replace('$', ''));
    }, 0);
}