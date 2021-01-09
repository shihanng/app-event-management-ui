import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import Button from "./Button";

export interface LogoutProps {
  setToken: (val: string) => void;
  token: string | null;
}

const Logout: React.FC<LogoutProps> = ({ token, setToken }) => {
  const mutation = useMutation(() =>
    axios.post(
      "/auth/token/logout",
      {},
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
  );

  const handleOnClick = () => {
    mutation.mutate();
    setToken("");
  };

  return token ? (
    <Button type="button" onClick={handleOnClick}>
      Logout
    </Button>
  ) : null;
};

export default Logout;
