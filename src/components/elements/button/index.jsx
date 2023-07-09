import classNames from "classnames";

const Button = (props) => (
  <button
    disabled={props.disabled ? true : false}
    className={classNames(
      "btn",
      "flash-btn",
      props.type === "delete" && "delete"
    )}
    onClick={props.onClick}
    type={
      props.type === "button"
        ? "button"
        : props.type === "delete"
        ? "button"
        : "submit"
    }
    form={props.form !== undefined ? props.form : null}
  >
    {props.text}
    {props.children}
  </button>
);

export default Button;
