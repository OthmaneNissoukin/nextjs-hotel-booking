import { redirect } from "next/navigation";
import SignUpForm from "@/app/signup/_components/SignUpForm";
import { auth } from "@/auth";
import Banner from "../_components/Banner";

export const metadata = {
  title: "Sign Up",
  description: "Sign Up to the Hotel Booking App ",
};

async function Page() {
  const session = await auth();
  if (session?.user) redirect("/account/history");

  return (
    <>
      <Banner title={"REGISTER"} />
      <SignUpForm />
    </>
  );
}

export default Page;
