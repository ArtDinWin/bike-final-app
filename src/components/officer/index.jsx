import "./Officer.scss";
import classNames from "classnames";
import mainImage from "./../../assets/no-data-officer.png";
import mainImageDetail from "./../../assets/officer-detail.png";
import mainImageEdit from "./../../assets/officer-edit.png";
import modalImageAccessError from "./../../assets/access-error.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-3.png";
import modalImageSuccessful from "./../../assets/successful-2.png";
import Button from "./../elements/button";
import { MdEditNote, MdSaveAs, MdKeyboardBackspace } from "react-icons/md";
import { useState, useEffect } from "react";
import Input from "./../elements/input";
import SwitcherInput from "./../elements/switcher_input";
import { useParams } from "react-router-dom";
import AccessError from "./../accessError";
import { getOfficer } from "./../../toolkitSliceRedux/asyncActions/getOfficer";
import { updateOfficer } from "./../../toolkitSliceRedux/asyncActions/updateOfficer";
import { deleteOfficer } from "./../../toolkitSliceRedux/asyncActions/deleteOfficer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../loading";
import { useNavigate } from "react-router-dom";
import Modal from "./../modal";
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";

function Officer() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const goTo = () => navigate("/officers/officer/" + params.id);
  const [editOfficerData, setEditOfficerData] = useState({});
  const [noEdit, setNoEdit] = useState(true);
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const officerItem = useSelector((state) => {
    return state.officer.officer;
  });

  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });

  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });
  const isLoading = useSelector((state) => {
    return state.isAuth.isLoading;
  });

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };
  const toggleNoEdit = () => {
    setNoEdit(!noEdit);
  };
  const toggleIsSave = () => {
    setIsSave(!isSave);
  };

  useEffect(() => {
    if (modalMessage.status !== null) {
      setIsDisplayModal(true);
    }
  }, [modalMessage]);

  useEffect(() => {
    isAuth ? setIsDisplayModal(false) : setIsDisplayModal(true);
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getOfficer(params.id));
    }
  }, [isAuth, params.id, isSave]);

  useEffect(() => {
    setEditOfficerData(officerItem);
  }, [officerItem]);

  useEffect(() => {
    document.title = "Детали сотрудника";
    return () => dispatch(clearModalMessage());
  }, []);

  function passwordMessage() {
    if (editOfficerData.password || editOfficerData.password === "") {
      return editOfficerData.password === officerItem.password
        ? "значение поля не изменялось"
        : editOfficerData.password.length < 3
        ? "Должно быть не менее 3 символов"
        : "no";
    }
  }

  const objOfficer = () => {
    return {
      firstName:
        editOfficerData.firstName !== officerItem.firstName
          ? editOfficerData.firstName
          : null,
      lastName:
        editOfficerData.lastName !== officerItem.lastName
          ? editOfficerData.lastName
          : null,
      [editOfficerData.password !== officerItem.password
        ? "password"
        : "noPassword"]:
        editOfficerData.password !== officerItem.password
          ? editOfficerData.password
          : null,
      approved:
        editOfficerData.approved,
    };
  };

  function checkBeforeSave() {
    if (editOfficerData.password || editOfficerData.password === "") {
      if (editOfficerData.password !== officerItem.password) {
        if (
          editOfficerData.password.length < 3 ||
          editOfficerData.password.length > 12
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return !noEdit &&
          (editOfficerData.firstName === officerItem.firstName ||
            editOfficerData.firstName === "") &&
          (editOfficerData.lastName === officerItem.lastName ||
            editOfficerData.lastName === "") &&
          editOfficerData.approved === officerItem.approved
          ? true
          : false;
      }
    } else {
      return true;
    }
  }

  const renderIsAuthFalse = (
    <div className="officer__info-wrap">
      <h3>Нет данных по данному id или id неверный</h3>
      <div className="officer__image-wrapper">
        <img
          className=""
          src={mainImage}
          alt="Поиск пропавших велосипедов"
          width="100%"
        />
      </div>
    </div>
  );

  const renderIsAuthTrue = (
    <>
      <h3 className="officer__title">
        {noEdit ? "Карточка сотрудника" : "Редактирование сотрудника"}
        {noEdit ? (
          <MdEditNote
            onClick={toggleNoEdit}
            className="officer__icon-edit"
            title="Редактировать"
          />
        ) : (
          <MdSaveAs
            onClick={toggleNoEdit}
            className={classNames(
              "officer__icon-edit",
              checkBeforeSave() && "disabled"
            )}
            title="Сохранить редактирование"
          />
        )}
      </h3>
      <div className="officer__card-wrapper">
        <div className="officer__image-wrapper">
          <img
            className=""
            src={noEdit ? mainImageDetail : mainImageEdit}
            alt="Img: Поиск пропавших велосипедов"
            width="100%"
          />
        </div>
        <div className="officer__info-wrapper">
          <div className="officer__info-list">
            <div className="officer__info-item">
              <div className="officer__info-name">Имя:</div>
              <div className="officer__info-value">
                <Input
                  className={
                    editOfficerData.firstName === officerItem.firstName
                      ? "normal"
                      : null
                  }
                  disabled={noEdit}
                  required="no"
                  label="no"
                  type="firstName"
                  placeholder="Введите Имя..."
                  messageError={
                    editOfficerData.firstName === officerItem.firstName
                      ? "значение поля не изменялось"
                      : editOfficerData.firstName === ""
                      ? "пустое поле не сохраняется"
                      : "no"
                  }
                  value={
                    noEdit && editOfficerData.firstName === null
                      ? "Пустое поле"
                      : editOfficerData.firstName || ""
                  }
                  setValue={(value) =>
                    setEditOfficerData((prevState) => {
                      return { ...prevState, firstName: value.trim() };
                    })
                  }
                  maxLength="18"
                />
              </div>
            </div>
            <div className="officer__info-item">
              <div className="officer__info-name">Фамилия:</div>
              <div className="officer__info-value">
                <Input
                  className={
                    editOfficerData.lastName === officerItem.lastName
                      ? "normal"
                      : null
                  }
                  disabled={noEdit}
                  required="no"
                  label="no"
                  type="lastName"
                  placeholder="Введите Фамилия..."
                  messageError={
                    editOfficerData.lastName === officerItem.lastName
                      ? "значение поля не изменялось"
                      : editOfficerData.lastName === ""
                      ? "пустое поле не сохраняется"
                      : "no"
                  }
                  value={
                    noEdit && editOfficerData.lastName === null
                      ? "Пустое поле"
                      : editOfficerData.lastName || ""
                  }
                  setValue={(value) =>
                    setEditOfficerData((prevState) => {
                      return { ...prevState, lastName: value.trim() };
                    })
                  }
                  maxLength="18"
                />
              </div>
            </div>
            <div className="officer__info-item">
              <div className="officer__info-name">Email:</div>
              <div className="officer__info-value">
                <Input
                  className={
                    editOfficerData.email === officerItem.email
                      ? "normal"
                      : null
                  }
                  label="no"
                  disabled={true}
                  type="Email"
                  placeholder="Введите Email..."
                  messageError={"значение поля нельзя изменить"}
                  value={editOfficerData.email}
                  setValue={(value) =>
                    setEditOfficerData((prevState) => {
                      return { ...prevState, email: value.trim() };
                    })
                  }
                  maxLength="64"
                />
                {noEdit ? null : (
                  <div className="label-name">
                    значение поля нельзя изменить
                  </div>
                )}
              </div>
            </div>

            <div className="officer__info-item">
              <div className="officer__info-name">Пароль:</div>
              <div className="officer__info-value">
                <Input
                  className={
                    editOfficerData.password === officerItem.password
                      ? "normal"
                      : null
                  }
                  disabled={noEdit}
                  label="no"
                  type="Password"
                  placeholder="Введите password..."
                  messageError={passwordMessage()}
                  value={
                    editOfficerData.password === officerItem.password
                      ? "пароль скрыт"
                      : editOfficerData.password
                  }
                  setValue={(value) =>
                    setEditOfficerData((prevState) => {
                      return { ...prevState, password: value.trim() };
                    })
                  }
                  maxLength="12"
                />
              </div>
            </div>

            <div className="officer__info-item">
              <div className="officer__info-name">Одобрен:</div>
              <div className="officer__info-value">
                <SwitcherInput
                  disabled={noEdit}
                  label="no"
                  value={editOfficerData.approved}
                  onChange={(value) =>
                    setEditOfficerData((prevState) => {
                      return { ...prevState, approved: value };
                    })
                  }
                />
              </div>
            </div>
            <div className="officer__info-buttons">
              <Button
                type="delete"
                onClick={() => {
                  const answer = window.confirm(
                    "Вы уверены, что хотите удалить этого сотрудника?"
                  );
                  if (answer) {
                    dispatch(deleteOfficer(params.id));
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
                    setEditOfficerData(officerItem);
                  }}
                >
                  Отмена
                </Button>
              )}
              <Button
                onClick={() => {
                  setIsDisplayModal(!noEdit);
                  if (!noEdit) {
                    dispatch(updateOfficer(params.id, objOfficer()));
                  } else {
                    toggleNoEdit();
                  }
                }}
                disabled={checkBeforeSave() && !noEdit}
              >
                {noEdit ? "Редактировать" : "Сохранить"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className={classNames("officer", "plr-30")}>
      <div className={classNames("officer__wrapper", "block-center")}>
        <div className="officer__container">
          {isAuth ? (
            <div
              className="officer__back"
              onClick={() => {
                navigate("/officers");
              }}
            >
              <MdKeyboardBackspace />
            </div>
          ) : null}
          {isLoading ? (
            <Loading />
          ) : !isAuth ? (
            <AccessError />
          ) : !Object.keys(officerItem).length ? (
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
          goTo={null}
          srcImg={modalImageAccessError}
        />
      ) : (
        <Modal
          isShowing={
            modalMessage.status !== null && !isLoading && isDisplayModal
          }
          hide={() => setIsDisplayModal(false)}
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
            if (
              modalMessage.status === "successful" &&
              modalMessage.type !== "deleteOfficer"
            ) {
              setNoEdit(true);
              toggleIsSave();
            } else if (
              modalMessage.type === "deleteOfficer" &&
              modalMessage.status === "successful"
            ) {
              navigate("/officers");
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

export default Officer;
