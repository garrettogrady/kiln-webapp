import {lusitana} from "@/app/ui/fonts";
import {Suspense} from "react";
import {CardsSkeleton, InvoiceSkeleton} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/creator/cards";
import LatestPromotions from "@/app/ui/dashboard/latest-promotions";
import AdminCardWrapper from "@/app/ui/admin/business-cards";
import LatestSignups from "@/app/ui/admin/latest-signups";
import AdminCreatorCardWrapper from "@/app/ui/admin/creator-cards";
import CreatorAdminTable from "@/app/ui/admin/creator-table";
export default async function CreatorAdminPage() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Profile
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <AdminCreatorCardWrapper  />
                </Suspense>
            </div>
            <CreatorAdminTable/>
        </main>
    );
}
