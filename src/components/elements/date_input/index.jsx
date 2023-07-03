import "./DateInput.scss";
import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import classNames from "classnames";

export const DateInput = ({
  label,
  disabled,
  value,
  setValue,
  messageError,
  className,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  registerLocale("ru", ru);

  useEffect(() => {
    if (typeof value === "string") {
      setSelectedDate(new Date(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  return (
    <div className="date__div">
      <div
        style={{
          display: label === "no" ? "none" : "block",
        }}
      >
        Дата кражи:
      </div>
      <DatePicker
        disabled={disabled}
        dateFormat="dd.MM.yyyyг."
        selected={selectedDate}
        showIcon
        locale="ru"
        className="data__input"
        onChange={(date) => {
          if (date === "" || date === null) {
            setSelectedDate(date);
            setValue(date);
          } else {
            const isoDate = date.toISOString();
            setSelectedDate(date);
            setValue(isoDate);
          }
        }}
      />
      <span
        className={classNames(
          "message",
          messageError === "ok"
            ? ""
            : messageError === "no"
            ? "display-none"
            : "visible",
          className !== undefined ? className : null
        )}
        style={{ display: disabled === true ? "none" : "block" }}
      >
        {messageError}
      </span>
    </div>
  );
};

export default DateInput;
