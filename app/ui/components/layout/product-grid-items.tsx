import Grid from '@/app/ui/components/grid';
import { GridTileImage } from '@/app/ui/components/grid/tile';
import Link from 'next/link';
import { PromotionGrid } from "@/app/lib/definitions";

interface ProductGridItemsProps {
    promotion: PromotionGrid;
}

const ProductGridItems: React.FC<ProductGridItemsProps> = ({ promotion }) => {
    return (
        <Grid.Item key={promotion.id} className="animate-fadeIn">
            <Link className="relative inline-block h-full w-full" href={`/creator/promotions/${promotion.id}`}>
                <GridTileImage
                    alt={promotion.title}
                    label={{
                        title: promotion.title,
                        amount: `$${promotion.minOfferPrice.toString()} USD`,
                    }}
                    src={promotion.featuredImage}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
            </Link>
        </Grid.Item>
    );
};

export default ProductGridItems;
