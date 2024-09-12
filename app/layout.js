import { auth } from "@/auth";
import Footer from "./_components/Footer";
import Navbar from "./_ui/Navbar";
import styles from "./styles.css";

import { Roboto } from "next/font/google";
import { signOutAction } from "./_lib/actions";

const roboto_font = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"], style: "normal" });

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={roboto_font.className}>
        <Navbar user={session?.user} signOutAction={signOutAction} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
