'use client'
import React, { useState } from 'react'
import UserForm from "@/app/ui/creator/onboard/creator-form";
import PasswordForm from "@/app/ui/creator/onboard/password-form";
import {CreatorOnboardData} from "@/app/lib/definitions";

const FormContainer: React.FC<{ initialData: CreatorOnboardData }> = ({ initialData }) => {
    const [step, setStep] = useState<'user' | 'password'>('user')
    const [userData, setUserData] = useState<CreatorOnboardData>(initialData)

    const handleUserFormComplete = (updatedData: CreatorOnboardData) => {
        setUserData(updatedData)
        setStep('password')
    }

    return (
        <>
            {step === 'user' && (
                <UserForm initialData={userData} onComplete={handleUserFormComplete} />
            )}
            {step === 'password' && (
                <PasswordForm creatorData={userData} />
            )}
        </>
    )
}

export default FormContainer