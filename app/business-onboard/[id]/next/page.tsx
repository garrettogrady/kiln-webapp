'use client'
import React from 'react';
import OnboardLayout from "@/app/creator-onboard/[id]/onboard-page";
import OnboardPage from "@/app/creator-onboard/[id]/onboard-page";
import {useRouter} from "next/navigation";
import LogoHeader from "@/app/ui/components/logo-header";
import CreditCardComponent from "@/app/ui/components/credit-card-view";
import ProgressIndicator from "@/app/ui/components/progress-indicator";

const NextPage: React.FC = () => {
    const router = useRouter();
    const handleLinkMe = () => {
        // Handle button click

    };

    return (
    <div className="min-h-screen bg-white flex flex-col">
        <div className="relative h-16 flex items-center justify-center">
            <LogoHeader />
        </div>
        <main className="flex-grow flex flex-col items-center justify-center p-4 mt-20">
            <h1 className="text-2xl font-bold text-center">Account Setup Complete</h1>
            <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                Your account is setup! A KILN member will reach out to you shortly to help you create your first promotion.
            </p>
        </main>
    </div>
    );
};

export default NextPage;