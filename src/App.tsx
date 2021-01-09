/** @jsxImportSource @emotion/react */

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import tw from "twin.macro";
import Event from "./components/Event";
import Header from "./components/Header";
import Login from "./components/Login";
import useToken from "./hooks/useToken";

const queryClient = new QueryClient();

const Div = tw.div`mt-2 mb-2 w-full mx-auto max-w-screen-md`;

function App() {
  const { token, setToken } = useToken();

  return (
    <Div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header token={token} setToken={setToken}></Header>
          <Switch>
            {token ? (
              <Route path="/" render={() => <Event token={token} />} />
            ) : (
              <Login setToken={setToken} />
            )}
          </Switch>
        </QueryClientProvider>
      </BrowserRouter>
    </Div>
  );
}

export default App;
