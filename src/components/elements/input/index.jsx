import "./Input.scss";
import classNames from "classnames";
import { useState, useRef } from "react";
import { MdKeyOff, MdKey } from "react-icons/md";

const Input = ({
  disabled,
  className,
  type,
  placeholder,
  messageError,
  value,
  setValue,
  onBlur,
  label,
  maxLength,
  required,
}) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const inputRef = useRef(null);

  const show_password = () => {
    const input = inputRef.current;
    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
    return false;
  };

  return (
    <div
      className={classNames(
        "input__block-input",
        messageError === "ok" ? "" : messageError === "no" ? "" : "error",
        className
      )}
    >
      <label
        htmlFor={type.toLowerCase()}
        style={{
          display: label === "no" || label === undefined ? "none" : "block",
        }}
      >
        {label}: {required === "no" ? null : <span>*</span>}
      </label>
      <input
        disabled={disabled}
        ref={inputRef}
        name={type.toLowerCase()}
        placeholder={placeholder}
        onBlur={() => {
          if (onBlur) {
            onBlur(false);
          }
        }}
        value={value}
        type={
          type.toLowerCase() === "password"
            ? "password"
            : type.toLowerCase() === "email"
            ? "email"
            : "text"
        }
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        className={classNames(
          type.toLowerCase() === "password" ? "password" : null,
          className !== undefined ? className : null
        )}
        maxLength={maxLength}
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
      {type.toLowerCase() !== "password" ? null : displayPassword ? (
        <MdKeyOff
          className="icon-password"
          onClick={() => {
            show_password();
            setDisplayPassword((state) => !state);
          }}
        />
      ) : (
        <MdKey
          className="icon-password"
          onClick={() => {
            show_password();
            setDisplayPassword((state) => !state);
          }}
        />
      )}
    </div>
  );
};

export default Input;
