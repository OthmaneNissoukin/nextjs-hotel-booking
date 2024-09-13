import { redirect } from "next/navigation";
import SigninForm from "./_components/SigninForm";
import { auth } from "@/auth";
import Banner from "../_components/Banner";

async function Page() {
  const session = await auth();
  if (session?.user) redirect("/account/history");

  return (
    <>
      <Banner title={"My Account"} />
      <SigninForm />
    </>
  );
}

export default Page;
