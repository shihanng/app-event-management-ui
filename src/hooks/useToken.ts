import { useState } from "react";

export default function useToken() {
  function getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  const [token, setToken] = useState(getToken());

  function saveToken(token: string) {
    sessionStorage.setItem("token", token);
    setToken(token);
  }

  return { token, setToken: saveToken };
}
