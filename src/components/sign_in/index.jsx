import "./signIn.scss";
import classNames from "classnames";
import mainImage from "./../../assets/sign-in.png";
import imageAccessValid from "./../../assets/access-valid.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-2.png";
import modalImageSuccessful from "./../../assets/successful-1.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./../elements/button";
import Input from "./../elements/input";
import Modal from "./../modal";
import { useDispatch, useSelector } from "react-redux";
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";
import Loading from "./../loading";
import { signIn } from "./../../toolkitSliceRedux/asyncActions/signIn";
import AccessValid from "../accessValid";
import { checkNotValidEmail, checkNotValidPassword } from "./../utils";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goTo = () => navigate("/");
  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const isLoading = useSelector((state) => {
    return state.isAuth.isLoading;
  });
  const [inputData, setInputData] = useState({
    email: "",
    emailMessage: "",
    emailFirstTouch: true,
    password: "",
    passwordMessage: "",
    passwordFirstTouch: true,
  });
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signIn({
        email: inputData.email,
        password: inputData.password,
      })
    );
    setIsDisplayModal(true);
  };

  useEffect(() => {
    setInputData((prevState) => {
      return {
        ...prevState,
        emailMessage: checkNotValidEmail(inputData.email),
      };
    });
  }, [inputData.email]);

  useEffect(() => {
    setInputData((prevState) => {
      return {
        ...prevState,
        passwordMessage: checkNotValidPassword(inputData.password),
      };
    });
  }, [inputData.password]);

  useEffect(() => {
    isAuth ? setIsDisplayModal(true) : setIsDisplayModal(false);
  }, [isAuth]);

  useEffect(() => {
    dispatch(clearModalMessage());
    document.title = "Вход на сайт";
    return () => dispatch(clearModalMessage());
  }, []);

  const renderIsAuthTrue = <AccessValid />;

  const renderIsAuthFalse = (
    <>
      <div className="sign-in__card-wrapper">
        <div className="sign-in__image-wrapper">
          <img
            className=""
            src={mainImage}
            alt="Поиск пропавших велосипедов"
            width="100%"
          />
        </div>
        <div className="sign-in__info-wrapper">
          <div className="sign-in__block">
            <h3 className="title-block">Авторизация</h3>
            <div className="sign-in__block-info">
              <p>
                Введите свой адрес электронной почты и пароль для доступа ко
                всем функциям и возможностям сайта
              </p>
              <form
                onSubmit={handleSubmit}
                className="sign-in__block-form"
                id="form-sign-in"
              >
                <Input
                  label="Email"
                  type="Email"
                  placeholder="Введите Email..."
                  messageError={
                    inputData.emailMessage && !inputData.emailFirstTouch
                      ? inputData.emailMessage
                      : "ok"
                  }
                  value={inputData.email}
                  setValue={(value) =>
                    setInputData((prevState) => {
                      return { ...prevState, email: value.trim() };
                    })
                  }
                  onBlur={(value) =>
                    setInputData((prevState) => {
                      return { ...prevState, emailFirstTouch: value };
                    })
                  }
                  maxLength="64"
                />

                <Input
                  label="Password"
                  type="Password"
                  placeholder="Введите password..."
                  messageError={
                    inputData.passwordMessage && !inputData.passwordFirstTouch
                      ? inputData.passwordMessage
                      : "ok"
                  }
                  value={inputData.password}
                  setValue={(value) =>
                    setInputData((prevState) => {
                      return {
                        ...prevState,
                        password: value.trim(),
                        passwordFirstTouch: false,
                      };
                    })
                  }
                  onBlur={(value) =>
                    setInputData((prevState) => {
                      return { ...prevState, passwordFirstTouch: value };
                    })
                  }
                  maxLength="21"
                />

                <div className="sign-in__block-buttons">
                  <span>
                    <Link to="/sign_up" className="sign_in__block-registration">
                      Регистрация
                    </Link>
                  </span>
                  <Button
                    form="form-sign-in"
                    type="submit"
                    disabled={
                      inputData.emailMessage || inputData.passwordMessage
                        ? true
                        : false
                    }
                    className="btn flash-btn"
                  >
                    Войти
                  </Button>
                </div>
              </form>

              <p>* Обязательные для заполнения поля</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className={classNames("sign-in", "plr-30")}>
      <div className={classNames("sign-in__wrapper", "block-center")}>
        <div className="sign-in__container">
          {isLoading ? (
            <Loading />
          ) : isAuth ? (
            renderIsAuthTrue
          ) : (
            renderIsAuthFalse
          )}
        </div>
      </div>
      {isAuth ? (
        <Modal
          isShowing={isDisplayModal && !isLoading}
          hide={toggleDisplayModal}
          status={"Вы авторизованы"}
          text={"И можете пользоваться всеми функциями возможностями сайта"}
          goTo={goTo}
          srcImg={imageAccessValid}
        />
      ) : (
        <Modal
          isShowing={
            isDisplayModal && modalMessage.type === "signIn" && !isLoading
          }
          srcImg={
            modalMessage.status === "successful"
              ? modalImageSuccessful
              : modalMessage.text === "Ошибка запроса: Network Error"
              ? modalImageError1
              : modalImageError2
          }
          hide={toggleDisplayModal}
          status={modalMessage.status}
          text={modalMessage.text}
          goTo={() => {
            if (modalMessage.status === "successful") {
              goTo();
              dispatch(clearModalMessage());
            } else {
              navigate("/sign_in");
              dispatch(clearModalMessage());
            }
          }}
        />
      )}
    </section>
  );
}

export default SignIn;
