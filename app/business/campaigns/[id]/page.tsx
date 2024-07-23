import {lusitana} from "@/app/ui/fonts";
import {Suspense} from "react";
import {CardsSkeleton, InvoiceSkeleton} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import LatestPromotions from "@/app/ui/dashboard/latest-promotions";
import {fetchPromotionById} from "@/app/lib/data";
import EngagementCards from "@/app/ui/campaigns/engagement-card";
import Table from "@/app/ui/campaigns/table";
import ContributorsTable from "@/app/ui/campaigns/contributors-table";
import ShowForm from "@/app/ui/campaigns/show-form";
import Breadcrumbs from "@/app/ui/campaigns/breadcrumbs";

export const metadata = {
    description: 'View Campaign',
    openGraph: {
        type: 'website'
    }
};

export default async function Page({ params }: { params: { id: string } }) {
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchPromoptionsPages(query);
    const id = params.id;
    const promotion = await fetchPromotionById(id);

    return (
        <>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Campaigns', href: '/dashboard/campaigns' },
                {
                    label: 'View Campaign',
                    href: '/dashboard/campaigns/view',
                    active: true,
                },
            ]}
        />

        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                {promotion.title}
            </h1>
            <EngagementCards promotionId={id} />

            <ContributorsTable  />

            <ShowForm {...promotion}/>

        </main>
        </>
    );
}
