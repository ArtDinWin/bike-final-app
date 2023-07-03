import "./Report.scss";
import classNames from "classnames";
import mainImage from "./../../assets/report.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-2.png";
import modalImageSuccessful from "./../../assets/successful-1.png";
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
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";
import AccessValid from "../accessValid";

function Report() {
  const initState = {
    ownerFullName: "",
    ownerFullNameFirstTouch: true,
    ownerFullNameMessage: "",
    licenseNumber: "",
    licenseNumberFirstTouch: true,
    licenseNumberMessage: "",
    clientId: "d7cf7895-4335-445c-9796-c5ad815de4de",
    clientIdFirstTouch: true,
    clientIdMessage: "",
    type: "general",
    color: null,
    date: null,
    description: "",
    agreement: true,
  };
  const navigate = useNavigate();
  const goTo = () => navigate("/report");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => {
    return state.isAuth.isLoading;
  });
  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [inputData, setInputData] = useState(initState);

  const createObj = () => {
    return {
      ownerFullName: inputData.ownerFullName.trim(),
      licenseNumber: inputData.licenseNumber,
      clientId: inputData.clientId,
      type: inputData.type,
      color: inputData.color,
      date: inputData.date,
      description: inputData.description.trim(),
    };
  };

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

  const checkBeforeSave = () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const objReport = createObj();
    dispatch(addReport(objReport, "addReport"));
    setIsDisplayModal(true);
  };

  useEffect(() => {
    dispatch(clearModalMessage());
    document.title = "Сообщить о краже";
    return () => dispatch(clearModalMessage());
  }, []);

  const renderIsAuthTrue = (
    <div className="report__card-wrapper">
      <div className="report__image-wrapper">
        <img
          className=""
          src={mainImage}
          alt="Поиск пропавших велосипедов"
          width="100%"
        />
      </div>
      <div className="report__info-wrapper">
        <div className="report__block">
          <h3 className="title-block">Сообщить о краже</h3>
          <div className="report__block-info">
            <p>
              По статистике 80% велосипедов обнаружены и возращены в течение 2
              месяцев после кражи. Этот велосипед может быть следующий
              найденный. Сообщите о краже, заполнив данную форму и предоставив
              все необходимые данные.
            </p>
            <form
              onSubmit={handleSubmit}
              className="report__block-form"
              id="form-report"
            >
              <div className="report__block-inputs">
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

              <div className="report__block-inputs">
                <Input
                  className={"input__wrap"}
                  label="client-ID (сотрудника)"
                  type="clientId"
                  placeholder="Введите client-ID ..."
                  messageError={
                    inputData.clientIdMessage && !inputData.clientIdFirstTouch
                      ? inputData.clientIdMessage
                      : "ok"
                  }
                  disabled={true}
                  value={inputData.clientId}
                  maxLength="36"
                />

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
              <div className="report__block-inputs">
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
              <div className="report__block-inputs">
                <div className="input__block-input">
                  <label htmlFor="report-description">Подробности кражи:</label>
                  <textarea
                    // white-space: pre-line;
                    name="description"
                    id="report-description"
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

              <div className="report__block-inputs">
                <div className="report__block-inputs checkbox-input">
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

              <div className="report__block-buttons">
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
                  form="form-report"
                  type="submit"
                  disabled={checkBeforeSave()}
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
  const renderIsAuthFalse = <AccessValid />;

  return (
    <section className={classNames("report", "plr-30")}>
      <div className={classNames("report__wrapper", "block-center")}>
        <div className="report__container">
          {isLoading ? (
            <Loading />
          ) : isAuth ? (
            renderIsAuthFalse
          ) : (
            renderIsAuthTrue
          )}
        </div>
      </div>
      <Modal
        isShowing={
          isDisplayModal && !isLoading && modalMessage.type === "addReport"
        }
        hide={toggleDisplayModal}
        srcImg={
          modalMessage.status === "successful"
            ? modalImageSuccessful
            : modalMessage.text === "Ошибка запроса: Network Error"
            ? modalImageError1
            : modalImageError2
        }
        status={modalMessage.status}
        text={modalMessage.text}
        goTo={() => {
          if (modalMessage.status === "successful") {
            navigate("/");
            dispatch(clearModalMessage());
          } else {
            goTo();
            dispatch(clearModalMessage());
          }
        }}
      />
    </section>
  );
}

export default Report;
