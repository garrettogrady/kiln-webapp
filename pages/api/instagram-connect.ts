// pages/api/instagram-connect.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { accessToken } = req.body;

    try {
        // Get user's Instagram account ID
        const accountsResponse = await axios.get(`https://graph.facebook.com/v20.0/me?access_token=${accessToken}`);
        const pageId = accountsResponse.data.id;
        console.log(pageId);

        const instagramAccountResponse = await axios.get(`https://graph.facebook.com/v20.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`);
        const instagramAccountId = instagramAccountResponse.data.instagram_business_account.id;

        // Now you can use this Instagram account ID to make API calls
        // Store the instagramAccountId and accessToken securely in your database

        res.status(200).json({ success: true, instagramAccountId });
    } catch (error) {
        console.error('Error connecting Instagram:', error);
        res.status(500).json({ success: false, error: 'Failed to connect Instagram' });
    }
}