"use server";
import { signIn } from "@/auth";
import { signInSchema } from "./zodSchemas";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function authAction(prevState, formData) {
  // await new Promise((res) => setTimeout(res, 500));
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    signInSchema.parse({ email, password });
  } catch (err) {
    err.errors.forEach((element) => {
      prevState[element?.path[0] ?? "unknown"] = element.message;
    });

    return { ...prevState };
  }

  const credentials = { email, password };
  console.log("Create Session");
  let loginSuccess = true;
  try {
    await signIn("credentials", { ...credentials, redirect: false });
  } catch (err) {
    loginSuccess = false;
    console.log(err.message);
    return { ...prevState, criticalError: "Wrong email or password!" };
  } finally {
    if (loginSuccess) redirect("/account/history");
  }
}

export async function bookingCancelAction() {
  "use server";
  console.log("CLICKED");
  await new Promise((res) => setTimeout(res, 5000));
  const cookiesStore = cookies();
  if (cookiesStore.has("pending_reservation")) {
    cookies().delete("pending_reservation");
    redirect("/rooms", "replace");
  }
}
