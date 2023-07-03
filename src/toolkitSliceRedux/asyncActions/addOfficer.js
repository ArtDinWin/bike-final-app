import { URL_SIGN_UP, URL_ADD_OFFICER } from "./../../config";
import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";

export const addOfficer = (objOfficer, type) => {
  const url = type === "signUp" ? URL_SIGN_UP : URL_ADD_OFFICER;
  const headers = {
    Authorization: `Bearer ${tokenFromStorage()}`,
  };

  const optionsAddOfficer = {
    method: "post",
    url: url,
    data: objOfficer,
    headers: type === "signUp" ? null : headers,
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

    axios(optionsAddOfficer)
      .then((response) => {
        dispatch(
          addModalMessage({
            type: type,
            status: "successful",
            text:
              type === "signUp"
                ? `Вы успешно зарегистрировались на сайте!`
                : `Сотрудник добавлен успешно!`,
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
