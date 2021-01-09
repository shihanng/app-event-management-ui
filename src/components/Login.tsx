import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import Button from "./Button";

interface Params {
  email?: string;
  password?: string;
}

interface Result {
  auth_token?: string;
  error?: string;
}

async function login(data: Params): Promise<Result> {
  let auth_token;
  let error;

  try {
    const response = await axios.post("/auth/token/login/", data).then();
    auth_token = response.data.auth_token;
  } catch (err) {
    error = err.response.data.non_field_errors[0];
  }

  return { auth_token, error };
}

interface Props {
  setToken: (val: string) => void;
}

const Login: React.FC<Props> = ({ setToken }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const mutation = useMutation(login);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data, _variables, _context) => {
          data.auth_token ? setToken(data.auth_token) : setError(data.error);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? <div>{error}</div> : null}
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default Login;
