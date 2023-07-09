import "./AddOfficer.scss";
import classNames from "classnames";
import mainImageSignUp from "./../../assets/sign-up.png";
import mainImageAddOfficer from "./../../assets/add-officer.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-2.png";
import modalImageError3 from "./../../assets/error-1.png";
import modalImageSuccessful1 from "./../../assets/successful-1.png";
import modalImageSuccessful2 from "./../../assets/successful-2.png";
import modalImageAccessError from "./../../assets/access-error.png";
import modalImageAccessValid from "./../../assets/access-valid.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../elements/button";
import Input from "../elements/input";
import Modal from "../modal";
import CheckBox from "./../elements/checkbox";
import SwitcherInput from "./../elements/switcher_input";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../loading";
import AccessError from "./../accessError";
import AccessValid from "./../accessValid";
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";
import { addOfficer } from "./../../toolkitSliceRedux/asyncActions/addOfficer";
import { checkNotValidEmail, checkNotValidPassword } from "./../utils";

function AddOfficer({ propsValue }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goTo = () =>
    navigate(propsValue === "sign_up" ? "/sign_up" : "/add_officer");
  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const isApproved = useSelector((state) => {
    return state.isAuth.isApproved;
  });
  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });
  const isLoad = useSelector((state) => {
    return state.isAuth.isLoading;
  });
  const [inputData, setInputData] = useState({
    email: "",
    emailMessage: "",
    emailFirstTouch: true,
    password: "",
    passwordMessage: "",
    passwordFirstTouch: true,
    errorMessage: "",
    clientId: "d7cf7895-4335-445c-9796-c5ad815de4de",
    firstName: "",
    lastName: "",
    approved: false,
    agreement: false,
  });
  const [isDisplayModal, setIsDisplayModal] = useState(true);

  const dataObj = () => {
    return {
      email: inputData.email,
      password: inputData.password,
      clientId: propsValue === "sign_up" ? inputData.clientId : null,
      firstName: inputData.firstName ? inputData.firstName : null,
      lastName: inputData.lastName ? inputData.lastName : null,
      [isApproved ? "approved" : null]: isApproved ? inputData.approved : null,
    };
  };

  const ApiRequest = () => {
    dispatch(
      addOfficer(dataObj(), propsValue === "sign_up" ? "signUp" : "addOfficer")
    );
  };

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiRequest();
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
    document.title =
      propsValue === "sign_up" ? "Регистрация на сайте" : "Добавить сотрудника";
    dispatch(clearModalMessage());
    setIsDisplayModal(true);
    return () => dispatch(clearModalMessage());
  }, [propsValue, dispatch]);

  let renderIsAuthTrue, renderIsAuthFalse;
  const renderForm = (
    <>
      <div className="add-officer__card-wrapper">
        <div className="add-officer__image-wrapper">
          <img
            className=""
            src={
              propsValue === "sign_up" ? mainImageSignUp : mainImageAddOfficer
            }
            alt="Img: Поиск пропавших велосипедов"
            width="100%"
          />
        </div>
        <div className="add-officer__info-wrapper">
          <div className="add-officer__block">
            <h3 className="title-block">
              {propsValue === "sign_up" ? "Регистрация" : "Добавить сотрудника"}
            </h3>
            <div className="add-officer__block-info">
              <p>
                {propsValue === "sign_up"
                  ? "Если вы являетесь сотрудником компании, чтобы получить полный доступ к функциям и возможностям сайта, Вам необходимо зарегистрироваться."
                  : "Чтобы добавить сотрудника в базу данных сайта, вам необходимо заполнить следующие данные:"}
              </p>
              <form
                onSubmit={handleSubmit}
                className="add-officer__block-form"
                id="form-add-officer"
              >
                <div className="add-officer__block-inputs">
                  <Input
                    required="no"
                    label="Имя"
                    type="firstName"
                    placeholder="Введите Имя..."
                    messageError="ok"
                    value={inputData.firstName}
                    setValue={(value) =>
                      setInputData((prevState) => {
                        return { ...prevState, firstName: value.trim() };
                      })
                    }
                    maxLength="18"
                  />
                  <Input
                    required="no"
                    label="Фамилия"
                    type="lastName"
                    placeholder="Введите Фамилия..."
                    messageError="ok"
                    value={inputData.lastName}
                    setValue={(value) =>
                      setInputData((prevState) => {
                        return { ...prevState, lastName: value.trim() };
                      })
                    }
                    maxLength="18"
                  />
                </div>

                <div className="add-officer__block-inputs">
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
                        return { ...prevState, password: value.trim() };
                      })
                    }
                    onBlur={(value) =>
                      setInputData((prevState) => {
                        return { ...prevState, passwordFirstTouch: value };
                      })
                    }
                    maxLength="21"
                  />
                </div>

                <div
                  className="add-officer__block-inputs add-officer__items"
                  style={{ marginBottom: "10px" }}
                >
                  {propsValue === "sign_up" || !isApproved ? null : (
                    <>
                      <div className="add-officer__input-label">
                        Одобрение
                        <br />
                        сотрудника:
                      </div>
                      <div className="add-officer__switcher-wrap">
                        <SwitcherInput
                          label="no"
                          value={inputData.approved}
                          onChange={(value) =>
                            setInputData((prevState) => {
                              return { ...prevState, approved: value };
                            })
                          }
                        />
                      </div>
                    </>
                  )}

                  <div className="add-officer__checkbox-wrap">
                    <CheckBox
                      value={inputData.agreement}
                      onChange={(value) =>
                        setInputData((prevState) => {
                          return { ...prevState, agreement: value };
                        })
                      }
                    />
                  </div>
                </div>

                <div className="add-officer__block-buttons">
                  <span>
                    {propsValue === "sign_up" ? (
                      <Link
                        to="/sign_in"
                        className="sign_in__block-registration"
                      >
                        Войти
                      </Link>
                    ) : null}
                  </span>
                  <Button
                    form="form-add-officer"
                    type="submit"
                    disabled={
                      inputData.emailMessage ||
                      inputData.passwordMessage ||
                      inputData.clientIdMessage ||
                      !inputData.agreement
                        ? true
                        : false
                    }
                    className="btn flash-btn"
                  >
                    {propsValue === "sign_up"
                      ? "Регистрация"
                      : "Добавить сотрудника"}
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

  if (propsValue) {
    renderIsAuthTrue = <AccessValid />;
    renderIsAuthFalse = renderForm;
  } else {
    renderIsAuthTrue = renderForm;
    renderIsAuthFalse = <AccessError />;
  }

  return (
    <section className={classNames("add-officer", "plr-30")}>
      <div className={classNames("add-officer__wrapper", "block-center")}>
        <div className="add-officer__container">
          {isLoad ? (
            <Loading />
          ) : (
            <>{isAuth ? renderIsAuthTrue : renderIsAuthFalse}</>
          )}
        </div>
      </div>
      {(isAuth && propsValue && !isLoad) ||
      (!isAuth && !propsValue && !isLoad) ? (
        <Modal
          isShowing={isDisplayModal}
          hide={toggleDisplayModal}
          status={propsValue ? "Вы авторизованы" : "error"}
          srcImg={propsValue ? modalImageAccessValid : modalImageAccessError}
          text={
            propsValue
              ? "И можете пользоваться всеми функциями возможностями сайта"
              : "Вы не авторизованы! У вас нет доступа к контенту этой страницы. Вам необходимо авторизоваться, или зарегистрироваться на сайте."
          }
          goTo={() => {
            goTo();
            dispatch(clearModalMessage());
          }}
        />
      ) : (!isAuth && propsValue && !isLoad) ||
        (isAuth && !propsValue && !isLoad) ? (
        <Modal
          isShowing={isDisplayModal && modalMessage.text}
          srcImg={
            !propsValue && modalMessage.status === "successful"
              ? modalImageSuccessful2
              : propsValue && modalMessage.status === "successful"
              ? modalImageSuccessful1
              : modalMessage.text === "Ошибка запроса: Network Error"
              ? modalImageError1
              : propsValue && modalMessage.status === "error"
              ? modalImageError2
              : modalImageError3
          }
          hide={() => {
            toggleDisplayModal();
          }}
          status={modalMessage.status}
          text={
            modalMessage.text
              ? modalMessage.text
              : propsValue
              ? "Регистрация пройдена успешно!"
              : "Сотрудник добавлен успешно!"
          }
          goTo={() => {
            if (modalMessage.status === "error") {
              goTo();
            } else if (modalMessage.type === "signUp") {
              navigate("/");
            } else {
              navigate("/officers");
            }
            dispatch(clearModalMessage());
          }}
        />
      ) : null}
    </section>
  );
}

export default AddOfficer;
