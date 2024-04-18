import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export default async function EngagementCards() {
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();
    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                <Card title="Creators" value={numberOfInvoices} type="creators" />
                <Card title="Total Spend" value="$2598.73" type="spend" />
                <Card title="Total Engagement" value="134.2K" type="engagement" />
                <Card title="Total Impressions" value="10.5K" type="impressions" />

            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                <Card title="Total Posts" value={numberOfInvoices} type="posts" />
                <Card title="Engagement Rate" value="2.5%" type="engagement" />
                <Card title="Value Per Engagement" value="$.27" type="posts" />
                <Card title="Value Per Impression" value="$.94" type="posts" />

            </div>
        </>

    );
}

export function Card({
                         title,
                         value,
                         type,
                     }: {
    title: string;
    value: number | string;
    type: 'open' | 'closed' | 'totalPromotions' | 'totalBusinesses';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
