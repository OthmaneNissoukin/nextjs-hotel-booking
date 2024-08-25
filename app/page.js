import About from "./_components/About";
import Blog from "./_components/Blog/Blog";
import Gallery from "./_components/Gallery";
import HeroSection from "./_components/HeroSection";
import Rooms from "./_components/Rooms";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Rooms />
      <Gallery />
      <Blog />
    </>
  );
}
