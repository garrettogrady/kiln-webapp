'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon, ReceiptPercentIcon,
} from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {LinkList} from "@/app/lib/definitions";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const creatorLinks = [
  { name: 'Home', href: '/creator/promotions', icon: 'home' },
  { name: 'Profile', href: '/creator/profile', icon: 'reciept' },
];

const businessLinks = [
  { name: 'Promotions', href: '/business/promotions', icon: 'home' },
  { name: 'Billing', href: '/business/billing', icon: 'reciept' },
];

const adminLinks = [
  { name: 'creators', href: '/admin/creator', icon: 'home' },
  { name: 'business', href: '/admin/business', icon: 'reciept' },
];
export default function NavLinks({links}:{links: LinkList[];}) {

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        //const LinkIcon = link.icon;
        return (
            <Link
                key={link.name}
                href={link.href}
                className={clsx(
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-[#254442] hover:bg-gray-200 md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                      'bg-gray-300': pathname === link.href,
                    }
                )}
            >
              {/*<LinkIcon className="w-6 text-[#254442]" />*/}
              <p className="hidden md:block">{link.name}</p>
            </Link>
        );
      })}
    </>
  );
}
