import "./Header.scss";
import { useState } from "react";
import Logo from "./../../assets/logo.png";
import Avatar from "./../../assets/profile-avatar.jpg";
import classNames from "classnames";
import Button from "./../elements/button";
import { Link, NavLink } from "react-router-dom";
import { removeFromStorage } from "./../../toolkitSliceRedux/localStorage/localStorage";
import { useDispatch } from "react-redux";
import { isFalse } from "./../../toolkitSliceRedux/isAuthSliceReducer";

const img = (
  <div className="header__logo">
    <Link to="/">
      <img
        className="header__logo-img"
        src={Logo}
        alt="Поиск пропавших велосипедов"
        width="100%"
      />
    </Link>
  </div>
);

function Header({ isAuth }) {
  const dispatch = useDispatch();
  const [isDisplayMenu, setIsDisplayMenu] = useState(false);

  const burger = (
    <button
      className="header__burger-btn"
      id="burger"
      onClick={() => setIsDisplayMenu(!isDisplayMenu)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );

  const accountAvatar = (
    <div className="header__log-out">
      <Link
        to="/"
        className="log-out"
        onClick={(e) => {
          e.preventDefault();
          removeFromStorage();
          dispatch(isFalse());
        }}
      >
        Выйти
      </Link>
      <div
        className="header__account-avatar"
        id="burger"
        onClick={() => setIsDisplayMenu(!isDisplayMenu)}
      >
        <img src={Avatar} alt="Аватар профиля" width="100%" />
      </div>
    </div>
  );

  const closeMenu = (e) => {
    const findElement = e.target.closest(".header.open");
    if (findElement) {
      findElement.classList.remove("open");
    }
    setIsDisplayMenu(false);
  };

  const nav = (
    <div className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <NavLink
            onClick={closeMenu}
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Главная
          </NavLink>
        </li>

        <li className="header__nav-item">
          <NavLink
            onClick={closeMenu}
            to="/report"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Сообщить о краже
          </NavLink>
        </li>
        {isAuth ? (
          <>
            <li className="header__nav-item">
              <NavLink
                onClick={closeMenu}
                to="/cases"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Кражи
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                onClick={closeMenu}
                to="/officers"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Сотрудники
              </NavLink>
            </li>
            <li className="header__nav-item avatar">{accountAvatar}</li>
          </>
        ) : (
          <>
            <li
              className={classNames(
                "header__nav-item",
                "header__nav-item_registration"
              )}
            >
              <NavLink
                onClick={closeMenu}
                to="/sign_up"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Регистрация
              </NavLink>
            </li>
            <li className="header__nav-item">
              <Link
                to="/sign_in"
                className="header__nav-button"
                onClick={closeMenu}
              >
                <Button text="Войти" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  return (
    <header className={classNames("header", isDisplayMenu && "open", "plr-30")}>
      <div className={classNames("header__wrapper", "block-center")}>
        {img}
        {!isAuth ? burger : null}
        {isAuth ? accountAvatar : null}
        <div className={classNames("header__menu")}>{nav}</div>
      </div>
    </header>
  );
}

export default Header;
