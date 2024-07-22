'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const creatorLinks = [
  { name: 'Home', href: '/creator/promotions', icon: HomeIcon },
  { name: 'Profile', href: '/creator/profile', icon: UserGroupIcon },
];

const businessLinks = [
  { name: 'Home', href: 'business/campaigns', icon: HomeIcon },
  { name: 'Profile', href: '/business/profile', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  let links = pathname.includes("/creator") ? creatorLinks : businessLinks;
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
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
              <LinkIcon className="w-6 text-[#254442]" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
        );
      })}
    </>
  );
}
