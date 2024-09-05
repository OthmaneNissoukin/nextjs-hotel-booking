"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";

import Select from "react-select";

const options = [
  { value: "default", label: "Default Sorting" },
  { value: "high-price", label: "From High to Low price" },
  { value: "low-price", label: "From Low to High price" },
  { value: "max-guests", label: "From Max to Min guests" },
  { value: "min-guests", label: "From Min to Max guests" },
];

function FilterSection() {
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
      <Select
        onChange={(e) => {
          handleSearch(e);
        }}
        options={options}
        isSearchable={false}
        className={styles.select}
        defaultValue={options.at(0)}
      />
    </form>
  );
}

export default FilterSection;
