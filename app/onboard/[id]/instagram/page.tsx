'use client'
import React, {Suspense} from 'react';
import OnboardLayout from "@/app/onboard/[id]/onboard-page";
import OnboardPage from "@/app/onboard/[id]/onboard-page";
import {useRouter} from "next/navigation";
import {fbLogin} from "@/app/lib/facebook-sdk";
import Script from "next/script";
import InstagramConnectButton from "@/app/onboard/[id]/instagram/instagram-connect";
import LogoHeader from "@/app/ui/components/logo-header";
import ProgressIndicator from "@/app/ui/components/progress-indicator";
export default function InstagramPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleClick = () => {
        // Handle button click
        console.log('Link Me clicked');
        router.push('/onboard/' +params.id+'/provision');
    };

    const creatorId = params.id as string;
    const handleBack = () => {
        router.back();
    };
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="relative h-16 flex items-center justify-center">
                <LogoHeader />
            </div>
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center">
                    <h1 className="text-3xl font-bold mb-6">Please link your Instagram Insights for KILN</h1>

                    <p className="mb-6 text-sm">
                        To collaborate with KILN, we would need you to share your Instagram Insights with us, for
                        performance tracking and insights into audience profiles. In particular, we may show the following information to merchants*:
                    </p>

                    <ul className="mb-6 text-sm text-left list-none space-y-2 mx-auto max-w-md">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                            <span>Your username, bio, and profile photo</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                            <span>Information about posts you have made such as media, captions, and stats like number of likes and comments</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                            <span>Instagram Insights data including data about stories, impressions, and audience demographics data</span>
                        </li>
                    </ul>

                    <p className="mb-4 text-sm">
                        To authenticate, please make sure you meet the following criteria and click Link Insights below to follow the process.
                    </p>

                    <ul className="mb-6 text-sm text-left list-none space-y-2 mx-auto max-w-md">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                            <span>Your Instagram account is connected to a Facebook page (see <a href="#" className="text-blue-500 hover:underline">help article</a> for how to connect)</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                            <span>your Instagram account should be a Business Account or a Creator Account (see <a href="#" className="text-blue-500 hover:underline">help article</a> for how to convert)</span>
                        </li>
                    </ul>

                    <p className="mb-4 text-sm">
                        If you are still unable to authenticate your Instagram Insights, please check our <a href="#" className="text-blue-500 hover:underline">troubleshooting article</a> for more information.
                    </p>

                    <p className="mb-6 text-xs text-gray-500">
                        *The Instagram Insights data may also be shared with other brands on the KILN platform to help brands discover and collaborate with you.
                    </p>
                </div>

                <InstagramConnectButton />
                <ProgressIndicator totalSteps={5} activeStep={2} />
                <button
                    onClick={handleClick}
                    className="mt-8 w-full max-w-xs py-2 px-4 bg-[#254442] text-white rounded-md"
                >
                    Next
                </button>
            </div>
        </div>


    );
};