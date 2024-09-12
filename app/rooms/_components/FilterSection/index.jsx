"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { formatISO, formatRFC7231, isBefore, isValid } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

const options = [
  { value: "default", label: "Default Sorting" },
  { value: "high-price", label: "From High to Low price" },
  { value: "low-price", label: "From Low to High price" },
  { value: "max-guests", label: "From Max to Min guests" },
  { value: "min-guests", label: "From Min to Max guests" },
];

function FilterSection({ filters }) {
  const range = { from: filters?.range.split("_")?.at(0), to: filters?.range.split("_")?.at(1) };
  const [startDate, setStartDate] = useState(
    filters?.range && isValid(new Date(range.from)) ? formatRFC7231(new Date(range.from)) : ""
  );
  const [endDate, setEndDate] = useState(
    filters?.range && isValid(new Date(range.to)) ? formatRFC7231(new Date(range.to)) : ""
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(e) {
    console.log(e);
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleStartSelection(date) {
    setStartDate(date);
    console.log(date);
  }

  function handleEndSelection(date) {
    setEndDate(date);
    console.log(date);
  }

  function handleSearch() {
    if (!startDate || !endDate) return;
    const arrival = formatISO(new Date(startDate), { representation: "date" });
    const departure = formatISO(new Date(endDate), { representation: "date" });

    if (!isBefore(arrival, departure)) {
      toast.error("Invalid date range!");
      return;
    }

    const params = new URLSearchParams(searchParams);
    const formatedRange = `${arrival}_${departure}`;
    params.set("range", formatedRange);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <form className={`${styles.filterSection} roomsForm`}>
      <div className={styles.formControl}>
        <label htmlFor="">Sort Rooms</label>
        <Select
          onChange={(e) => {
            handleSort(e);
          }}
          options={options}
          isSearchable={false}
          className={styles.select}
          defaultValue={options.find((item) => item.value === filters?.filter) ?? options.at(0)}
        />
      </div>

      <div className={styles.formControl}>
        <label>Filter By Date</label>
        <div className={styles.datesContainer}>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleStartSelection(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={styles.input}
            dateFormat={"dd/MM/yyyy"}
            excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
            placeholderText="Arrival Date"
            // onSelect={(date) => handleStartSelection(date)}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => handleEndSelection(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.input}
            dateFormat={"dd/MM/yyyy"}
            excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
            placeholderText="Departure Date"
            // onSelect={(date) => handleEndSelection(date)}
          />

          <button className={styles.searchButton} type="button" onClick={handleSearch}>
            <span>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default FilterSection;
