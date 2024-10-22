import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import {fetchCampaignCardData, fetchCardData} from '@/app/lib/data';

const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export default async function EngagementCards({promotionId}: { promotionId: string }) {
    const numberOfRedemptions = await fetchCampaignCardData(promotionId);
    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                <Card title="Creators" value={0} type="redemptions"  />
                <Card title="Total Business Spend" value="$0.00" type="spend" />
                <Card title="Total Business Overspend" value="$0.00" type="spend" />
                <Card title="Total Engagement" value="0" type="engagement" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                <Card title="Total Posts" value={0} type="posts" />
                <Card title="Engagement Rate" value="0" type="engagement" />
                <Card title="Value Per Engagement" value="$0.00" type="posts" />
                <Card title="Value Per Impression" value="$0.00" type="posts" />

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
    type: string;
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
