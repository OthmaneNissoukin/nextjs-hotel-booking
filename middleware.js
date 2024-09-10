import { auth } from "./auth";

export const middleware = auth;

export const config = {
  matcher: ["/account/profile", "/account/history", "/rooms/:number/checkout"],
};
