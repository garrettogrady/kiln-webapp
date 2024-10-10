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
            title="Add Card to Wallet"
            description="Once your KILN card is added to your wallet, it’s all you need to access your experiences."
            activeStep={3}
            totalSteps={5}
            buttonText="Next"
            onButtonClick={handleClick}
            isProvisioning={true}
            id={params.id}
        >
        </OnboardPage>
    );
};