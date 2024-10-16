import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {fetchInvoiceById, fetchCustomers, fetchPromotionById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EditPromotionForm from "@/app/ui/campaigns/edit-form";

export const metadata: Metadata = {
    title: 'Edit Invoices',
};
export default async function Page({ params }: { params: { id: string, promotion: string } }) {
    const id = params.promotion;
    const promotion = await fetchPromotionById(id);
    if (!promotion) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Promotions', href: '/business/promotions' },
                    {
                        label: 'Edit Promotion',
                        href: `/business/promotions/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditPromotionForm promotion={promotion} />
        </main>
    );
}