"use client";
import {lusitana} from "@/app/ui/fonts";
import {Suspense, useState} from "react";
import {useRouter} from "next/navigation";


type CreditCardData = {
    cardholderName: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    creatorId: string;
};


export default function ApprovalPage({ params }: { params: { creatorId: string } }) {
    const [formData, setFormData] = useState<CreditCardData>({
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        creatorId: params.creatorId
    });
    const router = useRouter()


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Submitting business form:', formData);
            const response = await fetch('/api/approve-creator', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
        }
        catch (e) {
            console.log("error " + e)
        }

        router.push('/admin/creator');
    };

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Creator Approval
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            id="creatorId"
                            name="creatorId"
                            type="hidden"
                            value={params.creatorId}
                        />
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="cardholderName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Cardholder Name
                                </label>
                                <input
                                    id="cardholderName"
                                    name="cardholderName"
                                    type="text"
                                    value={formData.cardholderName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="cardNumber"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Card Number
                                </label>
                                <input
                                    id="cardNumber"
                                    name="cardNumber"
                                    type="text"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="expirationDate"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Expiration Date
                                    </label>
                                    <input
                                        id="expirationDate"
                                        name="expirationDate"
                                        type="text"
                                        value={formData.expirationDate}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="cvv"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        CVV
                                    </label>
                                    <input
                                        id="cvv"
                                        name="cvv"
                                        type="password"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="123"
                                        maxLength={4}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-6"
                            >
                                Approve
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
