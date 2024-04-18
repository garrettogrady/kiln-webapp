import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {fetchEnrollmentCount} from "@/app/lib/data";

export default function Enrollment({ promotionId }: { promotionId: string }) {
    const enrollmentCount = fetchEnrollmentCount(promotionId)
  return (
   <>
       {enrollmentCount}
   </>
    );
}
