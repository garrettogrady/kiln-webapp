import KilnLogo from '@/app/ui/kiln-nav-header';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import {signOut} from "@/auth";

export const metadata: Metadata = {
    title: 'Logout',
};

export default function LogoutPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end bg-[#254442] p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <KilnLogo />
                        <form
                            action={async () => {
                                'use server';
                                console.log('singing out')
                                await signOut();
                            }}
                        >
                            <p>logout</p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}