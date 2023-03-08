import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { APIContextProvider } from "./Context/APIContext";



ReactDOM.render(
  <APIContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </APIContextProvider>,
  document.getElementById("root")
);
