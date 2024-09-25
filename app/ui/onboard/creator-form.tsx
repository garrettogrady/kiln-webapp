'use client'
import React, { useState } from 'react'
import {updateUserData} from "@/app/lib/actions";
import {CreatorOnboardData} from "@/app/lib/definitions";

interface UserFormProps {
    initialData: CreatorOnboardData
    onComplete: (updatedData: CreatorOnboardData) => void
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onComplete }) => {
    const [formData, setFormData] = useState<CreatorOnboardData>(initialData)
    const [isEditing, setIsEditing] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
        setHasChanges(true)
    }

    const handleSubmit = async () => {
        try {
            await updateUserData(formData)
            setIsEditing(false)
            setHasChanges(false)
            onComplete(formData)
        } catch (error) {
            console.error('Error updating user data:', error)
        }
    }

    const toggleEdit = () => {
        if (isEditing && hasChanges) {
            setFormData(initialData)
            setHasChanges(false)
        }
        setIsEditing(!isEditing)
    }

    return (
        <div className="space-y-6">
            {Object.entries(formData).map(([key, value]) => (
                key !== 'id' && (
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
                )
            ))}
            <div className="flex flex-col space-y-4">
                <button
                    type="button"
                    onClick={toggleEdit}
                    className="w-full flex justify-center py-2 px-4 border border-[#254442] rounded-md shadow-sm text-sm font-medium text-[#254442] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#254442]"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#254442] hover:bg-[#78a5a2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#254442]"
                >
                    Looks Good!
                </button>
            </div>
        </div>
    )
}

export default UserForm