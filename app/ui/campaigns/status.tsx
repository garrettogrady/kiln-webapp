import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CampaignStatus({ endDate, startDate }: { endDate: string,  startDate: string }) {

    const open = (<>
                    Open
                    <ClockIcon className="ml-1 w-4 text-gray-500" />
                </>)
    const upcoming = (<>
        Upcoming
            <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>)
    const closed =  <>
                        Closed
                        <CheckIcon className="ml-1 w-4 text-white" />
                    </>

    let status = closed;

    if (Date.parse(endDate) > Date.now()) {
        if (Date.parse(startDate) > Date.now()) {
            status = upcoming;
        } else {
            status = open;
        }
    }

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
     {status}
    </span>
  );
}
