'use client'
import OnboardPage from "@/app/creator/onboard/onboard-page";
import Image from "next/image";
import party from "/party.png";
const ContactPage: React.FC = () => {
    const handleGetStarted = () => {
        // Handle button click
        console.log('Get Started clicked');
    };

    return (
        <OnboardPage
            title=""
            description="you're all set! let's get you some free stuff"
            activeStep={5}
            totalSteps={5}
            buttonText="Get Started"
            onButtonClick={handleGetStarted}
            isProvisioning={false}
        >
            <Image src="/onboard/party.png"
                   width={500}
                   height={500}
                   alt="lets party"/>
        </OnboardPage>
    );
};

export default ContactPage;