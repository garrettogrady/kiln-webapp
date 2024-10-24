import React from 'react';

interface CreatorApprovalEmailTemplateProps {
    name: string;
    link: string;
}

export const CreatorApprovalEmailTemplate: React.FC<CreatorApprovalEmailTemplateProps> = ({ name, link }) => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#254442', lineHeight: '1.6' }}>
        <h1 style={{ color: '#1e90ff' }}>Welcome to KILN!</h1>
        <p>Hi {name},</p> {/* Wrap variable in curly braces */}
        <p>We’re thrilled to officially welcome you to <strong>KILN</strong>, a platform for those who love discovering and sharing their experiences. Unlike traditional rewards programs, KILN offers you the chance to get rewarded by simply sharing a few posts about a business you visited.</p>
        <p>As part of our community, you’ll access rewards to dine, shop, and book experiences—all through one platform.</p>
        <p>To start using your membership, complete your account setup by adding your card to your virtual wallet by <a href={link} style={{ color: '#254442', textDecoration: 'none' }}>clicking the link here</a>.</p> {/* Wrap variable in curly braces */}
        <p>Cheers,</p>
        <p>The KILN Membership Team</p>
    </div>
);

export default CreatorApprovalEmailTemplate;
