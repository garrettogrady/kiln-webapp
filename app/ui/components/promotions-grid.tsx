import { fetchFilteredPromotions } from '@/app/lib/data';
import Grid from "@/app/ui/components/grid";
import ProductGridItems from "@/app/ui/components/layout/product-grid-items";

interface PromotionsGridProps {
    query: string;
    currentPage: number;
}

export default async function PromotionsGrid({ query, currentPage }: PromotionsGridProps) {
    const promotions = await fetchFilteredPromotions(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-white p-4 md:p-6">
                    <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">  {/* Updated gap */}
                        {promotions.map((promotion) => (
                            <ProductGridItems key={promotion.id} promotion={promotion} />
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
