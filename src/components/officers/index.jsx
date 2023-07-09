import "./Officers.scss";
import classNames from "classnames";
import { MdDeleteForever } from "react-icons/md";
import SearchInput from "./../elements/search-input";
import mainImage from "./../../assets/officers.png";
import modalImageAccessError from "./../../assets/access-error.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-3.png";
import modalImageSuccessful from "./../../assets/successful-2.png";
import Modal from "./../modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccessError from "./../accessError";
import { getOfficers } from "./../../toolkitSliceRedux/asyncActions/getOfficers";
import Loading from "./../loading";
import { deleteOfficer } from "./../../toolkitSliceRedux/asyncActions/deleteOfficer";
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";
import Button from "./../elements/button";
import { addModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";

function Officers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goTo = () => navigate("/officers");

  // состояние state.isAuth
  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const isApproved = useSelector((state) => {
    return state.isAuth.isApproved;
  });
  const isLoading = useSelector((state) => {
    return state.isAuth.isLoading;
  });
  // состояние state.officers
  const officers = useSelector((state) => {
    return state.officers.officers;
  });
  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });

  const [searchInput, setSearchInput] = useState({
    value: "",
    typeRenderBefore: "all",
  });
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [typeRender, setTypeRender] = useState("approved");
  const [selectedSearch, setSelectedSearch] = useState("email");

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };

  useEffect(() => {
    isAuth ? setIsDisplayModal(false) : setIsDisplayModal(true);
  }, [isAuth]);

  useEffect(() => {
    if (modalMessage.text) {
      setIsDisplayModal(true);
    }
  }, [modalMessage]);

  useEffect(() => {
    if (searchInput.value.trim()) {
      handleSearch();
    }
  }, [typeRender, searchInput.value]);

  useEffect(() => {
    document.title = "Сотрудники";
    dispatch(getOfficers());
    return () => dispatch(clearModalMessage());
  }, []);

  const renderTableTr = (officer, navLink, index) => {
    return (
      <tr key={officer._id}>
        <td onClick={() => navLink()}>{index + 1}</td>
        <td onClick={() => navLink()}>
          {officer.firstName !== null ? officer.firstName : "нет имени"}
        </td>
        <td onClick={() => navLink()}>
          {officer.lastName !== null ? officer.lastName : "нет фамилии"}
        </td>
        <td onClick={() => navLink()}>{officer.email}</td>
        <td
          onClick={
            officer.approved
              ? () => {
                  if (searchInput.value.trim()) {
                    setSearchInput({
                      ...searchInput,
                      typeRenderBefore:
                        searchInput.typeRenderBefore === "approved"
                          ? "all"
                          : "approved",
                    });
                  } else {
                    setTypeRender(
                      typeRender === "approved" ? "all" : "approved"
                    );
                  }
                }
              : () => {
                  if (searchInput.value.trim()) {
                    setSearchInput({
                      ...searchInput,
                      typeRenderBefore:
                        searchInput.typeRenderBefore === "no-approved"
                          ? "all"
                          : "no-approved",
                    });
                  } else {
                    setTypeRender(
                      typeRender === "no-approved" ? "all" : "no-approved"
                    );
                  }
                }
          }
        >
          <span
            style={{ whiteSpace: "nowrap" }}
            className={classNames(
              "officers__status",
              officer.approved ? "approved" : "no-approved"
            )}
          >
            {officer.approved ? "одобрен" : "не одобрен"}
          </span>
        </td>

        <td
          className="table__delete-td"
          title="Удалить"
          onClick={() => {
            if (isApproved) {
              const answer = window.confirm(
                "Вы уверены, что хотите удалить этого пользователя?"
              );
              if (answer) {
                dispatch(deleteOfficer(officer._id));
              }
            } else {
              dispatch(
                addModalMessage({
                  type: "notApproved",
                  status: "error",
                  text: "Вы неподтвержденный сотрудник. У вас нет прав на это действие.",
                })
              );
            }
            setIsDisplayModal(true);
          }}
        >
          <MdDeleteForever className="table__delete" />
        </td>
      </tr>
    );
  };

  const tableOfficers = (typeRender) => {
    switch (typeRender) {
      case "approved":
        return officers.filter((officer, index) => {
          return officer.approved === true;
        });
      case "no-approved":
        return officers.filter((officer, index) => {
          return officer.approved !== true;
        });
      case "search":
        return officers.filter((officer) => {
          let selectedItem = officer[selectedSearch];
          if (selectedItem === null) {
            selectedItem = "нет";
          }

          switch (searchInput.typeRenderBefore) {
            case "approved":
              return (
                selectedItem
                  .toLowerCase()
                  .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                officer.approved === true
              );
            case "no-approved":
              return (
                selectedItem
                  .toLowerCase()
                  .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                officer.approved !== true
              );
            default:
              return (
                selectedItem
                  .toLowerCase()
                  .indexOf(searchInput.value.trim().toLowerCase()) > -1
              );
          }
        });
      default:
        return officers;
    }
  };

  const tableNoData = (
    <tr>
      <td colSpan="8" className="table__no-data">
        Нет данных
      </td>
    </tr>
  );

  const tableSearch = (
    <tr>
      <td colSpan="8" className="table__search">
        Результат поиска:
      </td>
    </tr>
  );

  const handleSearch = () => {
    setSearchInput({
      ...searchInput,
      typeRenderBefore:
        typeRender !== "search" ? typeRender : searchInput.typeRenderBefore,
    });
    if (searchInput.value.trim()) {
      setTypeRender("search");
      if (modalMessage.text) {
        setIsDisplayModal(true);
      }
    } else {
      setTypeRender(searchInput.typeRenderBefore);
    }
  };

  const renderOfficer = tableOfficers(typeRender);

  const renderIsAuthTrue = (
    <>
      <div className="officers__info-wrapper">
        <div className="officers__info">
          <h3>
            {typeRender === "approved"
              ? "Одобренные сотрудники"
              : typeRender === "no-approved"
              ? "Не одобренные сотрудники"
              : typeRender === "search" &&
                searchInput.typeRenderBefore === "approved"
              ? "Одобренные сотрудники"
              : typeRender === "search" &&
                searchInput.typeRenderBefore === "no-approved"
              ? "Не одобренные сотрудники"
              : "Все сотрудники компании"}
          </h3>
          <SearchInput
            placeholder="Найти сотрудников ..."
            value={searchInput.value}
            onChange={(value) => {
              setSearchInput({ ...searchInput, value: value });
              if (value === "") {
                setTypeRender(searchInput.typeRenderBefore);
              }
            }}
            handleSearch={handleSearch}
          />
          <div className="officers__selected-wrap">
            <input
              checked={selectedSearch === "email"}
              type="radio"
              name="search-selected"
              value="email"
              id="email"
              onChange={(e) => setSelectedSearch(e.target.value)}
            />
            <label htmlFor="email">email</label>

            <input
              checked={selectedSearch === "firstName"}
              type="radio"
              id="firstName"
              name="search-selected"
              value="firstName"
              onChange={(e) => setSelectedSearch(e.target.value)}
            />
            <label htmlFor="firstName">Имя</label>

            <input
              checked={selectedSearch === "lastName"}
              type="radio"
              name="search-selected"
              value="lastName"
              id="lastName"
              onChange={(e) => setSelectedSearch(e.target.value)}
            />
            <label htmlFor="lastName">Фамилия</label>
          </div>
          <div className="officers__selected-wrap">
            <Button
              type="button"
              className="btn flash-btn"
              onClick={() => setTypeRender("all")}
            >
              Все
            </Button>
            <Button
              type="button"
              className="btn flash-btn"
              onClick={() => navigate("/add_officer")}
            >
              Добавить
            </Button>
          </div>
        </div>
        <div className="officers__image-wrapper">
          <img className="" src={mainImage} alt="Поиск пропавших велосипедов" />
        </div>
      </div>
      <div className="officers__status-info">
        <div className="officers__status-items">
          Всего сотрудников:{" "}
          <span
            className={classNames("officers__status", "")}
            onClick={() => {
              if (searchInput.value.trim()) {
                setSearchInput({
                  ...searchInput,
                  typeRenderBefore: "all",
                });
              } else {
                setTypeRender("all");
              }
            }}
            title="Вывод всех сотрудников"
          >
            {officers.length}
          </span>
          Одобренных:{" "}
          <span
            className={classNames("officers__status", "approved")}
            onClick={() => {
              if (searchInput.value.trim()) {
                setSearchInput({
                  ...searchInput,
                  typeRenderBefore: "approved",
                });
              } else {
                setTypeRender("approved");
              }
            }}
            title="Вывод одобренных сотрудников"
          >
            {officers.filter((officer) => officer.approved === true).length}
          </span>
        </div>
        <div className="officers__status-items">
          Не одобренных:{" "}
          <span
            className={classNames("officers__status", "no-approved")}
            onClick={() => {
              if (searchInput.value.trim()) {
                setSearchInput({
                  ...searchInput,
                  typeRenderBefore: "no-approved",
                });
              } else {
                setTypeRender("no-approved");
              }
            }}
            title="Вывод не одобренных сотрудников"
          >
            {officers.filter((officer) => officer.approved !== true).length}
          </span>
        </div>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th>#</th>
            <th>Имя сотрудника</th>
            <th>Фамилия сотрудника</th>
            <th>Email</th>
            <th>Статус</th>
            <th title="Удалить">
              <MdDeleteForever className="table__delete icon" />
            </th>
          </tr>
          {typeRender === "search" ? tableSearch : null}
          {renderOfficer.length > 0
            ? renderOfficer.map((officer, index) => {
                const navLink = () => navigate(`officer/${officer._id}`);
                return renderTableTr(officer, navLink, index);
              })
            : tableNoData}
        </tbody>
      </table>
    </>
  );
  const renderIsAuthFalse = <AccessError />;

  return (
    <section className={classNames("officers", "plr-30")}>
      <div className={classNames("officers__wrapper", "block-center")}>
        <div className="officers__container">
          {isLoading ? (
            <Loading />
          ) : isAuth ? (
            renderIsAuthTrue
          ) : (
            renderIsAuthFalse
          )}
        </div>
      </div>
      {!isAuth ? (
        <Modal
          isShowing={isDisplayModal && !isLoading}
          hide={toggleDisplayModal}
          status={"error"}
          text={
            "Вы неавторизованный пользователь! У вас нет доступа к контенту этой страницы. Вам необходимо авторизоваться, или зарегистрироваться на сайте."
          }
          srcImg={modalImageAccessError}
          goTo={goTo}
        />
      ) : (
        <Modal
          isShowing={
            (modalMessage.type !== null &&
              modalMessage.type !== "getOfficers" &&
              !isLoading &&
              isDisplayModal) ||
            (modalMessage.type === "getOfficers" &&
              modalMessage.status === "error" &&
              !isLoading &&
              isDisplayModal)
          }
          srcImg={
            modalMessage.status === "successful"
              ? modalImageSuccessful
              : modalMessage.text === "Ошибка запроса: Network Error"
              ? modalImageError1
              : modalMessage.type === "notApproved"
              ? modalImageAccessError
              : modalImageError2
          }
          hide={() => setIsDisplayModal(false)}
          status={modalMessage.status}
          text={modalMessage.text}
          goTo={() => {
            goTo();
            if (modalMessage.type !== "getOfficers") {
              dispatch(getOfficers());
            }
            dispatch(clearModalMessage());
          }}
        />
      )}
    </section>
  );
}

export default Officers;
