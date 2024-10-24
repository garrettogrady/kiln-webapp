import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';

export function CreateCampaign({ businessId }: { businessId: string }) {
  return (
    <Link
      href={`/business/${businessId}/promotions/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Promotion</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdatePromotion({ promotionId, businessId }: { promotionId: string, businessId: string }) {
  return (
      <Link
          href={`/business/${businessId}/promotions/${promotionId}/edit`}
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <PencilIcon className="h-5 md:ml-4" />
      </Link>
  );
}

export function DeleteCampaign({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
      <form action={deleteInvoiceWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>
  );
}
