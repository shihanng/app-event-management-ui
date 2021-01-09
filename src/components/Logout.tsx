import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

interface Props {
  setToken: (val: string) => void;
  token: string | null;
}

const Logout: React.FC<Props> = ({ token, setToken }) => {
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

  return (
    <button type="button" onClick={handleOnClick}>
      Logout
    </button>
  );
};

export default Logout;
