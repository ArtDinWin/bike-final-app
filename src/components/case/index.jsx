import "./Case.scss";
import classNames from "classnames";
import mainImage from "./../../assets/no-data-case.png";
import mainImageDetail from "./../../assets/case-detail.png";
import mainImageEdit from "./../../assets/case-edit.png";
import modalImageAccessError from "./../../assets/access-error.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-3.png";
import modalImageSuccessful from "./../../assets/successful-2.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./../elements/button";
import Input from "./../elements/input";
import Select from "./../elements/select";
import DateInput from "./../elements/date_input";
import ColorInput from "./../elements/color_input";
import Modal from "./../modal";
import { useDispatch, useSelector } from "react-redux";
import { getCaseItem } from "./../../toolkitSliceRedux/asyncActions/getCaseItem";
import { getOfficers } from "./../../toolkitSliceRedux/asyncActions/getOfficers";
import { useParams } from "react-router-dom";
import AccessError from "./../accessError";
import Loading from "./../loading";
import { MdEditNote, MdSaveAs, MdKeyboardBackspace } from "react-icons/md";
import { updateCaseItem } from "./../../toolkitSliceRedux/asyncActions/updateCaseItem";
import { deleteCaseItem } from "./../../toolkitSliceRedux/asyncActions/deleteCaseItem";
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";
import { formatDate } from "./../utils";

function Case() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const goTo = () => navigate("/cases/case/" + params.id);
  const [noEdit, setNoEdit] = useState(true);
  const [isSave, setIsSave] = useState(false);

  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [editCaseData, setEditCaseData] = useState({});
  const caseItem = useSelector((state) => {
    return state.caseItem.caseItem;
  });
  const officers = useSelector((state) => {
    return state.officers.officers;
  });
  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const isLoading = useSelector((state) => {
    return state.isAuth.isLoading;
  });
  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });

  const toggleIsSave = () => {
    setIsSave(!isSave);
  };

  const objCaseItem = () => {
    return {
      [editCaseData.ownerFullName !== caseItem.ownerFullName &&
      editCaseData.ownerFullName.trim() !== ""
        ? "ownerFullName"
        : "notOwnerFullName"]:
        editCaseData.ownerFullName !== caseItem.ownerFullName &&
        editCaseData.ownerFullName.trim() !== ""
          ? editCaseData.ownerFullName.trim()
          : null,
      [editCaseData.licenseNumber !== caseItem.licenseNumber &&
      editCaseData.licenseNumber.trim() !== ""
        ? "licenseNumber"
        : "notLicenseNumber"]:
        editCaseData.licenseNumber !== caseItem.licenseNumber &&
        editCaseData.licenseNumber.trim() !== ""
          ? editCaseData.licenseNumber.trim()
          : null,
      status: editCaseData.status,
      type: editCaseData.type,
      [editCaseData.officer !== caseItem.officer &&
      editCaseData.officer !== "null"
        ? "officer"
        : "notOfficer"]:
        editCaseData.officer !== caseItem.officer &&
        editCaseData.officer !== "null"
          ? editCaseData.officer
          : null,
      date: editCaseData.date !== caseItem.date ? editCaseData.date : null,
      color: editCaseData.color !== caseItem.color ? editCaseData.color : null,
      description:
        editCaseData.description !== caseItem.description &&
        editCaseData.description.trim() === ""
          ? " "
          : editCaseData.description !== caseItem.description &&
            editCaseData.description.trim() !== ""
          ? editCaseData.description.trim()
          : null,
      resolution:
        editCaseData.resolution !== caseItem.resolution &&
        editCaseData.resolution.trim() === ""
          ? " "
          : editCaseData.resolution !== caseItem.resolution &&
            editCaseData.resolution.trim() !== ""
          ? editCaseData.resolution.trim()
          : null,
    };
  };

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

  const toggleNoEdit = () => {
    setNoEdit(!noEdit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisplayModal(!noEdit);
    if (!noEdit) {
      dispatch(updateCaseItem(params.id, objCaseItem()));
    } else {
      toggleNoEdit();
    }
  };

  function checkBeforeSave() {
    if (
      typeof editCaseData.ownerFullName !== "string" ||
      typeof editCaseData.licenseNumber !== "string"
    ) {
      return true;
    } else if (
      editCaseData.ownerFullName.trim() === "" ||
      editCaseData.licenseNumber.trim() === ""
    ) {
      return true;
    } else if (
      editCaseData.status === "done" &&
      (typeof editCaseData.resolution === "string"
        ? editCaseData.resolution.trim() === ""
        : editCaseData.resolution === null)
    ) {
      return true;
    } else {
      return !noEdit &&
      editCaseData.ownerFullName === caseItem.ownerFullName &&
      editCaseData.licenseNumber === caseItem.licenseNumber &&
        editCaseData.status === caseItem.status &&
        editCaseData.officer === caseItem.officer &&
        editCaseData.type === caseItem.type &&
        editCaseData.officer === caseItem.officer &&
        editCaseData.date === caseItem.date &&
        editCaseData.color === caseItem.color &&
        editCaseData.description === caseItem.description &&
        editCaseData.resolution === caseItem.resolution
        ? true
        : false;
    }
  }

  useEffect(() => {
    document.title = "Детали кражи";
    return () => dispatch(clearModalMessage());
  }, []);

  useEffect(() => {
    if (modalMessage.status !== null && isAuth) {
      setIsDisplayModal(true);
    }
  }, [modalMessage]);

  useEffect(() => {
    isAuth ? setIsDisplayModal(false) : setIsDisplayModal(true);
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getOfficers());
      dispatch(getCaseItem(params.id));
    }
  }, [isAuth, params.id, isSave]);

  useEffect(() => {
    setEditCaseData(caseItem);
  }, [caseItem]);

  const renderIsAuthFalse = (
    <div className="case-item__info-wrap">
      <h3>Нет данных по данному id или id неверный</h3>
      <div className="case-item__image-wrapper">
        <img
          className=""
          src={mainImage}
          alt="Img: Поиск пропавших велосипедов"
          width="100%"
        />
      </div>
    </div>
  );

  const renderIsAuthTrue = (
    <>
      <div className="case-item__card-wrapper">
        <div className="case-item__image-wrapper">
          <img
            className=""
            src={noEdit ? mainImageDetail : mainImageEdit}
            alt="Img: Поиск пропавших велосипедов"
            width="100%"
          />
        </div>
        <div className="case-item__info-wrapper">
          <div className="case-item__block">
            <h3 className="title-block">
              {noEdit ? "Подробно про кражу" : "Редактирование кражи"}{" "}
              {noEdit ? (
                <MdEditNote
                  onClick={toggleNoEdit}
                  className="case-item__icon-edit"
                  title="Редактировать"
                />
              ) : (
                <MdSaveAs
                  onClick={toggleNoEdit}
                  className={classNames(
                    "case-item__icon-edit",
                    checkBeforeSave() && "disabled"
                  )}
                  title="Сохранить редактирование"
                />
              )}
            </h3>
            <div className="case-item__block-info">
              <form
                onSubmit={handleSubmit}
                className="case-item__block-form"
                id="case-item-case"
              >
                <div className="case-item__block-inputs">
                  <Input
                    className={
                      editCaseData.ownerFullName === caseItem.ownerFullName
                        ? "normal "
                        : null
                    }
                    disabled={noEdit}
                    label="ФИО владельца"
                    type="ownerFullName"
                    placeholder="Введите ФИО владельца..."
                    messageError={
                      editCaseData.ownerFullName === caseItem.ownerFullName
                        ? "значение поля не изменялось"
                        : typeof editCaseData.ownerFullName !== "string"
                        ? "значение не строковое"
                        : editCaseData.ownerFullName.trim() === ""
                        ? "не должно быть пустым"
                        : "no"
                    }
                    value={editCaseData.ownerFullName}
                    setValue={(value) =>
                      setEditCaseData((prevState) => {
                        return {
                          ...prevState,
                          ownerFullName: value,
                        };
                      })
                    }
                    maxLength="64"
                  />
                  <div className="case-item__status-wrapper">
                    <label htmlFor="case-item-status">Статус заявки</label>
                    <select
                      value={editCaseData.status}
                      disabled={noEdit}
                      className={editCaseData.status}
                      onChange={(e) =>
                        setEditCaseData((prevState) => {
                          return { ...prevState, status: e.target.value };
                        })
                      }
                      id="case-item-status"
                    >
                      <option value="new">Новая</option>
                      <option value="in_progress">В процессе</option>
                      <option value="done">Завершенная</option>
                    </select>
                  </div>
                </div>

                <div className="case-item__block-inputs">
                  <div className="case-item__officer-wrapper">
                    <div className="input__block-input">
                      <label htmlFor="case-item-officer">
                        Ответственный сотрудник
                      </label>
                      <select
                        disabled={noEdit}
                        id="case-item-officer"
                        value={
                          editCaseData.officer === null
                            ? "null"
                            : editCaseData.officer
                        }
                        onChange={(e) =>
                          setEditCaseData((prevState) => {
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
                      <div
                        className={classNames(
                          "message",
                          !noEdit && editCaseData.officer === caseItem.officer
                            ? "normal visible"
                            : !noEdit && editCaseData.officer === "null"
                            ? "visible"
                            : ""
                        )}
                      >
                        {editCaseData.officer === caseItem.officer
                          ? "значение не изменялось"
                          : editCaseData.officer === "null"
                          ? "этот выбор не обновит данные"
                          : "no"}
                      </div>
                    </div>
                  </div>

                  <Input
                    className={
                      editCaseData.licenseNumber === caseItem.licenseNumber
                        ? "normal "
                        : null
                    }
                    disabled={noEdit}
                    label="Номер лицензии"
                    type="licenseNumber"
                    placeholder="Введите номер лицензии..."
                    messageError={
                      editCaseData.licenseNumber === caseItem.licenseNumber
                        ? "значение поля не изменялось"
                        : editCaseData.licenseNumber === ""
                        ? "не должно быть пустым"
                        : "no"
                    }
                    value={
                      noEdit && editCaseData.licenseNumber === null
                        ? "Пустое поле"
                        : editCaseData.licenseNumber || ""
                    }
                    setValue={(value) =>
                      setEditCaseData((prevState) => {
                        return { ...prevState, licenseNumber: value.trim() };
                      })
                    }
                    maxLength="64"
                  />
                </div>
                <div className="case-item__block-inputs">
                  <Select
                    disabled={noEdit}
                    value={editCaseData.type}
                    className={
                      editCaseData.type === caseItem.type ? "normal " : null
                    }
                    messageError={
                      editCaseData.type === caseItem.type
                        ? "значение поля не изменялось"
                        : editCaseData.type === ""
                        ? "пустое поле не сохраняется"
                        : "no"
                    }
                    setValue={(value) =>
                      setEditCaseData((prevState) => {
                        return { ...prevState, type: value };
                      })
                    }
                  />
                  <DateInput
                    className={
                      editCaseData.date === caseItem.date
                        ? "normal data-input"
                        : "data-input"
                    }
                    disabled={noEdit}
                    value={editCaseData.date}
                    setValue={(value) =>
                      setEditCaseData((prevState) => {
                        return { ...prevState, date: value };
                      })
                    }
                    messageError={
                      editCaseData.date === caseItem.date
                        ? "значение не изменялось"
                        : editCaseData.date === null
                        ? "пустое поле не сохраняется"
                        : "no"
                    }
                  />

                  <ColorInput
                    disabled={noEdit}
                    value={editCaseData.color || ""}
                    setValue={(value) =>
                      setEditCaseData((prevState) => {
                        return { ...prevState, color: value };
                      })
                    }
                  />
                </div>
                <div className="case-item__block-inputs">
                  <div className="input__block-input">
                    <label
                      htmlFor="case-item-description"
                      className="case-item-description"
                    >
                      Подробности кражи:
                    </label>
                    <textarea
                      disabled={noEdit}
                      // white-space: pre-line;
                      name="description"
                      id="case-item-description"
                      rows="3"
                      onChange={(e) =>
                        setEditCaseData((prevState) => {
                          return { ...prevState, description: e.target.value };
                        })
                      }
                      value={
                        (typeof editCaseData.description !== "string" &&
                          noEdit) ||
                        (typeof editCaseData.description === "string" &&
                          editCaseData.description.trim() === "" &&
                          noEdit)
                          ? "нет текста"
                          : typeof editCaseData.description !== "string" &&
                            !noEdit
                          ? ""
                          : editCaseData.description
                      }
                    ></textarea>
                    <div
                      className={classNames(
                        "message",
                        !noEdit &&
                          editCaseData.description === caseItem.description
                          ? "normal visible"
                          : ""
                      )}
                    >
                      {editCaseData.description === caseItem.description
                        ? "значение не изменялось"
                        : "no"}
                    </div>
                  </div>
                  <div className="input__block-input">
                    <label
                      htmlFor="case-item-description"
                      className="case-item-description"
                    >
                      Пояснения: <span>*</span>
                    </label>
                    <textarea
                      disabled={noEdit || editCaseData.status !== "done"}
                      // white-space: pre-line;
                      name="description"
                      id="case-item-description"
                      rows="3"
                      onChange={(e) =>
                        setEditCaseData((prevState) => {
                          return { ...prevState, resolution: e.target.value };
                        })
                      }
                      value={
                        (typeof editCaseData.resolution !== "string" &&
                          noEdit) ||
                        (typeof editCaseData.resolution === "string" &&
                          editCaseData.resolution.trim() === "" &&
                          noEdit) ||
                        (typeof editCaseData.resolution !== "string" &&
                          !noEdit &&
                          editCaseData.status !== "done")
                          ? "нет текста"
                          : typeof editCaseData.resolution !== "string" &&
                            !noEdit
                          ? ""
                          : editCaseData.resolution
                      }
                    ></textarea>
                    <div
                      className={classNames(
                        "message",
                        !noEdit &&
                          editCaseData.status === "done" &&
                          (editCaseData.resolution === caseItem.resolution ||
                            (typeof editCaseData.resolution === "string"
                              ? editCaseData.resolution.trim() === ""
                              : editCaseData.resolution === ""))
                          ? "visible"
                          : ""
                      )}
                    >
                      {editCaseData.resolution === caseItem.resolution
                        ? "значение не изменялось"
                        : typeof editCaseData.resolution === "string" &&
                          editCaseData.resolution.trim() === caseItem.resolution
                        ? "значение не изменялось"
                        : typeof editCaseData.resolution === "string" &&
                          editCaseData.resolution.trim() === ""
                        ? "не должно быть пустым"
                        : editCaseData.resolution === null
                        ? "пустое поле не сохраняется"
                        : "no"}
                    </div>
                  </div>
                </div>

                <div className="case-item__block-inputs __mha">
                  <div className="case-item__date-wrapper">
                    <div className="case-item__date-title">Дата обращения:</div>
                    <div className="case-item__date">
                      {formatDate(editCaseData.createdAt)}
                    </div>
                  </div>
                  <div className="case-item__date-wrapper">
                    <div className="case-item__date-title">
                      Дата обновления информации:
                    </div>
                    <div className="case-item__date">
                      {" "}
                      {editCaseData.updatedAt !== null
                        ? formatDate(editCaseData.updatedAt)
                        : "без обновления"}
                    </div>
                  </div>
                </div>

                <div className="case-item__block-buttons">
                  <Button
                    type="delete"
                    onClick={() => {
                      const answer = window.confirm(
                        "Вы уверены, что хотите удалить это обращение?"
                      );
                      if (answer) {
                        dispatch(deleteCaseItem(params.id));
                        setIsDisplayModal(true);
                      }
                    }}
                  >
                    Удалить
                  </Button>
                  {noEdit ? null : (
                    <Button
                      onClick={() => {
                        toggleNoEdit();
                        setEditCaseData(caseItem);
                      }}
                    >
                      Отмена
                    </Button>
                  )}
                  <Button
                    form="case-item-case"
                    type="submit"
                    className="btn flash-btn"
                    disabled={checkBeforeSave() && !noEdit}
                    onClick={null}
                  >
                    {noEdit ? "Редактировать" : "Сохранить"}
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
    </>
  );

  return (
    <section className={classNames("case-item", "plr-30")}>
      <div className={classNames("case-item__wrapper", "block-center")}>
        <div className="case-item__container">
          {isAuth ? (
            <div
              className="case-item__back"
              onClick={() => {
                navigate("/cases");
              }}
            >
              <MdKeyboardBackspace />
            </div>
          ) : null}
          {isLoading ? (
            <Loading />
          ) : !isAuth ? (
            <AccessError />
          ) : !Object.keys(caseItem).length ? (
            renderIsAuthFalse
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
          goTo={null}
        />
      ) : (
        <Modal
          isShowing={
            modalMessage.status !== null &&
            !isLoading &&
            isDisplayModal &&
            modalMessage.type !== "getOfficers"
          }
          srcImg={
            modalMessage.status === "successful"
              ? modalImageSuccessful
              : modalMessage.text === "Ошибка запроса: Network Error"
              ? modalImageError1
              : modalImageError2
          }
          hide={() => setIsDisplayModal(false)}
          status={modalMessage.status}
          text={modalMessage.text}
          goTo={() => {
            if (
              modalMessage.status === "successful" &&
              modalMessage.type !== "deleteCaseItem"
            ) {
              setNoEdit(true);
              toggleIsSave();
            } else if (
              modalMessage.type === "deleteCaseItem" &&
              modalMessage.status === "successful"
            ) {
              navigate("/cases");
            } else {
              goTo();
            }
            dispatch(clearModalMessage());
          }}
        />
      )}
    </section>
  );
}

export default Case;
