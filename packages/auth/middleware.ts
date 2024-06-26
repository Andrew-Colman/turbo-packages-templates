import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "./routes";

export default function createMiddleware() {
    return auth((req) => {
        const { nextUrl } = req;
        const isLoggedIn = !!req.auth;

        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
        const isAuthRoute = authRoutes.includes(nextUrl.pathname);

        if (isApiAuthRoute && !isLoggedIn) {
            return;
        }

        if (isAuthRoute && isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (!isLoggedIn && !isPublicRoute) {
            return Response.redirect(new URL("/api/auth/signin", nextUrl));
        }

        return;
    });
}
