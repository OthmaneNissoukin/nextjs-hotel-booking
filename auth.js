import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createGuest, getGuestByEmail } from "./app/_lib/supabase/guests";
import { credentials } from "./app/_lib/authjs/credentialsCallback";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { maxAge: 60 * 60 },
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials(credentials),
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    Facebook({ clientId: process.env.AUTH_FACEBOOK_ID, clientSecret: process.env.AUTH_FACEBOOK_SECRET }),
  ],
  callbacks: {
    authorized({ req, auth }) {
      console.log("HITTED");
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
      // console.log("++++++++ SESSION CREATED +++++++");
      // console.log(session);
      // console.log(user);

      const currentGuest = await getGuestByEmail(session.user.email);

      session.user.id = currentGuest.id;
      session.user.name = currentGuest.fullname;

      return session;
    },
  },
});
