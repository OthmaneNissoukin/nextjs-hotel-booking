import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createGuest, getGuestByEmail } from "./app/_lib/supabase/guests";
import { credentials } from "./app/_lib/authjs/credentialsCallback";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials(credentials),
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
  ],
  callbacks: {
    authorized({ req, auth }) {
      console.log("HITTED");
      return !!auth;
    },

    async signIn({ account, user }) {
      try {
        const guest = await getGuestByEmail(user.email);
        if (guest) {
          return true;
        }
      } catch (err) {
        return false;
      }

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
