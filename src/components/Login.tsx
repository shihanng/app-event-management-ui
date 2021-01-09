/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
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

const Form = tw.form`mt-10 w-80 mx-auto bg-gray-100 p-5 rounded-lg border border-gray-300 flex flex-col`;
const FormComponent = tw.div`flex flex-col mb-5`;

const Login: React.FC<Props> = ({ setToken }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const history = useHistory();

  const mutation = useMutation(login);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data, _variables, _context) => {
          data.auth_token ? setToken(data.auth_token) : setError(data.error);
          history.push("/");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormComponent>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormComponent>
      <FormComponent>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormComponent>
      {error ? <div>{error}</div> : null}
      <FormComponent tw="mb-0">
        <Button type="submit">Sign in</Button>
      </FormComponent>
    </Form>
  );
};

export default Login;
