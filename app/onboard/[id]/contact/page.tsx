'use client'
import OnboardPage from "@/app/onboard/[id]/onboard-page";
import {useRouter} from "next/navigation";
import ContactButton from "@/app/ui/contact-button";

export default function ContactPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleClick = () => {
        // Handle button click
        console.log('Link Me clicked');
        router.push('/onboard/'+ params.id + '/done');
    };

    return (
        <OnboardPage
            title="add us as a contact"
            description="save our number so you can text us receipts, reviews or just say what’s up"
            activeStep={4}
            totalSteps={5}
            buttonText="next"
            onButtonClick={handleClick}
            isProvisioning={false}
        >
            <ContactButton />
        </OnboardPage>
    );
};