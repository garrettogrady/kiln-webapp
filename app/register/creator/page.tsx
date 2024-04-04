import AcmeLogo from '@/app/ui/acme-logo';
import { Metadata } from 'next';
import CreatorRegisterForm from "@/app/ui/creator-signup-form";

export const metadata: Metadata = {
    title: 'SignUp',
};

export default function SignUpPage() {
    return (
        <main className="flex items-center justify-center">
            <div className="relative mx-auto flex w-full max-w-[1000px] flex-col space-y-2.5 p-4">
                <div className="flex h-20 w-full items-end rounded-lg bg-orange-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <CreatorRegisterForm />
            </div>
        </main>
    );
}