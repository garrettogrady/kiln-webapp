import {lusitana} from "@/app/ui/fonts";
import {Suspense} from "react";
import {CardsSkeleton, InvoiceSkeleton} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/creator/cards";
import LatestPromotions from "@/app/ui/dashboard/latest-promotions";
import AdminCardWrapper from "@/app/ui/admin/cards";
import LatestSignups from "@/app/ui/admin/latest-signups";

export const metadata = {
    description: 'Dashboard Page',
    openGraph: {
        type: 'website'
    }
};

export default async function DashboardPage() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Profile
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <AdminCardWrapper  />
                </Suspense>
            </div>
            <LatestSignups/>
        </main>
    );
}
