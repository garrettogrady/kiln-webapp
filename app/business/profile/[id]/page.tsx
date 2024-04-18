import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {fetchInvoiceById, fetchCustomers, fetchPromotionById, fetchBusinessById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {Suspense} from "react";
import Footer from "@/app/ui/components/layout/footer";
import {PromotionDescription} from "@/app/ui/components/promotion/product-description";
import {Gallery} from "@/app/ui/components/promotion/gallery";
import {lusitana} from "@/app/ui/fonts";
import {CardsSkeleton, InvoiceSkeleton, RevenueChartSkeleton} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import LatestPromotions from "@/app/ui/dashboard/latest-promotions";

export const metadata: Metadata = {
    title: 'View Promotion',
};
export default async function ProfilePage({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <Suspense fallback={<InvoiceSkeleton />}>
                <LatestPromotions id={id}/>
            </Suspense>
        </main>
    );
}
