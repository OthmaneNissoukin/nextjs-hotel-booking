"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import DatePicker from "react-datepicker";
import { useState } from "react";

const options = [
  { value: "default", label: "Default Sorting" },
  { value: "high-price", label: "From High to Low price" },
  { value: "low-price", label: "From Low to High price" },
  { value: "max-guests", label: "From Max to Min guests" },
  { value: "min-guests", label: "From Min to Max guests" },
];

function FilterSection() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(e) {
    console.log(e);
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <form className={`${styles.filterSection}`}>
      <div className={styles.formControl}>
        <label>Filter By Date</label>
        <div className={styles.datesContainer}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={styles.input}
            dateFormat={"dd/MM/yyyy"}
            excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
            placeholderText="Arrival Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.input}
            dateFormat={"dd/MM/yyyy"}
            excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
            placeholderText="Departure Date"
          />
        </div>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="">Sort Rooms</label>
        <Select
          onChange={(e) => {
            handleSearch(e);
          }}
          options={options}
          isSearchable={false}
          className={styles.select}
          defaultValue={options.at(0)}
        />
      </div>
    </form>
  );
}

export default FilterSection;
