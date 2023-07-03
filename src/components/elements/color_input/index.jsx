import "./ColorInput.scss";
import { useState, useEffect } from "react";

export const ColorInput = ({ label, disabled, value, setValue }) => {
  const [selectedColor, setSelectedColor] = useState(
    value === "blue"
      ? "#0400ff"
      : value === "red"
      ? "#ff0000"
      : value === ""
      ? "#fffffd"
      : value
  );

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    setSelectedColor(
      value === "blue"
        ? "#0400ff"
        : value === "red"
        ? "#ff0000"
        : value === ""
        ? "#fffffd"
        : value
    );
  }, [value]);

  return (
    <div className="color__div">
      <label
        htmlFor="report-color"
        style={{
          display: label === "no" ? "none" : "block",
        }}
      >
        Цвет:
      </label>
      <input
        disabled={disabled}
        id="report-color"
        className="color__input"
        type="color"
        value={selectedColor}
        onChange={handleChange}
      />
      {selectedColor === "#fffffd" ? (
        <div
          style={{ fontSize: "9px", color: "#F44336", whiteSpace: "nowrap" }}
        >
          Нет данных
        </div>
      ) : null}
    </div>
  );
};

export default ColorInput;
