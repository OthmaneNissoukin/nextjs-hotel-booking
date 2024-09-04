"use client";

import styles from "./styles.module.css";

import Select from "react-select";

const options = [
  { value: "default", label: "Default Sorting" },
  { value: "hight-price", label: "From High to Low price" },
  { value: "low-price", label: "From Low to High price" },
  { value: "min-guests", label: "From Low to High guests" },
  { value: "max-guests", label: "From Min to Max guests" },
];

function FilterSection() {
  return (
    <form className={`${styles.filterSection}`}>
      <Select options={options} isSearchable={false} className={styles.select} defaultValue={options.at(0)} />
    </form>
  );
}

export default FilterSection;
