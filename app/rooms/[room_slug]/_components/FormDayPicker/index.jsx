import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./styles.module.css";

function FormDayPicker({ handleDateSelection }) {
  return (
    <div className={styles.datepicker}>
      <div>
        <DayPicker
          captionLayout="dropdown"
          min={0}
          onSelect={(range) => handleDateSelection(range)}
          mode="range"
          startMonth={new Date(2024, 0)}
          endMonth={new Date(2027, 11)}
          weekStartsOn={1}
          numberOfMonths={2}
          disabled={[{ before: new Date() }]}
          footer={
            <p>
              <span className={styles.footerIcon}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span>Please Pick a Range</span>
            </p>
          }
          classNames={{
            today: styles.datepickerToday,
            selected: styles.datepickerSelected,
            range_start: styles.datepickerRangeControlStart,
            range_end: styles.datepickerRangeControlEnd,
            range_middle: styles.datepickerRangeMiddle,
            chevron: styles.chevron,
            footer: styles.datepickerFooter,
          }}
        />
      </div>
    </div>
  );
}

export default FormDayPicker;
