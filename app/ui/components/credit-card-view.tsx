import React, {useEffect, useState} from 'react';
import { CreditCard, Check } from 'lucide-react';
import {fetchCardObject} from "@/app/lib/actions";

interface CardInfo {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}

const CreditCardComponent: React.FC<{ id: string }> = ({ id }) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const emptyCardInfo: CardInfo = {
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    }

    const [cardInfo, setCardInfo] = useState<CardInfo>(emptyCardInfo);

    useEffect(() => {
        const getCardInfo = async () => {
            if (id) {
                try {
                    const fetchedCardInfo = await fetchCardObject(id!);
                    setCardInfo(fetchedCardInfo);
                } catch (error) {
                    console.error('Error fetching card information:', error);
                    // Handle the error appropriately
                }
            }
        };
        getCardInfo();
    }, [id]);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        });
    };

    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="mb-4 relative">
                <div
                    className="w-full p-3 text-lg bg-gray-100 rounded flex justify-between items-center cursor-pointer"
                    onClick={() => copyToClipboard(cardInfo.cardNumber, 'cardNumber')}
                >
                    <span>{cardInfo.cardNumber}</span>
                    {copiedField === 'cardNumber' ? (
                        <Check size={20} className="text-green-500" />
                    ) : (
                        <span className="text-sm text-gray-500">Click to copy</span>
                    )}
                </div>
            </div>

            <div className="flex space-x-4">
                <div
                    className="w-1/2 p-3 text-lg bg-gray-100 rounded flex justify-between items-center cursor-pointer"
                    onClick={() => copyToClipboard(cardInfo.expirationDate, 'expiration')}
                >
                    <span>{cardInfo.expirationDate}</span>
                    {copiedField === 'expiration' && <Check size={20} className="text-green-500" />}
                </div>
                <div
                    className="w-1/2 p-3 text-lg bg-gray-100 rounded flex justify-between items-center cursor-pointer"
                    onClick={() => copyToClipboard(cardInfo.cvv, 'cvc')}
                >
                    <span>{cardInfo.cvv}</span>
                    {copiedField === 'cvc' && <Check size={20} className="text-green-500" />}
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <CreditCard size={24} className="text-gray-400" />
            </div>
        </div>
    );
};

export default CreditCardComponent;