import { addOfficer } from "./../officerSliceReducer";
import { addModalMessage } from "./../logSliceReducer";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import { tokenFromStorage } from "../localStorage/localStorage";
import axios from "axios";
import { URL_UPDATE_OFFICER } from "./../../config";

export const updateOfficer = (id, objOfficer) => {
  const url = URL_UPDATE_OFFICER + id;
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
      ...objOfficer,
    };
    const optionsUpdateOfficer = {
      method: "put",
      url: url,
      data: data,
      headers: headers,
    };

    axios(optionsUpdateOfficer)
      .then((response) => {
        if (response.data.data) {
          dispatch(addOfficer(response.data.data));
          dispatch(
            addModalMessage({
              type: "updateOfficer",
              status: "successful",
              text: `Данные по сотруднику id=${id} обновлены успешно!`,
            })
          );
        } else {
          dispatch(
            addModalMessage({
              type: "updateOfficer",
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
                type: "updateOfficer",
                status: "error",
                text: `Ошибка сервера: ${error.response.status} - ${error.response.data.message}`,
              })
            );
          } else {
            dispatch(
              addModalMessage({
                type: "updateOfficer",
                status: "error",
                text: `Ошибка сервера: ${error.message}`,
              })
            );
          }
        } else if (error && error.request) {
          // Ошибка запроса
          dispatch(
            addModalMessage({
              type: "updateOfficer",
              status: "error",
              text: `Ошибка запроса: ${error.message}`,
            })
          );
        }

        dispatch(noLoading());
      });
  };
};
