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
            const isOnRoot = nextUrl.pathname === '/';
            const isOnlogout = nextUrl.pathname.startsWith('/logout');
            const isOnlogin = nextUrl.pathname.startsWith('/login');
            const isOnCreatorPage = nextUrl.pathname.startsWith('/creator');
            const isOnBusinessPage = nextUrl.pathname.startsWith('/business');
            const isOnProfilePage = nextUrl.pathname.endsWith('/profile');
            const isOnRegisterPage = nextUrl.pathname.startsWith('/register');
            const isCreatorOnboardPage = nextUrl.pathname.startsWith('/creator-onboard');
            const isBusinessOnboardPage = nextUrl.pathname.startsWith('/business-onboard');
            const isAdminPage = nextUrl.pathname.startsWith('/admin');
            const isAdminCreatorPage = nextUrl.pathname.startsWith('/admin/creator');

            if (isOnRegisterPage || isCreatorOnboardPage || isBusinessOnboardPage) {
                return true;
            }

            if (isOnlogout && isLoggedIn) {
                return true;
            }

            if ((isOnlogin || isOnRoot) && isLoggedIn) {
                console.log("on login")
                if (userType === 'admin') {
                    return Response.redirect(new URL('/admin/business', nextUrl));
                } else if (userType === 'business') {
                    return Response.redirect(new URL('/business/'+auth?.user?.id+'/promotions', nextUrl));
                } else if (userType === 'creator') {
                    return Response.redirect(new URL('/creator/promotions', nextUrl));
                }
            }


            if (userType === 'admin') {
                console.log("on admin");
                if (isAdminCreatorPage){
                    return true;
                }
                return true;
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
                    return Response.redirect(new URL('/creator/promotions', nextUrl));
                }
            }

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