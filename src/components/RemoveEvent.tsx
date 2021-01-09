/** @jsxImportSource @emotion/react */
import axios from "axios";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import tw from "twin.macro";
import Button from "./Button";

export interface Props {
  token: string;
  eventUuid: string;
}

const RemoveEvent: React.FC<Props> = ({ token, eventUuid }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () =>
      axios.delete(`/events/${eventUuid}/`, {
        headers: { Authorization: `Token ${token}` },
      }),
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

  const RemoveButton = tw(
    Button
  )`w-8 h-8 rounded-full align-middle flex items-center justify-center text-black bg-transparent hover:bg-gray-200`;

  return (
    <RemoveButton type="button" onClick={handleOnClick}>
      <IoTrashOutline />
    </RemoveButton>
  );
};

export default RemoveEvent;
