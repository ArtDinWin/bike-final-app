import "./CheckBox.scss";

export const CheckBox = ({ value, onChange }) => {
  return (
    <>
      <label className="checkbox-check">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.checked);
            }
          }}
        />
        <span>Согласиться с правилами и условиями сайта</span>
      </label>
    </>
  );
};

export default CheckBox;
