import {fetchPromotionById, fetchBusinessById, checkUserEnrollment, fetchCreatorTier} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PromotionDescription } from '@/app/ui/components/promotion/product-description';
import { Gallery } from '@/app/ui/components/promotion/gallery';
import { EnrollButton } from '@/app/ui/components/promotion/enrollment';

export const metadata: Metadata = {
    title: 'View Promotion',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const promotion = await fetchPromotionById(id);
    const business = await fetchBusinessById(promotion.businessId);
    const userTier = await fetchCreatorTier();

    const isUserEnrolled = await checkUserEnrollment(promotion.id);
    if (!promotion) {
        notFound();
    }

    return (
        <main>
            <div className="mx-auto max-w-screen-2xl px-4">
                <div className="flex flex-col lg:flex-row rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:gap-8">
                    <div className="h-full w-full basis-full lg:basis-4/6"> {/* Removed overflow-y-auto */}
                        <Gallery
                            images={promotion.images.map((image) => ({
                                src: image,
                                altText: "hello"
                            }))}
                        />
                    </div>
                    <div className="basis-full lg:basis-2/6 lg:sticky lg:top-0 lg:h-[100vh] overflow-y-auto"> {/* Added sticky and full height */}
                        <PromotionDescription promotion={promotion} business={business} tier={userTier} />
                        <EnrollButton isUserEnrolled={isUserEnrolled} promotion={promotion} tier={userTier}/>
                    </div>
                </div>
            </div>
        </main>
    );
}
