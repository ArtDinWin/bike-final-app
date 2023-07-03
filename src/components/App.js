import React from "react";
import "./main.scss";
import Header from "./header";
import Main from "./main";
import Cases from "./cases";
import Officers from "./officers";
import Officer from "./officer";
import Report from "./report";
import SignIn from "./sign_in";
import AddOfficer from "./add_officer";
import AddCase from "./add_case";
import Case from "./case";
import Footer from "./footer";
import ErrorPage from "./404";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { tokenFromStorage } from "./../toolkitSliceRedux/localStorage/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { isFalse } from "./../toolkitSliceRedux/isAuthSliceReducer";
import { checkAuth } from "./../toolkitSliceRedux/asyncActions/checkAuth";
import { noLoading } from "./../toolkitSliceRedux/isAuthSliceReducer";

function App() {
  const isAuth = useSelector((state) => {
    return state.isAuth.isAuth;
  });
  const dispatch = useDispatch();
  const display = (Component, propsValue = null) => {
    return (
      <>
        <Header isAuth={isAuth} />
        <Component propsValue={propsValue} />
        <Footer />
      </>
    );
  };

  useEffect(() => {
    const tokenTest = tokenFromStorage();
    if (tokenTest === undefined || tokenTest === null) {
      dispatch(isFalse());
      dispatch(noLoading());
    } else {
      dispatch(checkAuth(tokenTest));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={display(Main)} />
        <Route
          path="/report"
          element={isAuth ? display(AddCase) : display(Report)}
        />
        <Route
          path="/add_case"
          element={isAuth ? display(AddCase) : display(Report)}
          // element={display(AddCase)}
        />
        <Route path="/sign_in" element={display(SignIn)} />
        <Route path="/sign_up" element={display(AddOfficer, "sign_up")} />
        <Route path="/cases" element={display(Cases)} />
        <Route path="/case" element={display(Case)} />
        <Route path="/officers" element={display(Officers)} />
        <Route path="/add_officer" element={display(AddOfficer)} />
        <Route path="officers/officer/:id" element={display(Officer)} />
        <Route path="cases/case/:id" element={display(Case)} />
        <Route path="*" element={display(ErrorPage)} />
      </Routes>
    </Router>
  );
}

export default App;
