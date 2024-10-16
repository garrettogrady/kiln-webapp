'use client'
import OnboardPage from "@/app/creator-onboard/[id]/onboard-page";
import Image from "next/image";
import party from "/party.png";
import {useRouter} from "next/navigation";
import React from "react";
export default function DonePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleGetStarted = () => {
        // Handle button click
        console.log('handleGetStarted clicked');
        router.push('/creator/promotions')
    };

    return (
        <OnboardPage
            title="You're all set! "
            description="Welcome to the KILNxcrew. Time to unlock your first rewards—book your first offer today and start earning with your posts!"
            activeStep={5}
            totalSteps={5}
            buttonText="Get Started"
            onButtonClick={handleGetStarted}
            isProvisioning={false}
        >
            <br/>
            {/*<h3 className="text-2xl font-bold text-center">How KILN works:</h3>*/}
            <h5 className="text-1xl font-bold text-center">Book your offer</h5>
            <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                See a spot you like? Claim the offer and use it within the timeframe.
            </p>
            <br/>
            <h5 className="text-1xl font-bold text-center">Share your experience</h5>
            <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                Get creative—post about it, tag the business, and tag us @kilnxcrew.
            </p>
            <br/>
            <h5 className="text-1xl font-bold text-center">Tap your KILN card</h5>
            <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                When youre checking out, use your KILN card from your wallet.
            </p>
            <br/>
            <h5 className="text-1xl font-bold text-center">Submit receipt to earn status & rewards</h5>
            <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                Send us your receipt to earn status and rewards.
            </p>
            <br/>
            <Image src="/onboard/party.png"
                   width={300}
                   height={300}
                   alt="lets party"/>
        </OnboardPage>
    );
};
