/** @jsxImportSource @emotion/react */

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import tw from "twin.macro";

function App() {
  return (
    <div>
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
