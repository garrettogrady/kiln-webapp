import React from 'react';
import PropTypes from 'prop-types';

export const EmailTemplate = ({ name, email, phone, city, instagram, tiktok, link }) => (
    <div style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
    }}>
        <h1 style={{
            color: '#333',
            borderBottom: '2px solid #007bff',
            paddingBottom: '10px',
            marginBottom: '20px',
        }}>New Creator Signup: {name}</h1>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <p style={{ margin: '10px 0' }}><strong>Email:</strong> {email}</p>
            <p style={{ margin: '10px 0' }}><strong>Phone:</strong> {phone}</p>
            <p style={{ margin: '10px 0' }}><strong>City:</strong> {city}</p>
            <p style={{ margin: '10px 0' }}><strong>Instagram:</strong> {instagram}</p>
            <p style={{ margin: '10px 0' }}><strong>TikTok:</strong> {tiktok}</p>
            <p style={{ margin: '10px 0' }}><strong>Link:</strong> <a href={link} style={{ color: '#007bff' }}>{link}</a></p>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
            This is an automated email. Please do not reply directly to this message.
        </div>
    </div>
);

EmailTemplate.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired,
    tiktok: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};