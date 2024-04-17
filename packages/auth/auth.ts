import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

/* pick your primsa client path here */
import { prisma } from "@package/db";

export const {
    handlers: { GET, POST },
    auth,
    signIn: signInFromConfig,
    signOut: signOutFromConfig,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },

    ...authConfig,
    events: {},
});

// TODO fix auth flow
