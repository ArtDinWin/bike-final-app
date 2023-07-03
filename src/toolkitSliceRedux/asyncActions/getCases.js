import { addCases } from "./../casesSliceReducer";
import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_GET_CASES } from "./../../config";

export const getCases = () => {
  const url = URL_GET_CASES;
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
        if (response.data.data && response.data.data.length > 0) {
          dispatch(addCases(response.data.data));
          dispatch(
            addModalMessage({
              type: "getCases",
              status: "successful",
              text: "Сообщения о кражах загрузились из базы данных успешно",
            })
          );
        } else {
          dispatch(
            addModalMessage({
              type: "getCases",
              status: "error",
              text: "В базе данных НЕТ сообщений о кражах",
            })
          );
          dispatch(addCases([]));
        }
        dispatch(noLoading());
      })
      .catch((error) => {
        if (error && error.response) {
          // Ошибка сервера

          if (error.response.data.message) {
            dispatch(
              addModalMessage({
                type: "getCases",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "getCases",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "getCases",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }
        dispatch(addCases([]));
        dispatch(noLoading());
      });
  };
};
