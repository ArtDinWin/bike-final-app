import "./Select.scss";
import { useEffect } from "react";
import { MdOutlineSportsMotorsports, MdDirectionsBike } from "react-icons/md";
import classNames from "classnames";

export const Select = ({
  label,
  disabled,
  className,
  messageError,
  value,
  setValue,
}) => {
  useEffect(() => {
    const handleClick = (e) => {
      const app = document.querySelector(".select-div__wrapper.open");
      const target = e.target.closest(".select-div__wrapper.open");
      if (app !== null && target === null) {
        app.classList.remove("open");
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className={classNames("select-div__wrapper", disabled && "disabled")}
      work="true"
    >
      <label
        className="label__type"
        style={{
          display: label === "no" ? "none" : "block",
        }}
      >
        Тип велосипеда: <span>*</span>
      </label>
      <div
        className="select-div"
        onClick={(e) => {
          if (e.target.dataset.open === "false") {
            e.target.dataset.open = "true";

            e.target.closest(".select-div__wrapper").classList.toggle("open");
          } else {
            e.target.dataset.open = "false";
            e.target.closest(".select-div__wrapper").classList.toggle("open");
          }
        }}
        data-open="false"
      >
        {value === "general" ? (
          <>
            {" "}
            <MdDirectionsBike className="select-div__option-general" />
            Основной
          </>
        ) : (
          <>
            {" "}
            <MdOutlineSportsMotorsports className="select-div__option-sport" />
            Спортивный
          </>
        )}
        <div
          className="select-div__mark"
          onClick={(e) => {
            const closest = e.target.closest(".select-div");
            if (closest.dataset.open === "false") {
              closest.dataset.open = "true";
              closest.classList.toggle("open");
            } else {
              closest.dataset.open = "false";
              closest.classList.toggle("open");
            }
          }}
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-tj5bde-Svg"
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        </div>
      </div>
      <div className="select-div__option-wrap">
        <div
          className="select-div__option"
          data-value="general"
          onClick={(e) => {
            const value = e.target.dataset.value;
            setValue(value);
            e.target.closest(".select-div__wrapper").classList.toggle("open");
          }}
        >
          <MdDirectionsBike className="select-div__option-general" />
          Основной
          <div
            className="select-div__mark"
            onClick={(e) => {
              const closest = e.target.closest(".select-div");

              if (closest.dataset.open === "false") {
                closest.dataset.open = "true";
                closest.classList.toggle("open");
              } else {
                closest.dataset.open = "false";
                closest.classList.toggle("open");
              }
            }}
          >
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-tj5bde-Svg"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>

        <div
          className="select-div__option"
          data-value="sport"
          onClick={(e) => {
            const value = e.target.dataset.value;
            setValue(value);
            e.target.closest(".select-div__wrapper").classList.toggle("open");
          }}
        >
          <MdOutlineSportsMotorsports className="select-div__option-sport" />
          Спортивный
          <div
            className="select-div__mark"
            onClick={(e) => {
              const closest = e.target.closest(".select-div");

              if (closest.dataset.open === "false") {
                closest.dataset.open = "true";
                closest.classList.toggle("open");
              } else {
                closest.dataset.open = "false";
                closest.classList.toggle("open");
              }
            }}
          >
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-tj5bde-Svg"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>
      </div>
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

export default Select;
