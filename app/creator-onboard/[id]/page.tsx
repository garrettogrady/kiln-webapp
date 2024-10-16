// app/creator/[id]/page.tsx
import { sql } from '@vercel/postgres';
import {KilnLogo} from "@/app/ui/KilnLogo";
import UserForm from "@/app/ui/creator/onboard/creator-form";
import {fetchOnboardById} from "@/app/lib/data";
import PasswordForm from "@/app/ui/creator/onboard/password-form";
import FormContainer from "@/app/ui/creator/onboard/form-container";


export default async function CreatorPage({ params }: { params: { id: string } }) {

    const userData = await fetchOnboardById(params.id);

    if (!userData) {
        return <div>User not found</div>;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <KilnLogo />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Welcome to KILN
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    We just need you to verify some information for us real quick
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <FormContainer initialData={userData} />
                </div>
            </div>
        </div>
    );
}