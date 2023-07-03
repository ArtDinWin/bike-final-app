import { addCaseItem } from "./../caseItemSliceReducer";
import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_GET_CASE } from "./../../config";

export const getCaseItem = (id) => {
  const url = URL_GET_CASE + id;
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
        if (response.data.data) {
          dispatch(addCaseItem(response.data.data));
        } else {
          dispatch(
            addModalMessage({
              type: "getCaseItem",
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
                type: "getCaseItem",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "getCaseItem",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "getCaseItem",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }
        dispatch(addCaseItem({}));
        dispatch(noLoading());
      });
  };
};
