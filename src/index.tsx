import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "twin.macro";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "tailwindcss/dist/base.min.css";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();