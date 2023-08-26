import React from "react";
import ReactDOM from "react-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Contact from "./Contact";
import Header from "./components/header";
import Make from "./components/make";
ReactDOM.render(

    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/Make">
            <Make></Make>
          </Route>
          <Route path="/contact/:id">
            <Contact />
          </Route>
          <Route path="/" >
            <Header></Header>
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>,
  document.getElementById("root")
);
