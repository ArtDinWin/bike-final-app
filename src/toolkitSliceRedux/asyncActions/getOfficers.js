import { addOfficers } from "./../officersSliceReducer";
import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_GET_OFFICERS } from "./../../config";

export const getOfficers = () => {
  const url = URL_GET_OFFICERS;
  const headers = {
    Authorization: `Bearer ${tokenFromStorage()}`,
  };

  return function (dispatch) {
    dispatch(
      addModalMessage({
        type: null,
        status: null,
        text: null,
      })
    );
    dispatch(isLoading());
    axios
      .get(url === "" ? "error" : url, { headers })
      .then((response) => {
        if (response.data.officers && response.data.officers.length > 0) {
          dispatch(addOfficers(response.data.officers));
          dispatch(
            addModalMessage({
              type: "getOfficers",
              status: "successful",
              text: "Сотрудники подгрузились из базы данных успешно",
            })
          );
        } else {
          dispatch(
            addModalMessage({
              type: "getOfficers",
              status: "error",
              text: `В базе данных НЕТ сообщений о сотрудников`,
            })
          );
          dispatch(addOfficers([]));
        }

        dispatch(noLoading());
      })
      .catch((error) => {
        if (error && error.response) {
          // Ошибка сервера
          if (error.response.data.message) {
            dispatch(
              addModalMessage({
                type: "getOfficers",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "getOfficers",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "getOfficers",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }
        dispatch(addOfficers([]));
        dispatch(noLoading());
      });
  };
};
