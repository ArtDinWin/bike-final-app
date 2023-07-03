import { addCaseItem } from "./../caseItemSliceReducer";
import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_UPDATE_CASE } from "./../../config";

export const updateCaseItem = (id, objCaseItem) => {
  const url = URL_UPDATE_CASE + id;
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
    const data = {
      ...objCaseItem,
    };
    const optionsUpdateCaseItem = {
      method: "put",
      url: url,
      data: data,
      headers: headers,
    };

    axios(optionsUpdateCaseItem)
      .then((response) => {
        if (response.data.data) {
          dispatch(addCaseItem(response.data.data));
          dispatch(
            addModalMessage({
              type: "updateCaseItem",
              status: "successful",
              text: `Данные по краже id=${id} обновлены успешно!`,
            })
          );
        } else {
          dispatch(
            addModalMessage({
              type: "CaseItem",
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
                type: "CaseItem",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "CaseItem",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "CaseItem",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }

        dispatch(noLoading());
      });
  };
};
