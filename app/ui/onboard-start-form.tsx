import React, { useState} from "react";
import Link from "next/link";
import {fetchOnboardById, fetchPromotionById} from "@/app/lib/data";
import {CreatorOnboardData} from "@/app/lib/definitions";


export default async function CreatorOnboardForm({id}: { id: string }) {

    const user = await fetchOnboardById(id);
    console.log(user);
    const [formData, setFormData] = useState<CreatorOnboardData>({
        id: '1', // '1' is a placeholder for the actual ID
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
    );
}
