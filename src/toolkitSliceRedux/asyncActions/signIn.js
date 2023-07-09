import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { saveToStorage } from "./../localStorage/localStorage";
import axios from "axios";
import { isTrue } from "./../isAuthSliceReducer";
import { URL_SIGN_IN } from "./../../config";

export const signIn = (objData) => {
  const url = URL_SIGN_IN;
  return function (dispatch) {
    dispatch(
      addModalMessage({
        type: null,
        status: null,
        text: null,
      })
    );
    dispatch(isLoading());
    const optionsSignIn = {
      method: "post",
      url: url,
      data: objData,
      headers: null,
    };

    axios(optionsSignIn)
      .then((response) => {
        if (response.data.data.token) {
          dispatch(
            addModalMessage({
              type: "signIn",
              status: "successful",
              text: `Авторизация пройдена успешно!`,
            })
          );
          dispatch(isTrue(response.data.data.user.approved));
          saveToStorage(response.data.data.token);
        } else {
          dispatch(
            addModalMessage({
              type: "signIn",
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
                type: "signIn",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "signIn",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "signIn",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }

        dispatch(noLoading());
      });
  };
};
