import NextAuth from 'next-auth';

export const metadata = {
    description: 'Profile Page',
    openGraph: {
        type: 'website'
    }
};

export default async function ProfilePage() {
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchPromotionsPages(query);
    NextAuth()
    return (

        <div className="w-full">
           <p></p>
        </div>
    );
}
