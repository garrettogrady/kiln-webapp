import SideNav from '@/app/ui/components/layout/sidenav';
import Link from "next/link";
import KilnNavHeader from "@/app/ui/kiln-nav-header";
import NavLinks from "@/app/ui/components/layout/nav-links";
import {auth, signOut} from "@/auth";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";

export default async function Layout({ children }: { children: React.ReactNode }) {


    const user = await auth();

    let links = [
        { name: 'Promotions', href: '/business/' + user?.user?.id + '/promotions', icon: 'home' },
        { name: 'Billing', href: '/business/' + user?.user?.id + '/billing', icon: 'reciept' },
    ];

    if ( user?.user?.type === 'admin') {
        links = [
            {name: 'creators', href: '/admin/creator', icon: 'home'},
            {name: 'business', href: '/admin/business', icon: 'user'},
        ];
    }

    return (

        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <div className="flex h-full flex-col px-3 py-4 bg-white md:px-2">
                    <Link
                        className="mb-4 flex h-20 items-end justify-start bg-[#254442] p-4 md:h-40"
                        href="/"
                    >
                        <div className="w-32 text-white md:w-40">
                            <KilnNavHeader />
                        </div>
                    </Link>
                    <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                        <NavLinks links={links}/>
                        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                        <form
                            action={async () => {
                                'use server';
                                console.log('singing out')
                                await signOut();
                            }}
                        >
                            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#FEF3E7] p-3 text-sm font-medium hover:bg-sky-100 hover:text-[#254442] md:flex-none md:justify-start md:p-2 md:px-3">
                                <ArrowTopRightOnSquareIcon className="w-6 text-[#254442]" />
                                <div className="hidden text-[#254442] md:block">Sign Out</div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}