import Image from 'next/image';
import {UpdateInvoice, DeleteInvoice, GotoBusiness} from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import {fetchBusinessById, fetchBusinesses, fetchCampaigns, fetchFilteredInvoices} from '@/app/lib/data';
import {fetchAuthedUserId} from "@/app/lib/actions";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  MusicalNoteIcon, PencilIcon, PlusIcon,
  ShoppingBagIcon, SparklesIcon
} from "@heroicons/react/24/outline";
import CampaignStatus from "@/app/ui/campaigns/status";
import Enrollment from "@/app/ui/campaigns/enrollment";
import Link from "next/link";
import {Button} from "@/app/ui/button";

export default async function BusinessTable() {
  // const businessId = await fetchAuthedUserId();
  // const promotions = await fetchCampaigns(businessId);
  const businesses = await fetchBusinesses();
  console.log(businesses);
  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Business List</h1>
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-5 font-medium sm:pl-6">Business Name</th>
            <th className="px-4 py-5 font-medium sm:pl-6">Business Type</th>
            <th className="px-4 py-5 font-medium sm:pl-6">Instagram</th>
            <th className="px-4 py-5 font-medium sm:pl-6">Actions</th>
          </tr>
          </thead>
          <tbody>
          {businesses.map((business) => (
              <tr key={business.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-3 py-3">{business.businessName}</td>
                <td className="whitespace-nowrap px-3 py-3">{business.businessType}</td>
                <td className="whitespace-nowrap px-3 py-3">{business.businessInstagram}</td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <GotoBusiness id={business.id} />
                  </div>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};