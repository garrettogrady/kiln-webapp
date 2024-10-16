import Form from '@/app/ui/campaigns/create-form';
import Breadcrumbs from '@/app/ui/campaigns/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Promotion',
};
export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main>
            <Form businessId={params.id}  />
        </main>
    );
}