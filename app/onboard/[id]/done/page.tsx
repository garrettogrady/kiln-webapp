'use client'
import OnboardPage from "@/app/onboard/[id]/onboard-page";
import Image from "next/image";
import party from "/party.png";
import {useRouter} from "next/navigation";
export default function DonePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleGetStarted = () => {
        // Handle button click
        console.log('handleGetStarted clicked');
        router.push('/creator/promotions')
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
