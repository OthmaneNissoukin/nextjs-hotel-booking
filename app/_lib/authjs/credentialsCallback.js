import { compareSync } from "bcryptjs";
import { getFullGuestByEmail, getGuestByEmail } from "../supabase/guests";

export const credentials = {
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.

  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    let user = null;

    // logic to verify if the user exists
    user = await getFullGuestByEmail(credentials.email);

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
};
