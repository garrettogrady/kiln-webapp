import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import {fetchCampaigns, fetchFilteredInvoices} from '@/app/lib/data';
import {fetchAuthedUserId} from "@/app/lib/actions";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  MusicalNoteIcon,
  ShoppingBagIcon, SparklesIcon, UserCircleIcon
} from "@heroicons/react/24/outline";
import CampaignStatus from "@/app/ui/campaigns/status";
import Enrollment from "@/app/ui/campaigns/enrollment";

export default async function ContributorsTable() {
  const businessId = await fetchAuthedUserId();
  const promotions = await fetchCampaigns(businessId);

  const enrollments = [
    { promotionId: '1e082498-f20d-4db2-8119-5aa33e0529bc', userName: '@Gartogo',  date: Date.now(), followers: "10K", posts: '3', engagement: "5K", amount: 11245 },
    { promotionId: '1e082498-f20d-4db2-8119-5aa33e0529bc', userName: '@Jack_Jones',  date: Date.now(), followers: "255K", posts: '3', engagement: "22K", amount: 6723 },
    { promotionId: '1e082498-f20d-4db2-8119-5aa33e0529bc', userName: '@Milesteller',  date: Date.now(), followers: "112K",  posts: '2', engagement: "45K", amount: 7435 },
    { promotionId: '1e082498-f20d-4db2-8119-5aa33e0529bc', userName: '@Johnsummit',  date: Date.now(), followers: "98K", posts: '2', engagement: "93K", amount: 14057 },
    { promotionId: '1e082498-f20d-4db2-8119-5aa33e0529bc', userName: '@Seanjones',  date: Date.now(), followers: "322K",posts: '3', engagement: "101K", amount: 23420 },

  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        Contributors
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {enrollments?.map((promotion) => (
              <div
                key={promotion.userId}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">

                      <p>{promotion.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{promotion.email}</p>
                  </div>
                  <InvoiceStatus status={promotion.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(promotion.amount)}
                    </p>
                    <p>{formatDateToLocal(promotion.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice promotionId={promotion.id} />
                    <DeleteInvoice promotionId={promotion.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Contributor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Followers
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Posts
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Engagement
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Spend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {enrollments?.map((enrollment) => (
                <tr
                  key={enrollment.promotionId}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <UserCircleIcon width={32} height={32} className="mr-4 rounded-full"/>
                      <p>{enrollment.userName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {enrollment.followers}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {enrollment.posts}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {enrollment.engagement}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency( enrollment.amount)}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  function selectPromotionIcon(businessType: string) {
    'use client'
    switch (businessType) {
      case "restaurant":
        return <BuildingStorefrontIcon width={32} height={32} className="mr-4 rounded-full"/>;
      case  'bar':
        return <MusicalNoteIcon width={32} height={32} className="mr-4 rounded-full"/>;
      case  'hotel':
        return <BuildingOfficeIcon width={32} height={32} className="mr-4 rounded-full"/>;
      case 'shopping':
        return <ShoppingBagIcon width={32} height={32} className="mr-4 rounded-full"/>;
      default:
        return <SparklesIcon width={32} height={32} className="mr-4 rounded-full"/>

    }
  }
}
