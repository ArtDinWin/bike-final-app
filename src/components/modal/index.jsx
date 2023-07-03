import ReactDOM from "react-dom";
import "./Modal.scss";
import mainImage from "./../../assets/no-photo.jpg";

const Modal = ({
  isShowing,
  hide,
  text = "",
  status = "successful",
  goTo,
  srcImg = mainImage,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal">
            <div className="modal__block-wrapper">
              <div className="modal__image-wrapper" bis_skin_checked="1">
                <img
                  className=""
                  src={srcImg}
                  alt="Поиск пропавших велосипедов"
                  width="100%"
                />
              </div>
              <div className="modal__info" bis_skin_checked="1">
                <h3
                  className={
                    status === "error" || status === "successful" ? status : ""
                  }
                >
                  {status === "error"
                    ? "Что-то пошло не так :("
                    : status === "successful"
                    ? "Все получилось!"
                    : status}
                </h3>
                <p className="modal__info-text">{text}</p>
                <div className="modal__info-buttons">
                  <button
                    className="btn flash-btn"
                    onClick={() => {
                      hide();
                      if (goTo) {
                        goTo();
                      }
                    }}
                  >
                    <span>Закрыть</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
