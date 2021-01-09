/** @jsxImportSource @emotion/react */
import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "./Button";
import tw from "twin.macro";

export interface RegisterProps {
  token: string;
  eventUuid: string;
}

export interface ActionProps {
  actionType: "register" | "deregister";
  registerProps: RegisterProps;
}

const Action: React.FC<ActionProps> = ({ actionType, registerProps }) => {
  const { token, eventUuid } = registerProps;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () =>
      axios.put(
        `/events/${eventUuid}/${actionType}/`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
        queryClient.invalidateQueries("user_events");
      },
      onError: () => {
        queryClient.invalidateQueries("events");
        queryClient.invalidateQueries("user_events");
      },
    }
  );

  const handleOnClick = () => {
    mutation.mutate();
  };

  const SmallButton = tw(Button)`text-xs w-24`;
  const RegisterButton =
    actionType == "register"
      ? tw(SmallButton)`bg-green-400 hover:bg-green-800`
      : tw(SmallButton)`bg-red-400 hover:bg-red-800`;

  return (
    <RegisterButton type="button" onClick={handleOnClick}>
      {actionType.toUpperCase()}
    </RegisterButton>
  );
};

export const Register = (props: RegisterProps) => (
  <Action actionType="register" registerProps={props} />
);

export const Deregister = (props: RegisterProps) => (
  <Action actionType="deregister" registerProps={props} />
);
