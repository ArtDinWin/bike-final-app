import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_DELETE_CASE } from "./../../config";

export const deleteCaseItem = (id) => {
  const url = URL_DELETE_CASE + id;
  const headers = {
    Authorization: `Bearer ${tokenFromStorage()}`,
  };

  return function (dispatch) {
    const optionsDeleteCaseItem = {
      method: "delete",
      url: url,
      data: {},
      headers: headers,
    };
    dispatch(
      addModalMessage({
        type: null,
        status: null,
        text: null,
      })
    );
    dispatch(isLoading());

    axios(optionsDeleteCaseItem)
      .then((response) => {
        dispatch(
          addModalMessage({
            type: "deleteCaseItem",
            status: "successful",
            text: `Обращение id=${id} удалено успешно!`,
          })
        );
        dispatch(noLoading());
      })
      .catch((error) => {
        if (error && error.response) {
          // Ошибка сервера
          if (error.response.data.message) {
            dispatch(
              addModalMessage({
                type: "deleteCaseItem",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "deleteCaseItem",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "deleteCaseItem",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }
        dispatch(noLoading());
      });
  };
};
