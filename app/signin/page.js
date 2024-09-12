import { redirect } from "next/navigation";
import Banner from "./_components/Banner";
import SigninForm from "./_components/SigninForm";
import { auth } from "@/auth";

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
