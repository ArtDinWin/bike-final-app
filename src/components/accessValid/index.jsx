import "./AccessValid.scss";
import mainImage from "./../../assets/access-valid.png";

function AccessValid() {
  return (
    <div className="access__valid">
      <div className="access__valid-image">
        <img
          className=""
          src={mainImage}
          alt="Поиск пропавших велосипедов"
          width="100%"
        />
      </div>
      <div className="access__valid-info">
        <div className="access__valid-block">
          <h3 className="title-block">Вы авторизованы</h3>
          <p>
            Вы уже авторизованы и можете пользоваться всеми функциями и
            возможностями сайта
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccessValid;
