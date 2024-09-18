'use client'
import React from 'react';
import OnboardLayout from "@/app/creator/onboard/onboard-page";
import OnboardPage from "@/app/creator/onboard/onboard-page";
import {useRouter} from "next/navigation";

const LinkBankPage: React.FC = () => {
    const router = useRouter();
    const handleLinkMe = () => {
        // Handle button click
        console.log('Link Me clicked');
        router.push('/creator/onboard/provision');
    };

    return (
        <OnboardPage
            title="Link Bank Account"
            description="Trust us... Nobody likes tax and tip but the bussinesses need it to survive. By linking your bank account we will only charge you for the tax and tip for your FREE and DISCOUNTED goods and services. "
            activeStep={2}
            totalSteps={5}
            buttonText="Link Me"
            onButtonClick={handleLinkMe}
            isProvisioning={false}
        />
    );
};

export default LinkBankPage;