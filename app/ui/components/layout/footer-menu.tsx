'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterMenuItem = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === null);

  // useEffect(() => {
  //   setActive(pathname === item.path);
  // }, [pathname, item.path]);

  return (
    <li>
      <Link
        href="/home"
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >

      </Link>
    </li>
  );
};

export default function FooterMenu() {
  return (
    <nav>
      <ul>
          <FooterMenuItem key="home" />
      </ul>
    </nav>
  );
}
