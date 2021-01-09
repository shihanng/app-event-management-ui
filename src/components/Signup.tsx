/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import Button from "./Button";
import Input from "./Input";

interface Params {
  email?: string;
  password?: string;
}

interface Result {
  errors?: string[];
}

async function signup(data: Params): Promise<Result> {
  let errors;

  try {
    await axios.post("/auth/users/", data).then();
  } catch (err) {
    const allErrors: string[][] = Object.values(err.response.data);
    errors = allErrors.flat();
  }

  return { errors };
}

const Form = tw.form`mt-10 w-80 mx-auto bg-gray-100 p-5 rounded-lg border border-gray-300 flex flex-col`;
const FormComponent = tw.div`flex flex-col mb-5`;
const Label = tw.label`mb-1`;

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [errors, setErrors] = useState<string[]>();
  const history = useHistory();

  const mutation = useMutation(signup);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors(["Password does not match."]);
      return;
    }

    mutation.mutate(
      { email, password },
      {
        onSuccess: (data, _variables, _context) => {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            history.push("/login");
          }
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormComponent>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormComponent>
      <FormComponent>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormComponent>
      <FormComponent>
        <Label htmlFor="confirm_password">Confirm password</Label>
        <Input
          type="password"
          name="confirm_password"
          id="confirm_password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormComponent>
      <FormComponent tw="mb-0">
        <Button type="submit">Sign up</Button>
        {errors
          ? errors.map((e) => (
              <div key={e} tw="text-xs mt-1 text-center text-red-500">
                {e}
              </div>
            ))
          : null}
      </FormComponent>
    </Form>
  );
};

export default Signup;
