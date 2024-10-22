import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import {sql} from "@vercel/postgres";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    if (req.method !== 'POST') {
        console.log("Method Not Allowed");
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    console.log( req.body)
    ///    cardholderName: string;
    //     cardNumber: string;
    //     expirationDate: string;
    //     cvv: string;
    //     creatorId: string;
    const { cardholderName, cardNumber,expirationDate,cvv,creatorId  } = req.body;

    const cardSuffix = cardNumber.slice(-4);
    const encryption_key = process.env.CARD_ENCRYPTION_KEY;
    try{
        const result = await sql`
                   INSERT INTO cardinfo ("userId", "cardholderName", "cardNumber", "cardSuffix", "cvv", "expirationDate")
                    VALUES (
                        ${creatorId},
                        ${cardholderName},
                        pgp_sym_encrypt(${cardNumber}, ${encryption_key}),  
                        ${cardSuffix},
                        ${cvv},
                        ${expirationDate}
                    )`
    } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

    try {
        // Query the database
        const result = await sql`
                    SELECT email
                    FROM creatorsignup
                    WHERE id = ${creatorId}`;
        console.log('SQL query result:', result);
        const userEmail = result.rows[0];


        if (!userEmail) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(userEmail.email)

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'info@trykiln.com',
            to: userEmail.email,
            subject: 'Welcome to KILN',
            html: `<p>Welcoime to KILN - please create your account here: <a>app.trykiln.com/creator-onboard/${creatorId}</a></p>`,
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