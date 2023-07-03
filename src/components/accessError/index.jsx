import "./AccessError.scss";
import { Link } from "react-router-dom";
import mainImage from "./../../assets/access-error.png";

function AccessError() {
  return (
    <div className="access__error">
      <div className="access__error-image">
        <img
          className=""
          src={mainImage}
          alt="Поиск пропавших велосипедов"
          width="100%"
        />
      </div>
      <div className="access__error-info">
        <div className="access__error-block">
          <h3 className="title-block">Ошибка доступа</h3>
          <p>
            Вы неавторизованный пользователь! У вас нет доступа к контенту этой
            страницы. Для использования всех функций и возможностей сайта, вам
            необходимо <Link to="/sign_in">авторизоваться</Link>, если вы
            являетесь сотрудником компании, или{" "}
            <Link to="/sign_up">зарегистрироваться</Link>, если у вас еще нет
            регистрации.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccessError;
