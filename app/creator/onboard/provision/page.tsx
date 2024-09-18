'use client'
import OnboardPage from "@/app/creator/onboard/onboard-page";
import {useRouter} from "next/navigation";

const ProvisionCardPage: React.FC = () => {
    const router = useRouter();
    const handleClick = () => {
        // Handle button click
        console.log('Link Me clicked');
        router.push('/creator/onboard/contact');
    };

    return (
        <OnboardPage
            title="provision card"
            description="Final step! Let's get your KILN card set up. Head on over to wallet and select new card and add the following details"
            activeStep={3}
            totalSteps={5}
            buttonText="Get Started"
            onButtonClick={handleClick}
            isProvisioning={true}
        >
        </OnboardPage>
    );
};

export default ProvisionCardPage;