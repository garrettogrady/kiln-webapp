'use client'
import React, { useState } from 'react'
import UserForm from "@/app/ui/business/onboard/business-form";
import PasswordForm from "@/app/ui/business/onboard/password-form";
import {BusinessOnboardData} from "@/app/lib/definitions";

const FormContainer: React.FC<{ initialData: BusinessOnboardData }> = ({ initialData }) => {
    const [step, setStep] = useState<'user' | 'password'>('user')
    const [userData, setUserData] = useState<BusinessOnboardData>(initialData)

    const handleUserFormComplete = (updatedData: BusinessOnboardData) => {
        setUserData(updatedData)
        setStep('password')
    }

    return (
        <>
            {step === 'user' && (
                <UserForm initialData={userData} onComplete={handleUserFormComplete} />
            )}
            {step === 'password' && (
                <PasswordForm businessData={userData} />
            )}
        </>
    )
}

export default FormContainer