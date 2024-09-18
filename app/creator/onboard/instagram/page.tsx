'use client'
import React from 'react';
import OnboardLayout from "@/app/creator/onboard/onboard-page";
import OnboardPage from "@/app/creator/onboard/onboard-page";
import {useRouter} from "next/navigation";

const LinkInstagramPage: React.FC = () => {
    const router = useRouter();
    const handleClick = () => {
        // Handle button click
        console.log('Link Me clicked');
        router.push('/creator/onboard/bank');
        const instagramAppId = "1018860226699258";
        const redirectUri = "localhost:3000/api/instagram-callback";
        const scope = "user_profile,user_media";
        const appSecret = "89ce4b84cb0f03215cf11d3374ae527d";
        const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${instagramAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
        router.push(instagramAuthUrl);
    };

    return (
        <OnboardPage
            title="Link Instagram"
            description="In order to verify content, KILN needs access to your instagram. Don't worry we don't access anything that we should not :)"
            activeStep={1}
            totalSteps={5}
            buttonText="Link Me"
            onButtonClick={handleClick}
            isProvisioning={false}
        />
    );
};

export default LinkInstagramPage;