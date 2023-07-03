import "./Cases.scss";
import classNames from "classnames";
import {
  MdOutlineSportsMotorsports,
  MdDirectionsBike,
  MdDeleteForever,
} from "react-icons/md";
import mainImage from "./../../assets/cases-img.png";
import modalImageAccessError from "./../../assets/access-error.png";
import modalImageError1 from "./../../assets/server-error.png";
import modalImageError2 from "./../../assets/error-3.png";
import modalImageSuccessful from "./../../assets/successful-2.png";
import SearchInput from "./../elements/search-input";
import Modal from "./../modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccessError from "./../accessError";
import { getCases } from "./../../toolkitSliceRedux/asyncActions/getCases";
import Loading from "./../loading";
import { getOfficers } from "./../../toolkitSliceRedux/asyncActions/getOfficers";
import { deleteCaseItem } from "./../../toolkitSliceRedux/asyncActions/deleteCaseItem";
import { clearModalMessage } from "./../../toolkitSliceRedux/logSliceReducer";
import { formatDate } from "./../utils";

function Cases() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goTo = () => navigate("/cases");

  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const officers = useSelector((state) => {
    return state.officers.officers;
  });
  const cases = useSelector((state) => {
    return state.cases.cases;
  });
  const modalMessage = useSelector((state) => {
    return state.log.modalMessage;
  });
  const isLoading = useSelector((state) => {
    return state.isAuth.isLoading;
  });

  const [isDisplayModal, setIsDisplayModal] = useState(true);

  const toggleDisplayModal = () => {
    setIsDisplayModal(!isDisplayModal);
  };
  const [searchInput, setSearchInput] = useState({
    value: "",
    typeRenderBefore: "all",
  });
  const [typeRender, setTypeRender] = useState("all");
  const [selectedSearch, setSelectedSearch] = useState("ownerFullName");

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

  function getEmailByOfficerId(id) {
    const officer = officers.filter((officer) => {
      if (officer._id === id) {
        return true;
      } else {
        return false;
      }
    });
    if (officer.length > 0 && officer[0].approved === true) {
      return officer[0].email;
    } else if (officer.length > 0) {
      return officer[0].email + " (notApproved)";
    } else if (id !== null) {
      return id;
    } else {
      return "нет ответственного";
    }
  }

  function findEmailById(id, arrayObj) {
    const find = arrayObj.find((obj) => {
      return obj._id === id;
    });
    return find !== undefined ? find.email : "";
  }

  useEffect(() => {
    document.title = "Кражи";
    dispatch(getCases());
    return () => dispatch(clearModalMessage());
  }, []);

  useEffect(() => {
    if (modalMessage.text) {
      setIsDisplayModal(true);
    }
  }, [modalMessage]);

  useEffect(() => {
    if (cases.length > 0) {
      dispatch(getOfficers());
    }
  }, [cases]);

  useEffect(() => {
    if (searchInput.value.trim()) {
      handleSearch();
    }
  }, [typeRender, searchInput.value]);

  const renderTableTr = (caseItem, navLink, index) => {
    return (
      <tr key={caseItem._id}>
        <td onClick={() => navLink()}>{index + 1}</td>
        <td onClick={() => navLink()}>
          {caseItem.ownerFullName !== null
            ? caseItem.ownerFullName
            : "нет имени арендатора"}
        </td>
        <td
          onClick={
            caseItem.status === "new"
              ? () => {
                  if (searchInput.value.trim()) {
                    setSearchInput({
                      ...searchInput,
                      typeRenderBefore:
                        searchInput.typeRenderBefore === "new" ? "all" : "new",
                    });
                  } else {
                    setTypeRender(typeRender === "new" ? "all" : "new");
                  }
                }
              : caseItem.status === "in_progress"
              ? () => {
                  if (searchInput.value.trim()) {
                    setSearchInput({
                      ...searchInput,
                      typeRenderBefore:
                        searchInput.typeRenderBefore === "in_progress"
                          ? "all"
                          : "in_progress",
                    });
                  } else {
                    setTypeRender(
                      typeRender === "in_progress" ? "all" : "in_progress"
                    );
                  }
                }
              : () => {
                  if (searchInput.value.trim()) {
                    setSearchInput({
                      ...searchInput,
                      typeRenderBefore:
                        searchInput.typeRenderBefore === "done"
                          ? "all"
                          : "done",
                    });
                  } else {
                    setTypeRender(typeRender === "done" ? "all" : "done");
                  }
                }
          }
        >
          <span
            className={classNames(
              "cases__status",
              caseItem.status === "new" && "new",
              caseItem.status === "in_progress" && "in_progress",
              caseItem.status === "done" && "done"
            )}
          >
            {caseItem.status === "new"
              ? "new"
              : caseItem.status === "in_progress"
              ? "work"
              : "done"}
          </span>
        </td>
        <td
          title={
            caseItem.type === "general"
              ? "Тип велосипеда: general"
              : "Тип велосипеда: sport"
          }
          onClick={() => navLink()}
        >
          {caseItem.type === "general" ? (
            <MdDirectionsBike className="cases__type" />
          ) : (
            <MdOutlineSportsMotorsports className="cases__type" />
          )}
        </td>
        <td onClick={() => navLink()}>
          <span
            className="cases__color"
            style={{
              backgroundColor:
                caseItem.color === null ? "gray" : caseItem.color,
              display: caseItem.color === null ? "none" : "inline-block",
            }}
          ></span>
          {caseItem.color === null ? "нет данных" : caseItem.color}
        </td>
        <td onClick={() => navLink()}>
          {formatDate(caseItem.createdAt)}{" "}
          <span style={{ whiteSpace: "nowrap" }}>
            {"/ "}
            {caseItem.date === null ? "нет данных" : formatDate(caseItem.date)}
          </span>
          {/* {caseItem.date === null
            ? `${formatDate(caseItem.createdAt)} / нет данных`
            : `${formatDate(caseItem.createdAt)} / ${}`} */}
        </td>
        <td onClick={() => navLink()}>
          {caseItem.officer === null
            ? "нет ответственного"
            : getEmailByOfficerId(caseItem.officer)}
        </td>
        <td
          className="table__delete-td"
          onClick={() => {
            const answer = window.confirm(
              "Вы уверены, что хотите удалить это обращение?"
            );
            if (answer) {
              dispatch(deleteCaseItem(caseItem._id));
              setIsDisplayModal(true);
            }
          }}
          title="Удалить"
        >
          <MdDeleteForever className="table__delete" />
        </td>
      </tr>
    );
  };

  const tableCases = (typeRender) => {
    switch (typeRender) {
      case "new":
        return cases.filter((caseItem) => {
          return caseItem.status === "new";
        });
      case "in_progress":
        return cases.filter((caseItem) => {
          return caseItem.status === "in_progress";
        });
      case "done":
        return cases.filter((caseItem) => {
          return caseItem.status === "done";
        });
      case "search":
        return cases.filter((caseItem) => {
          let selectedItem = caseItem[selectedSearch];
          if (selectedItem === null) {
            selectedItem = "нет";
          }

          if (selectedSearch === "date") {
            switch (searchInput.typeRenderBefore) {
              case "new":
                return (
                  (formatDate(selectedItem)
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                    caseItem.status === "new") ||
                  (formatDate(caseItem["createdAt"])
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                    caseItem.status === "new")
                );
              case "in_progress":
                return (
                  (formatDate(selectedItem)
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                    caseItem.status === "in_progress") ||
                  (formatDate(caseItem["createdAt"])
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                    caseItem.status === "in_progress")
                );
              case "done":
                return (
                  (formatDate(selectedItem)
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                    caseItem.status === "done") ||
                  (formatDate(caseItem["createdAt"])
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                    caseItem.status === "done")
                );
              default:
                return (
                  formatDate(selectedItem)
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 ||
                  formatDate(caseItem["createdAt"])
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1
                );
            }
          } else if (selectedSearch === "officer" && officers.length > 0) {
            const emailOfficer =
              selectedItem === "нет"
                ? "нет ответственного"
                : findEmailById(selectedItem, officers);

            switch (searchInput.typeRenderBefore) {
              case "new":
                return (
                  emailOfficer
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                  caseItem.status === "new"
                );
              case "in_progress":
                return (
                  emailOfficer
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                  caseItem.status === "in_progress"
                );
              case "done":
                return (
                  emailOfficer
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                  caseItem.status === "done"
                );
              default:
                return (
                  emailOfficer
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1
                );
            }
          } else {
            switch (searchInput.typeRenderBefore) {
              case "new":
                return (
                  selectedItem
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                  caseItem.status === "new"
                );
              case "in_progress":
                return (
                  selectedItem
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                  caseItem.status === "in_progress"
                );
              case "done":
                return (
                  selectedItem
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1 &&
                  caseItem.status === "done"
                );
              default:
                return (
                  selectedItem
                    .toLowerCase()
                    .indexOf(searchInput.value.trim().toLowerCase()) > -1
                );
            }
          }
        });
      default:
        return cases;
    }
  };

  const renderCase = tableCases(typeRender);

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

  const renderIsAuthTrue = (
    <>
      <div className="cases__info-wrapper">
        <div className="cases__info">
          <h3>
            {typeRender === "new"
              ? "Кражи (новые)"
              : typeRender === "in_progress"
              ? "Кражи (в процессе)"
              : typeRender === "done"
              ? "Кражи (завершенные)"
              : typeRender === "search" &&
                searchInput.typeRenderBefore === "new"
              ? "Кражи (новые)"
              : typeRender === "search" &&
                searchInput.typeRenderBefore === "in_progress"
              ? "Кражи (в процессе)"
              : typeRender === "search" &&
                searchInput.typeRenderBefore === "done"
              ? "Кражи (завершенные)"
              : "Сообщения о кражах"}
          </h3>
          <SearchInput
            placeholder="Найти кражи ..."
            value={searchInput.value}
            onChange={(value) => {
              setSearchInput({ ...searchInput, value: value });
              if (value === "") {
                setTypeRender(searchInput.typeRenderBefore);
              }
            }}
            handleSearch={handleSearch}
          />
          <div className="cases__selected-wrap">
            <input
              checked={selectedSearch === "ownerFullName"}
              type="radio"
              name="search-selected"
              value="ownerFullName"
              id="ownerFullName"
              onChange={(e) => setSelectedSearch(e.target.value)}
            />
            <label htmlFor="ownerFullName">Арендатор</label>

            <input
              checked={selectedSearch === "date"}
              type="radio"
              id="date"
              name="search-selected"
              value="date"
              onChange={(e) => setSelectedSearch(e.target.value)}
            />
            <label htmlFor="date">Дата</label>

            <input
              checked={selectedSearch === "officer"}
              type="radio"
              name="search-selected"
              value="officer"
              id="officer"
              onChange={(e) => setSelectedSearch(e.target.value)}
            />
            <label htmlFor="officer">Ответственный</label>
          </div>
        </div>

        <div className="cases__image-wrapper">
          <img className="" src={mainImage} alt="Поиск пропавших велосипедов" />
        </div>
      </div>
      <div className="cases__status-info">
        <div className="cases__status-items">
          Cообщений:{" "}
          <span
            className={classNames("cases__status", "")}
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
          >
            {cases.length}
          </span>
          Новых:{" "}
          <span
            className={classNames("cases__status", "new")}
            onClick={() => {
              if (searchInput.value.trim()) {
                setSearchInput({
                  ...searchInput,
                  typeRenderBefore: "new",
                });
              } else {
                setTypeRender("new");
              }
            }}
          >
            {cases.filter((caseItem) => caseItem.status === "new").length}
          </span>
        </div>
        <div className="cases__status-items">
          В процессе:{" "}
          <span
            className={classNames("cases__status", "in_progress")}
            onClick={() => {
              if (searchInput.value.trim()) {
                setSearchInput({
                  ...searchInput,
                  typeRenderBefore: "in_progress",
                });
              } else {
                setTypeRender("in_progress");
              }
            }}
          >
            {
              cases.filter((caseItem) => caseItem.status === "in_progress")
                .length
            }
          </span>
          Завершенных:{" "}
          <span
            className={classNames("cases__status", "done")}
            onClick={() => {
              if (searchInput.value.trim()) {
                setSearchInput({
                  ...searchInput,
                  typeRenderBefore: "done",
                });
              } else {
                setTypeRender("done");
              }
            }}
          >
            {cases.filter((caseItem) => caseItem.status === "done").length}
          </span>
        </div>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th>#</th>
            <th>ФИО арендатора</th>
            <th>Статус</th>
            <th>Тип</th>
            <th>Цвет</th>
            <th>
              <span style={{ whiteSpace: "nowrap" }}>Дата создания</span>{" "}
              <span style={{ whiteSpace: "nowrap" }}>/ Дата кражи</span>
            </th>
            <th>Ответственный</th>
            <th title="Удалить">
              <MdDeleteForever className="table__delete icon" />
            </th>
          </tr>
          {typeRender === "search" ? tableSearch : null}
          {renderCase.length > 0
            ? renderCase.map((caseItem, index) => {
                const navLink = () => navigate(`case/${caseItem._id}`);
                return renderTableTr(caseItem, navLink, index);
              })
            : tableNoData}
        </tbody>
      </table>
    </>
  );

  const renderIsAuthFalse = <AccessError />;

  return (
    <section className={classNames("cases", "plr-30")}>
      <div className={classNames("cases__wrapper", "block-center")}>
        <div className="cases__container">
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
          goTo={goTo}
          srcImg={modalImageAccessError}
        />
      ) : (
        <Modal
          isShowing={
            (modalMessage.type !== null &&
              modalMessage.type !== "getCases" &&
              !isLoading &&
              isDisplayModal &&
              modalMessage.type !== "getOfficers") ||
            (modalMessage.type === "getCases" &&
              modalMessage.status === "error" &&
              !isLoading &&
              isDisplayModal &&
              modalMessage.type !== "getOfficers")
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
            goTo();
            if (
              modalMessage.type !== "getCases" &&
              modalMessage.type !== "getOfficers"
            ) {
              dispatch(getCases());
            }

            dispatch(clearModalMessage());
          }}
        />
      )}
    </section>
  );
}
export default Cases;
