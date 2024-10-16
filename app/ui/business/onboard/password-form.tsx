'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {businessOnboard, creatorOnboard} from "@/app/lib/actions";
import {fetchOnboardById} from "@/app/lib/data";
import {BusinessOnboardData} from "@/app/lib/definitions";

const PasswordForm: React.FC<{ businessData: BusinessOnboardData }> = ({ businessData }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long")
            return
        }

        try {
            //await use(userId, password)
            //const creator = await fetchOnboardById(userId);
            await businessOnboard(businessData, password);
            router.push('/business-onboard/'+businessData.id+'/next')
        } catch (error) {
            console.error('Error updating password:', error)
            setError('Failed to update password. Please try again.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Create Your Password</h3>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#254442] focus:border-[#254442] sm:text-sm"
                    required
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#254442] hover:bg-[#78a5a2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#254442]"
            >
                Create Password
            </button>
        </form>
    )
}

export default PasswordForm