import "./404.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import image1 from "./../../assets/404-1.png";
import image2 from "./../../assets/404-2.png";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const imgArray = [];
imgArray.push(image1);
imgArray.push(image2);
const mainImage = imgArray[getRandomInt(0, imgArray.length - 1)];

function ErrorPage({ text }) {
  useEffect(() => {
    document.title = "404 Страницы не существует";
  }, []);

  return (
    <section className={classNames("error-page", "plr-30")}>
      <div className={classNames("error-page__wrapper", "block-center")}>
        <div className="error-page__error">
          <div className="error-page__error-image">
            <img
              className=""
              src={mainImage}
              alt="Поиск пропавших велосипедов"
              width="100%"
            />
          </div>
          <div className="error-page__error-info">
            <div className="error-page__container">
              <h1>404 Страница</h1>
              <p className="error-page__message">
                {text ? text : "Эта страница не найдена"}
              </p>
              <Link to="/" className="link">
                Перейдите на главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
