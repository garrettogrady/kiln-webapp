import type { NextAuthConfig } from 'next-auth';
import {User} from "@/app/lib/definitions";
import {revalidatePath} from "next/cache";

export const authConfig = {
    pages: {
        signIn: '/login',
        signOut: '/logout',
        newUser: "/register/business",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const userType = auth?.user?.type;
            console.log("userType: " + userType);
            const isOnlogout = nextUrl.pathname.startsWith('/logout');
            const isOnCreatorPage = nextUrl.pathname.startsWith('/creator');
            const isOnBusinessPage = nextUrl.pathname.startsWith('/business');
            const isOnProfilePage = nextUrl.pathname.endsWith('/profile');
            const isOnRegisterPage = nextUrl.pathname.startsWith('/register');
            const isCreatorOnboardPage = nextUrl.pathname.startsWith('/creator-onboard');
            const isBusinessOnboardPage = nextUrl.pathname.startsWith('/business-onboard');
            const isAdminPage = nextUrl.pathname.startsWith('/admin');

            if (isOnRegisterPage || isCreatorOnboardPage || isBusinessOnboardPage) {
                return true;
            }

            if (isOnlogout) {
                return true;
            }

            if (userType === 'admin') {

                if (isLoggedIn){
                    console.log("admin logged in");
                    return true;
                } else {
                    return false;
                }
            }

            if (userType === 'business') {
                if (isOnBusinessPage){
                    if (isOnProfilePage && isLoggedIn) {
                        return Response.redirect(new URL('/business/profile/'+auth?.user?.id, nextUrl));
                    }
                    if (isLoggedIn) return true;
                    return false;
                } else {
                    return Response.redirect(new URL('/business/'+auth?.user?.id+'/promotions', nextUrl));

                }

            } else if (userType === 'creator' ) {
                if(isOnCreatorPage) {
                    if (isOnProfilePage && isLoggedIn) {
                        return Response.redirect(new URL('/creator/profile/'+auth?.user?.id, nextUrl));
                    }
                    if (isLoggedIn) return true;
                    return false;
                } else {
                    revalidatePath('/creator/promotions');
                    return Response.redirect(new URL('/creator/promotions', nextUrl));
                }
            }
            // if (isOnDashboard) {
            //     if (isOnProfilePage && isLoggedIn) {
            //         return Response.redirect(new URL('/dashboard/profile/'+auth?.user?.id, nextUrl));
            //     }
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            // }

        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
                token.type = (user as User).type;
            }
            return token
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            //session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.type = token.type;
            return session;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;