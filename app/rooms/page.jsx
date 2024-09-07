import FilterSection from "./_components/FilterSection";

import styles from "./styles.module.css";
import Banner from "../signin/_components/Banner";
import RoomsSection from "./_components/RoomsSection";
import { Suspense } from "react";
import Loader from "../_ui/Loader";
function Rooms({ searchParams }) {
  const filter = searchParams?.sort ?? "default";
  const range = searchParams?.range ?? "";
  return (
    <>
      <Banner title={"Accomodation Options"} />

      <div className={`container ${styles.roomsHolder}`}>
        <FilterSection />

        <Suspense
          key={`${filter}-${range}`}
          fallback={
            <div className={styles.loader}>
              <Loader />
            </div>
          }
        >
          <RoomsSection filter={filter} range={range} />
        </Suspense>
      </div>
    </>
  );
}

export default Rooms;
