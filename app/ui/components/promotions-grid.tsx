
import {fetchFilteredInvoices, fetchFilteredPromotions} from '@/app/lib/data';
import Grid from "@/app/ui/components/grid";
import ProductGridItems from "@/app/ui/components/layout/product-grid-items";

export default async function PromotionsGrid({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const promotions = await fetchFilteredPromotions(query, currentPage);
  console.log(promotions)
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promotion) => (
                <ProductGridItems promotion={promotion} />
            ))}
          </Grid>

        </div>
      </div>
    </div>
  );
}
