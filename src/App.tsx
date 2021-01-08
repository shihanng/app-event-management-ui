/** @jsxImportSource @emotion/react */

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import tw from "twin.macro";
import Login from "./components/Login";
import useToken from "./hooks/useToken";

const queryClient = new QueryClient();

const Div = tw.div`mt-2 mb-2`;

function App() {
  const { token, setToken } = useToken();

  return (
    <Div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Switch>
            {token ? (
              <Route path="/" render={() => <div>root</div>} />
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
