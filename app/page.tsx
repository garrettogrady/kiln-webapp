import KilnNavHeader from '@/app/ui/kiln-nav-header';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import {lusitana} from "@/app/ui/fonts";
import Image from 'next/image';
import { usePathname } from 'next/navigation'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <KilnNavHeader />
      </div>
    </main>
  );
}
