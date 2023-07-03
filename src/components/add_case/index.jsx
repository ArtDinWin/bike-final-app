import "./AddCase.scss";
import classNames from "classnames";
import mainImage from "./../../assets/add-case.png";
import modalImageAccessError from "./../../assets/access-error.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-1.png";
import modalImageSuccessful from "./../../assets/successful-2.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./../elements/button";
import Input from "./../elements/input";
import Select from "./../elements/select";
import DateInput from "./../elements/date_input";
import ColorInput from "./../elements/color_input";
import CheckBox from "./../elements/checkbox";
import Modal from "./../modal";
import Loading from "./../loading";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "./../../toolkitSliceRedux/asyncActions/addReport";
import AccessError from "./../accessError";
import { getOfficers } from "./../../toolkitSliceRedux/asyncActions/getOfficers";
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";

function AddCase() {
  const initState = {
    ownerFullName: "",
    ownerFullNameFirstTouch: true,
    ownerFullNameMessage: "",
    licenseNumber: "",
    licenseNumberFirstTouch: true,
    licenseNumberMessage: "",
    officer: null,
    type: "general",
    color: null,
    date: null,
    description: "",
    agreement: true,
  };
  const navigate = useNavigate();
  const goTo = () => navigate("/add_case");
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState(initState);
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const isLoading = useSelector((state) => {
    return state.isAuth.isLoading;
  });
  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });

  const officers = useSelector((state) => {
    return state.officers.officers;
  });

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

  const createObj = () => {
    return {
      ownerFullName: inputData.ownerFullName.trim(),
      licenseNumber: inputData.licenseNumber,
      [inputData.officer !== "null" ? "officer" : "notOfficer"]:
        inputData.officer !== "null" ? inputData.officer : null,
      type: inputData.type,
      color: inputData.color,
      date: inputData.date,
      description: inputData.description.trim(),
    };
  };

  function checkBeforeSend() {
    if (
      typeof inputData.ownerFullName !== "string" ||
      typeof inputData.licenseNumber !== "string"
    ) {
      return true;
    } else if (
      inputData.ownerFullName.trim() === "" ||
      inputData.licenseNumber.trim() === "" ||
      inputData.agreement === false
    ) {
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const objReport = createObj();
    dispatch(addReport(objReport, "addCase"));
    setIsDisplayModal(true);
  };

  useEffect(() => {
    document.title = "Добавление нового сообщения о краже";
    return () => dispatch(clearModalMessage());
  }, []);

  useEffect(() => {
    isAuth ? setIsDisplayModal(false) : setIsDisplayModal(true);
    if (isAuth) {
      dispatch(getOfficers());
    }
  }, [isAuth]);

  const renderIsAuthFalse = <Loading />;
  const renderIsAuthTrue = (
    <div className="add-case__card-wrapper">
      <div className="add-case__image-wrapper">
        <img
          className=""
          src={mainImage}
          alt="Поиск пропавших велосипедов"
          width="100%"
        />
      </div>
      <div className="add-case__info-wrapper">
        <div className="add-case__block">
          <h3 className="title-block">Добавить кражу</h3>
          <div className="add-case__block-info">
            <p>
              По статистике 80% велосипедов обнаружены и возращены в течение 2
              месяцев после кражи. Этот велосипед может быть следующий
              найденный. Сообщите о краже, заполнив данную форму и предоставив
              все необходимые данные.
            </p>
            <form
              onSubmit={handleSubmit}
              className="add-case__block-form"
              id="form-add-case"
            >
              <div className="add-case__block-inputs">
                <Input
                  label="ФИО владельца"
                  type="ownerFullName"
                  placeholder="Введите ФИО владельца..."
                  messageError={
                    inputData.ownerFullNameMessage &&
                    !inputData.ownerFullNameFirstTouch
                      ? inputData.ownerFullNameMessage
                      : "ok"
                  }
                  value={inputData.ownerFullName}
                  setValue={(value) =>
                    setInputData((prevState) => {
                      return {
                        ...prevState,
                        ownerFullName: value,
                        ownerFullNameMessage:
                          value.trim() !== "" ? "" : "не заполнено",
                        licenseNumberMessage:
                          inputData.licenseNumber.trim() !== ""
                            ? ""
                            : "не заполнено",
                        ownerFullNameFirstTouch: false,
                        licenseNumberFirstTouch: false,
                      };
                    })
                  }
                  onBlur={(value) =>
                    setInputData((prevState) => {
                      return {
                        ...prevState,
                        ownerFullNameFirstTouch: value,
                      };
                    })
                  }
                  maxLength="64"
                />
              </div>

              <div className="add-case__block-inputs">
                <div className="input__block-input">
                  <div className="add-case__officer-wrapper">
                    <label htmlFor="add-case-officer">
                      Ответственный сотрудник
                    </label>
                    <select
                      id="add-case-officer"
                      value={
                        inputData.officer === null ? "null" : inputData.officer
                      }
                      onChange={(e) =>
                        setInputData((prevState) => {
                          return { ...prevState, officer: e.target.value };
                        })
                      }
                    >
                      <option value="null">
                        {officers.filter((officer) => {
                          if (officer.approved === true) {
                            return true;
                          } else {
                            return false;
                          }
                        }).length < 1
                          ? "-- Нет подходящих --"
                          : "-- Нет ответственного --"}
                      </option>
                      {officers.length > 0 ? (
                        <>
                          {officers
                            .filter((officer) => {
                              if (officer.approved === true) {
                                return true;
                              } else {
                                return false;
                              }
                            })
                            .map((officer) => {
                              return (
                                <option key={officer._id} value={officer._id}>
                                  {officer.email}
                                </option>
                              );
                            })}
                        </>
                      ) : null}
                    </select>
                  </div>
                </div>

                <Input
                  label="Номер лицензии"
                  type="licenseNumber"
                  placeholder="Введите номер лицензии..."
                  messageError={
                    inputData.licenseNumberMessage &&
                    !inputData.licenseNumberFirstTouch
                      ? inputData.licenseNumberMessage
                      : "ok"
                  }
                  value={inputData.licenseNumber}
                  setValue={(value) =>
                    setInputData((prevState) => {
                      return {
                        ...prevState,
                        licenseNumber: value.trim(),
                        ownerFullNameMessage:
                          inputData.ownerFullName.trim() !== ""
                            ? ""
                            : "не заполнено",
                        licenseNumberMessage:
                          value.trim() !== "" ? "" : "не заполнено",
                        licenseNumberFirstTouch: false,
                        ownerFullNameFirstTouch: false,
                      };
                    })
                  }
                  onBlur={(value) =>
                    setInputData((prevState) => {
                      return {
                        ...prevState,
                        licenseNumberFirstTouch: value,
                      };
                    })
                  }
                  maxLength="12"
                />
              </div>
              <div className="add-case__block-inputs">
                <Select
                  value={inputData.type}
                  messageError={"no"}
                  setValue={(value) =>
                    setInputData((prevState) => {
                      return {
                        ...prevState,
                        type: value,
                      };
                    })
                  }
                />
                <DateInput
                  value={inputData.date}
                  setValue={(value) =>
                    setInputData((prevState) => {
                      return { ...prevState, date: value };
                    })
                  }
                />
                <ColorInput
                  value={inputData.color || ""}
                  setValue={(value) =>
                    setInputData((prevState) => {
                      return { ...prevState, color: value };
                    })
                  }
                />
              </div>
              <div className="add-case__block-inputs">
                <div className="input__block-input">
                  <label htmlFor="add-case-description">
                    Подробности кражи:
                  </label>
                  <textarea
                    id="add-case-description"
                    // white-space: pre-line;
                    name="description"
                    cols="30"
                    rows="3"
                    onChange={(e) =>
                      setInputData((prevState) => {
                        return { ...prevState, description: e.target.value };
                      })
                    }
                    value={inputData.description}
                  ></textarea>
                </div>
              </div>

              <div className="add-case__block-inputs">
                <div className="add-case__block-inputs checkbox-input">
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

              <div className="add-case__block-buttons">
                <span>
                  <Button
                    type="button"
                    className="btn flash-btn"
                    onClick={() => setInputData(initState)}
                  >
                    Сбросить
                  </Button>
                </span>
                <Button
                  form="form-add-case"
                  type="submit"
                  disabled={checkBeforeSend()}
                  className="btn flash-btn"
                >
                  Сообщить о краже
                </Button>
              </div>
              <div className="required-block">
                * Обязательные для заполнения поля
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className={classNames("add-case", "plr-30")}>
      <div className={classNames("add-case__wrapper", "block-center")}>
        <div className="add-case__container">
          {isLoading ? (
            renderIsAuthFalse
          ) : !isAuth ? (
            <AccessError />
          ) : (
            renderIsAuthTrue
          )}
        </div>
      </div>
      {!isAuth ? (
        <Modal
          isShowing={isDisplayModal && !isLoading}
          hide={toggleDisplayModal}
          status={"error"}
          text={
            "Вы неавторизованный пользователь! У вас нет доступа к контенту этой страницы."
          }
          srcImg={modalImageAccessError}
        />
      ) : (
        <Modal
          isShowing={
            isDisplayModal && !isLoading && modalMessage.type === "addCase"
          }
          hide={toggleDisplayModal}
          status={modalMessage.status}
          text={modalMessage.text}
          srcImg={
            modalMessage.status === "successful"
              ? modalImageSuccessful
              : modalMessage.text === "Ошибка запроса: Network Error"
              ? modalImageError1
              : modalImageError2
          }
          goTo={() => {
            if (modalMessage.status === "successful") {
              navigate("/cases");
              dispatch(clearModalMessage());
            } else {
              goTo();
              dispatch(clearModalMessage());
            }
          }}
        />
      )}
    </section>
  );
}

export default AddCase;
