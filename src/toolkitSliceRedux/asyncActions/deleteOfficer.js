import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_DELETE_OFFICER } from "./../../config";

export const deleteOfficer = (id) => {
  const url = URL_DELETE_OFFICER + id;
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
    const optionsDeleteOfficer = {
      method: "delete",
      url: url,
      data: {},
      headers: headers,
    };

    axios(optionsDeleteOfficer)
      .then((response) => {
        dispatch(
          addModalMessage({
            type: "deleteOfficer",
            status: "successful",
            text: `Сотрудник id=${id} удален успешно!`,
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
                type: "deleteOfficer",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "deleteOfficer",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "deleteOfficer",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }
        dispatch(noLoading());
      });
  };
};
