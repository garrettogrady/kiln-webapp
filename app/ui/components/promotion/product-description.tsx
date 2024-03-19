import Price from '@/app/ui/components/price';
import {Promotion} from "@/app/lib/definitions";


export function PromotionDescription({ promotion }: { promotion: Promotion }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{promotion.title}</h1>

        <h3 className="">{promotion.description}</h3>

      </div>
        <div className="mb-6 flex flex-col">
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                <Price
                    amount={promotion.maxOfferPrice.toString()}
                />
            </div>
        </div>
    </>
  );
}
