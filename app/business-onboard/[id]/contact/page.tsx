'use client'
import OnboardPage from "@/app/creator-onboard/[id]/onboard-page";
import {useRouter} from "next/navigation";
import ContactButton from "@/app/ui/contact-button";

export default function ContactPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleClick = () => {
        // Handle button click
        console.log('Link Me clicked');
        router.push('/creator-onboard/'+ params.id + '/done');
    };

    return (
        <OnboardPage
            title="Connect With the KILN Team! "
            description="Save our number to text us receipts, reviews, or just say hi. Stay up to date with important updates, exclusive offers, upcoming events, and more."
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