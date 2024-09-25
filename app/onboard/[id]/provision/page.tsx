'use client'
import OnboardPage from "@/app/onboard/[id]/onboard-page";
import {useRouter} from "next/navigation";

export default function ProvisionCardPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleClick = () => {
        // Handle button click
        console.log('Link Me clicked');
        router.push('/onboard/'+ params.id + '/contact');
    };

    return (
        <OnboardPage
            title="provision card"
            description="Final step! Let's get your KILN card set up. Head on over to wallet and select new card and add the following details"
            activeStep={3}
            totalSteps={5}
            buttonText="Next"
            onButtonClick={handleClick}
            isProvisioning={true}
        >
        </OnboardPage>
    );
};