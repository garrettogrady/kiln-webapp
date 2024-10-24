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
    description: 'View Promotions',
    openGraph: {
        type: 'website'
    }
};

export default async function Page({ params }: { params: { id: string, promotion: string } }) {
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchPromoptionsPages(query);
    console.log("params " + params.id);
    const promotionId = params.promotion;
    const promotion = await fetchPromotionById(promotionId);

    return (
        <>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Promotions', href: '/business/'+params.id+'/promotions' },
                {
                    label: 'View Promotion',
                    href: '/business/'+params.id+'/promotions/'+promotionId,
                    active: true,
                },
            ]}
        />

        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                {promotion.title}
            </h1>
            <EngagementCards promotionId={promotionId} />

            <ContributorsTable  />

            <ShowForm promotion={promotion} businessId={params.id}/>
        </main>
        </>
    );
}
