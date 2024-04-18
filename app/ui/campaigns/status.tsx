import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CampaignStatus({ endDate }: { endDate: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': endDate === 'pending',
          'bg-green-500 text-white': endDate === 'paid',
        },
      )}
    >
      {Date.parse(endDate) > Date.now() ? (
        <>
          Open
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) :
          <>
              Closed
              <CheckIcon className="ml-1 w-4 text-white" />
          </>}
    </span>
  );
}
