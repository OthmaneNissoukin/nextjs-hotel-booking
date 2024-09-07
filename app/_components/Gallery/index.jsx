import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";
import { getAllRooms } from "@/app/_lib/supabase/rooms";
const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;
async function Gallery() {
  const rooms = await getAllRooms();
  rooms.length = 8;
  return (
    <section className={styles.gallerySection}>
      <div className="container">
        <Heading className="text-center">Gallery</Heading>
        <div className={styles.galleryGrid}>
          {rooms.map((item) => (
            <div key={item.id} className={styles.thumbnail}>
              <Image fill src={`${SUPABASE_ROOMS_URL}/${item.thumbnail}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
