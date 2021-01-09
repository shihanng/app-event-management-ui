/** @jsxImportSource @emotion/react */

import { Global } from "@emotion/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import tw, { css } from "twin.macro";
import Event from "./components/Event";
import Header from "./components/Header";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import useToken from "./hooks/useToken";

const queryClient = new QueryClient();

const Div = tw.div`mt-2 mb-2 w-full mx-auto max-w-screen-md`;

function App() {
  const { token, setToken } = useToken();

  return (
    <Div>
      <Global
        styles={css`
          a {
            ${tw`text-purple-400 hover:underline hover:text-purple-800`}
          }
        `}
      />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header token={token} setToken={setToken}></Header>
          <Switch>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <ProtectedRoute
              token={token}
              path="/"
              render={() => <Event token={token ? token : ""} />}
            />
          </Switch>
        </QueryClientProvider>
      </BrowserRouter>
    </Div>
  );
}

export default App;
