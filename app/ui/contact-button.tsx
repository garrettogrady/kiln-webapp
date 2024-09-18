import React from 'react';

const ContactButton = () => {
    const handleClick = () => {
        // Prepare the contact information
        const contact = {
            name: 'John Doe',
            phone: '+1234567890',
            email: 'john.doe@example.com'
        };

        // Create the vCard format
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone}
EMAIL:${contact.email}
END:VCARD`;

        // Encode the vCard for the URL
        const encodedVCard = encodeURIComponent(vcard);

        // Create the tel URI with the encoded vCard
        const telUri = `tel:${contact.phone}?contact=${encodedVCard}`;

        // Open the URI
        window.location.href = telUri;
    };

    return (
        <div className="pt-12 pb-12">
            <button onClick={handleClick} className="w-half flex justify-center py-2 px-4 border border-[#254442] rounded-md shadow-sm text-sm font-medium text-[#254442] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#254442]"
            >
                Add Contact
            </button>
        </div>
    );
};

export default ContactButton;