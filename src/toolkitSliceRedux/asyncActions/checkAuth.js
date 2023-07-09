import { isFalse, isTrue } from "./../isAuthSliceReducer";
import { removeFromStorage } from "./../localStorage/localStorage";
import { isLoading, noLoading } from "./../isAuthSliceReducer";
import axios from "axios";
import { URL_AUTH } from "./../../config";

export const checkAuth = (tokenTest) => {
  const headers = {
    Authorization: `Bearer ${tokenTest}`,
  };

  return function (dispatch) {
    dispatch(isFalse());
    dispatch(isLoading());
    axios
      .get(URL_AUTH, { headers })
      .then((response) => {
        dispatch(isTrue(response.data.data.user.approved));
        dispatch(noLoading());
      })
      .catch((error) => {
        dispatch(isFalse());
        removeFromStorage();
        dispatch(noLoading());
      });
  };
};
