import Form from '@/app/ui/campaigns/create-form';
import Breadcrumbs from '@/app/ui/campaigns/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Campaign',
};
export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Campaigns', href: '/dashboard/promotions' },
                    {
                        label: 'Create Campaign',
                        href: '/dashboard/campaign/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}