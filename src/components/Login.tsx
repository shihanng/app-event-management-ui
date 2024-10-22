/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";
import Button from "./Button";
import { Form, FormField, Label } from "./Form";
import Input from "./Input";

interface Params {
  email?: string;
  password?: string;
}

interface Result {
  auth_token?: string;
  errors?: string[];
}

async function login(data: Params): Promise<Result> {
  let auth_token;
  let errors;

  try {
    const response = await axios.post("/auth/token/login/", data).then();
    auth_token = response.data.auth_token;
  } catch (err) {
    const allErrors: string[][] = Object.values(err.response.data);
    errors = allErrors.flat();
  }

  return { auth_token, errors };
}

interface Props {
  setToken: (val: string) => void;
}

const Div = tw.div`flex flex-col mt-10 w-80 mx-auto`;

const Login: React.FC<Props> = ({ setToken }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<string[]>();
  const history = useHistory();

  const mutation = useMutation(login);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data, _variables, _context) => {
          if (data.auth_token) {
            setToken(data.auth_token);
            history.push("/");
          } else {
            setErrors(data.errors);
          }
        },
      }
    );
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormField tw="mb-0">
          <Button type="submit">Login</Button>
          {errors
            ? errors.map((e) => (
                <div key={e} tw="text-xs mt-1 text-center text-red-500">
                  {e}
                </div>
              ))
            : null}
        </FormField>
      </Form>
      <div tw="mt-5 text-sm text-center p-4 rounded-lg border border-gray-300">
        Don't have an account? <Link to="/signup">Sign up here.</Link>
      </div>
    </Div>
  );
};

export default Login;
