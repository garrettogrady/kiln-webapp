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
        //router.push('/creator/onboard/bank');
        const instagramAppId = process.env.INSTAGRAM_APP_ID
        const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
        const scope = "user_profile,user_media";
        const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${instagramAppId}&redirect_uri=${encodeURIComponent(redirectUri!)}&scope=${scope}&response_type=code`;
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