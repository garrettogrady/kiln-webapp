import React, {ReactNode, useEffect, useState} from 'react';
import {KilnLogo} from "@/app/ui/KilnLogo";
import ProgressIndicator from "@/app/ui/components/progress-indicator";
import LogoHeader from "@/app/ui/components/logo-header";
import {useRouter} from "next/navigation";
import {CardInfo} from "@/app/lib/definitions";
import {fetchCardObject} from "@/app/lib/actions";
import CreditCardComponent from "@/app/ui/components/credit-card-view";


interface OnboardPageProps {
    title: string;
    description: string;
    activeStep: number;
    totalSteps: number;
    buttonText: string;
    isProvisioning: boolean;
    onButtonClick: () => void;
    children?: ReactNode;
    showBackButton?: boolean;
    id?: string;
}

const OnboardPage: React.FC<OnboardPageProps> = ({
                                                   title,
                                                   description,
                                                   activeStep,
                                                   totalSteps,
                                                   buttonText,
                                                   onButtonClick,
                                                    isProvisioning,
                                                   children,
                                                     showBackButton = true,
                                                    id,
                                               }) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="relative h-16 flex items-center justify-center">
                <LogoHeader />
                {showBackButton && (
                    <button
                        onClick={handleBack}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-[#254442]"
                        aria-label="Go back"
                    >
                        <div className="pt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                    </button>
                )}
            </div>
            <main className="flex-grow flex flex-col items-center justify-center p-4 mt-20">
                <h1 className="text-2xl font-bold text-center">{title}</h1>
                <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                    {description}
                </p>
                {children}
                {isProvisioning && (
                    <CreditCardComponent id={id}/>
                )}
                <ProgressIndicator totalSteps={totalSteps} activeStep={activeStep} />
                <button
                    onClick={onButtonClick}
                    className="mt-8 w-full max-w-xs py-2 px-4 bg-[#254442] text-white rounded-md"
                >
                    {buttonText}
                </button>
            </main>
        </div>
    );
};

export default OnboardPage;