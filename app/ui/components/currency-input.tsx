// CurrencyInput.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import {CurrencyDollarIcon} from "@heroicons/react/24/outline";

interface CurrencyInputProps {
    label?: string;
    id: string;
    name: string;
    placeholder?: string;
    value?: number | null;
    onChange?: (value: number | null) => void;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
}
const CurrencyInput: React.FC<CurrencyInputProps> = ({
                                                        label,
                                                        id,
                                                        name,
                                                        placeholder = "0.00",
                                                        value,
                                                        onChange,
                                                        className = "",
                                                        required = false,
                                                        disabled = false,
                                                        error = "",
                                                    }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        // Allow empty input
        if (rawValue === '') {
            setInputValue('');
            onChange?.(null);
            return;
        }

        // Remove non-numeric characters except decimal point
        const cleanValue = rawValue.replace(/[^\d.]/g, '');

        // Ensure only one decimal point
        const parts = cleanValue.split('.');
        let formattedValue = parts[0];
        if (parts.length > 1) {
            formattedValue += '.' + parts[1].slice(0, 2); // Limit to 2 decimal places
        }

        setInputValue(formattedValue);

        // Convert to number and call onChange
        const numericValue = parseFloat(formattedValue);
        if (!isNaN(numericValue)) {
            onChange?.(numericValue);
        }
    };

    // Update input value when controlled value changes
    useEffect(() => {
        if (value === null || value === undefined) {
            setInputValue('');
        } else {
            setInputValue(value.toString());
        }
    }, [value]);


    return (
        < >
            <input
                id={id}
                name={name}
                type="text"
                value={inputValue}
                onChange={handleChange}
                className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500
              ${error ? 'border-red-500' : 'border-gray-200'}
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            `}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            />
        </>
    );
};

export default CurrencyInput;