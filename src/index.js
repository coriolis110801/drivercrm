import React from "react";
import ReactDOM from "react-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FrontendAuth from "./FrontendAuth";

ReactDOM.render(

    <ChakraProvider>
      <Router>
        <Switch>
          <FrontendAuth>

          </FrontendAuth>
        </Switch>
      </Router>
    </ChakraProvider>,
  document.getElementById("root")
);
