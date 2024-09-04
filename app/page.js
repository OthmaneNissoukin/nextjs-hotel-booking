import About from "./_components/About";
import Blog from "./_components/Blog/Blog";
import Contact from "./_components/Contact";

import Gallery from "./_components/Gallery";
import HeroSection from "./_components/HeroSection";
import Rooms from "./_components/Rooms";
import { getAllRooms } from "./_lib/supabase/services";

export const metadata = {
  title: "Hotel Booking App",
  description: "Hotel Booking App built with NextJS",
};

export default async function Home() {
  await getAllRooms();

  return (
    <>
      <HeroSection />
      <About />
      <Rooms />
      <Gallery />
      <Blog />
      <Contact />
    </>
  );
}
