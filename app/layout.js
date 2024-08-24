import Navbar from "./_ui/Navbar";
import styles from "./styles.css";

import { Roboto } from "next/font/google";

const roboto_font = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"], style: "normal" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto_font.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
