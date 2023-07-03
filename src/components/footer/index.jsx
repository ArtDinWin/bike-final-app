import "./Footer.scss";
import classNames from "classnames";

function Footer() {
  return (
    <footer className={classNames("footer", "plr-30")}>
      <div className={classNames("footer__wrapper", "block-center")}>
        <div>Итоговый проект на React.js</div>
        <div className="footer__block-right">
          Выполнил: <span style={{ whiteSpace: "nowrap" }}>Топоров Артем,</span>{" "}
          <span style={{ whiteSpace: "nowrap" }}>
            <a
              href="https://github.com/ArtDinWin"
              target="_blank"
              rel="noreferrer"
            >
              @ArtDinWin
            </a>
            , 2023
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
