import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import reducer from "./reducer";
import Context from "./context";
import Account from "./components/Account/index";

const Root = () => {
  const [state, dispatch] = useReducer(reducer, { token: "" });
  // const [state, dispatch] = useReducer(reducer, {
  //   isLogged: localStorage.removeItem("token")
  // });

  // console.log(state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch({ type: "login", payload: token });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Layout />
        <Switch>
          <Route exact path="/" component={state.token ? Home : Register} />>
          <Route path="/login" component={Login} />>
          <Route path="/home" component={state.token ? Home : Login} />>
          <Route path="/account" component={state.token ? Account : Login} />>
        </Switch>
      </Router>
    </Context.Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
