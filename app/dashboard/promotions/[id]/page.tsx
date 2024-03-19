import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {fetchInvoiceById, fetchCustomers, fetchPromotionById, fetchBusinessById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {Suspense} from "react";
import Footer from "@/app/ui/components/layout/footer";
import {PromotionDescription} from "@/app/ui/components/promotion/product-description";
import {Gallery} from "@/app/ui/components/promotion/gallery";

export const metadata: Metadata = {
    title: 'View Promotion',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const promotion = await fetchPromotionById(id);
    const business = await fetchBusinessById(promotion.businessId);
    // const [invoice, customers] = await Promise.all([
    //     fetchPromotionById(id),
    //     fetchCustomers(),
    // ]);
    if (!promotion) {
        notFound();
    }
    return (
        <main>
            <div className="mx-auto max-w-screen-2xl px-4">
                <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
                    <div className="h-full w-full basis-full lg:basis-4/6">
                        <Gallery
                            images={promotion.images.map((image) => ({
                                src: image,
                                altText: "hello"
                            }))}
                        />
                    </div>

                    <div className="basis-full lg:basis-2/6">
                        <PromotionDescription promotion={promotion} />
                    </div>
                </div>
                {/*<Suspense>*/}
                {/*    <RelatedProducts id={product.id} />*/}
                {/*</Suspense>*/}
            </div>
            <Suspense>
                <Footer />
            </Suspense>
        </main>
    );
}

// export default async function ProductPage({ params }: { params: { handle: string } }) {
//     const product = await getProduct(params.handle);
//
//     if (!product) return notFound();
//
//     const productJsonLd = {
//         '@context': 'https://schema.org',
//         '@type': 'Product',
//         name: product.title,
//         description: product.description,
//         image: product.featuredImage.url,
//         offers: {
//             '@type': 'AggregateOffer',
//             availability: product.availableForSale
//                 ? 'https://schema.org/InStock'
//                 : 'https://schema.org/OutOfStock',
//             priceCurrency: product.priceRange.minVariantPrice.currencyCode,
//             highPrice: product.priceRange.maxVariantPrice.amount,
//             lowPrice: product.priceRange.minVariantPrice.amount
//         }
//     };
//
//     return (
//         <>
//             <script
//                 type="application/ld+json"
//                 dangerouslySetInnerHTML={{
//                     __html: JSON.stringify(productJsonLd)
//                 }}
//             />
//             <div className="mx-auto max-w-screen-2xl px-4">
//                 <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
//                     <div className="h-full w-full basis-full lg:basis-4/6">
//                         <Gallery
//                             images={product.images.map((image: Image) => ({
//                                 src: image.url,
//                                 altText: image.altText
//                             }))}
//                         />
//                     </div>
//
//                     <div className="basis-full lg:basis-2/6">
//                         <ProductDescription product={product} />
//                     </div>
//                 </div>
//                 <Suspense>
//                     <RelatedProducts id={product.id} />
//                 </Suspense>
//             </div>
//             <Suspense>
//                 <Footer />
//             </Suspense>
//         </>
//     );
// }