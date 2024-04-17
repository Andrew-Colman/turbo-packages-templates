import type { NextAuthConfig } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url
        }
      }
    })
  ],
  events: {},
  callbacks: {
    session({ session, token }) {
      session!.user!.id = token.id
      session!.user!.stripeCustomerId = token.stripeCustomerId
      session!.user!.role = token.role
      return session
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        //token.id = user.id
        token.id = user.id
        token.stripeCustomerId = user.stripe_customer_id
        token.role = user.role
      }
      return token
    }
  }
} satisfies NextAuthConfig
