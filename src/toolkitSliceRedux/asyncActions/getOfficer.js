import { addOfficer } from "./../officerSliceReducer";
import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_GET_OFFICER } from "./../../config";

export const getOfficer = (id) => {
  const url = URL_GET_OFFICER + id;
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
          dispatch(addOfficer(response.data.data));
        } else {
          dispatch(
            addModalMessage({
              type: "getOfficer",
              status: "error",
              text: response.data.message,
            })
          );
          dispatch(addOfficer({}));
        }
        dispatch(noLoading());
      })
      .catch((error) => {
        if (error && error.response) {
          // Ошибка сервера
          if (error.response.data.message) {
            dispatch(
              addModalMessage({
                type: "getOfficer",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "getOfficer",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "getOfficer",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }
        dispatch(addOfficer({}));
        dispatch(noLoading());
      });
  };
};
