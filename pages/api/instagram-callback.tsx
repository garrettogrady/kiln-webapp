import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Missing code parameter' });
    }

    try {
        const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
            client_id: process.env.INSTAGRAM_APP_ID,
            client_secret: process.env.INSTAGRAM_APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI,
            code,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token, user_id } = tokenResponse.data;

        // Store the access_token and user_id in your database
        // Associate it with the current user's session
        console.log('access_token:', access_token);
        console.log('user_id:', user_id);

        // Redirect the user back to your app
        res.redirect('/creator-onboard/bank');
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Failed to authenticate with Instagram' });
    }
}