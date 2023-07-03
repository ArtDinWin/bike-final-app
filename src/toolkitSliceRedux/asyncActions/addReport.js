import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_ADD_CASE, URL_REPORT } from "./../../config";

export const addReport = (objReport, type) => {
  const url = type === "addCase" ? URL_ADD_CASE : URL_REPORT;
  const headers = {
    Authorization: `Bearer ${tokenFromStorage()}`,
  };

  return function (dispatch) {
    const optionsAddReport = {
      method: "post",
      url: url,
      data: objReport,
      headers: type === "addCase" ? headers : null,
    };

    dispatch(
      addModalMessage({
        type: null,
        status: null,
        text: null,
      })
    );
    dispatch(isLoading());

    axios(optionsAddReport)
      .then((response) => {
        if (response.data.data) {
          dispatch(
            addModalMessage({
              type: type,
              status: "successful",
              text: `Сообщение о краже принято успешно!`,
            })
          );
        } else {
          dispatch(
            addModalMessage({
              type: type,
              status: "error",
              text: response.data.message,
            })
          );
        }
        dispatch(noLoading());
      })
      .catch((error) => {
        if (error && error.response) {
          // Ошибка сервера
          if (error.response.data.message) {
            dispatch(
              addModalMessage({
                type: type,
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: type,
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: type,
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }

        dispatch(noLoading());
      });
  };
};
