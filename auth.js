import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createGuest, getGuestByEmail } from "./app/_lib/supabase/guests";
import { credentials } from "./app/_lib/authjs/credentialsCallback";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { maxAge: 60 * 60 },
  pages: {
    signIn: "/signin",
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }),
  providers: [
    Credentials(credentials),
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    Facebook({ clientId: process.env.AUTH_FACEBOOK_ID, clientSecret: process.env.AUTH_FACEBOOK_SECRET }),
  ],
  callbacks: {
    authorized({ req, auth }) {
      return !!auth;
    },

    async signIn({ account, user }) {
      // When credentials are valid, there is no need to go through SignIn callback because
      // all the needed validation have been handled in the authorize() of the credentials provider
      if (account.provider === "credentials") return true;

      // This is for facebook provider, since some accounts might not be bound with an email address
      if (!user.email) return false;

      try {
        const guest = await getGuestByEmail(user.email);
        if (guest) {
          return true;
        }
      } catch (err) {
        return false;
      }

      // When going with OAuth providers, if a user does not have already an account, we simply create it on the go just to reduce a sign up step
      try {
        await createGuest(user.name, user.email, user.image);
      } catch (err) {
        return false;
      }

      return true;
    },

    async session({ session, token, user }) {
      const currentGuest = await getGuestByEmail(session.user.email);

      session.user.id = currentGuest.id;
      session.user.name = currentGuest.fullname;
      session.avatar = currentGuest.avatar;
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: currentGuest.fullname,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
});
