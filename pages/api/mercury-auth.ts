import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import {sql} from "@vercel/postgres";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { cardSuffix, factorToken } = req.body;

    if (!cardSuffix || !factorToken) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Query the database
        const result = await sql`
                    SELECT users.email
                    FROM cardinfo
                    JOIN users ON cardinfo."userId" = users.id
                    WHERE cardinfo."cardSuffix" = ${cardSuffix}`;
        console.log('SQL query result:', result);
        const userEmail = result.rows[0];

        ///SELECT users.email
        // FROM cardinfo
        // JOIN users ON cardinfo."userId" = users.id
        // WHERE cardinfo."cardSuffix" = 3456;

        if (!userEmail) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(userEmail)

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: "garrett@trykiln.com",
            subject: 'KILN Card Code',
            html: `<p>Your authentication code is:  ${factorToken}</p>`,
        });

        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }

        return res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}