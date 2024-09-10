import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createGuest, getGuestByEmail } from "./app/_lib/supabase/guests";
// import { credentials } from "./app/_lib/authjs/credentialsCallback";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { compareSync } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if the user exists
        user = await getGuestByEmail(credentials.email);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // Verifying user password
        const isValidPwd = compareSync(credentials.password, user.password);

        if (!isValidPwd) {
          throw new Error("Wrong email or password");
        }

        // return user object with their profile data
        return user;
      },
    }),
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    Facebook({ clientId: process.env.AUTH_FACEBOOK_ID, clientSecret: process.env.AUTH_FACEBOOK_SECRET }),
  ],
  callbacks: {
    authorized({ req, auth }) {
      console.log("HITTED");
      return !!auth;
    },

    async signIn({ account, user }) {
      // console.log("++++++ USER +++++++");
      // console.log(user);
      // console.log(account);
      if (!user.email) return false;
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
