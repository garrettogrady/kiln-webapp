'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import {KilnLogo} from "@/app/ui/KilnLogo";
import Link from 'next/link';

type FormData = {
    name: string;
    email: string;
    phone: string;
    instagram: string;
    tiktok: string;
    city: string;
};

const Home: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: 'Garrett O\'Grady',
        email: 'garrettogrady@gmail.com',
        phone: '616-430-8879',
        instagram: '@gartogo',
        tiktok: '@gartogo',
        city: 'Los Angeles, CA',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        setIsEditing(false);
        // Here you would typically send the data to your backend
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head>
                <title>Welcome to KILN</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
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
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key}>
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                                    {key}
                                </label>
                                <div className="mt-1">
                                    <input
                                        type={key === 'email' ? 'email' : 'text'}
                                        name={key}
                                        id={key}
                                        value={value}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`appearance-none block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm ${!isEditing && 'bg-transparent'}`}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col space-y-4">
                            <button
                                type="button"
                                onClick={toggleEdit}
                                className="w-full flex justify-center py-2 px-4 border border-[#254442] rounded-md shadow-sm text-sm font-medium text-[#254442] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#254442]"
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                            <Link href="/creator/onboard/instagram" passHref>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#254442] hover:bg-[#78a5a2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#254442]"
                                >
                                    Looks Good!
                                </button>
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;