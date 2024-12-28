import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import './global.css';

ReactDOM.render(
  <Router>
    <Switch>
      <AuthRoutes />
    </Switch>
  </Router>,
  document.getElementById("root")
);
