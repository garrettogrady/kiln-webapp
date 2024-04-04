import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: "/register/creator",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            console.log(auth)
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnProfilePage = nextUrl.pathname.endsWith('/profile');

            if (isOnDashboard) {
                if (isOnProfilePage && isLoggedIn) {
                    return Response.redirect(new URL('/dashboard/profile/'+auth?.user?.id, nextUrl));
                }
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
            }
            return token
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            //session.accessToken = token.accessToken;
            session.user.id = token.id;
            return session;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;