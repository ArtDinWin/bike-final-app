import "./SwitcherInput.scss";

export const SwitcherInput = ({ label, disabled, value, onChange }) => {
  return (
    <div className="switcher__wrap">
      <label
        htmlFor="checkbox-sign-up"
        style={{
          display: label === "no" ? "none" : "block",
          marginBottom: "6px",
        }}
      >
        Одобрен
      </label>
      <div className="switcher r" id="switcher-1">
        <input
          disabled={disabled}
          name="checkbox-sign-up"
          type="checkbox"
          className="checkbox"
          checked={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.checked);
            }
          }}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default SwitcherInput;
