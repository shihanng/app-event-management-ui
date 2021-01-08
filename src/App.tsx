/** @jsxImportSource @emotion/react */

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import tw from "twin.macro";
import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p tw="text-blue-600">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input tw="bg-black" />
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={() => <div>auth</div>} />
          <Route path="/" render={() => <div>root</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
