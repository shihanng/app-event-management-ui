/** @jsxImportSource @emotion/react */
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import tw from "twin.macro";
import Button from "./Button";
import { Form, FormField, Label } from "./Form";
import Input from "./Input";

interface Props {
  token: string;
}

interface Params {
  name: string;
  location: string;
  start_time: string;
  end_time: string;
}

function addEvent(token: string) {
  const config = {
    headers: { Authorization: `Token ${token}` },
  };

  return async function (data: Params): Promise<string[]> {
    let errors: string[] = [];

    try {
      await axios.post("/events/", data, config).then();
    } catch (err) {
      const allErrors: string[][] = Object.values(err.response.data);
      errors = allErrors.flat();
    }

    return errors;
  };
}
const Grid = tw.div`grid grid-cols-2 gap-x-5`;

const AddEvent: React.FC<Props> = ({ token }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState<string[]>();

  const mutation = useMutation(addEvent(token));
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { name, location, start_time: startTime, end_time: endTime },
      {
        onSuccess: (data, _variables, _context) => {
          setErrors(data);
          queryClient.invalidateQueries("events");
          queryClient.invalidateQueries("user_events");
          setName("");
          setLocation("");
          setStartTime("");
          setEndTime("");
        },
      }
    );
  };

  return (
    <Form tw="mb-10" onSubmit={handleSubmit}>
      <Grid>
        <FormField>
          <Label htmlFor="name">Event name</Label>
          <Input
            value={name}
            type="name"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="location">Location</Label>
          <Input
            value={location}
            type="location"
            name="location"
            id="location"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="start_time">Start time</Label>
          <Input
            value={startTime ? dayjs(startTime).format("YYYY-MM-DDTHH:mm") : ""}
            type="datetime-local"
            name="start_time"
            id="start_time"
            required
            onChange={(e) => {
              const dt = dayjs(e.target.value);
              dt.isValid() && setStartTime(dt.toISOString());
            }}
          />
        </FormField>
        <FormField>
          <Label htmlFor="end_time">End time</Label>
          <Input
            value={endTime ? dayjs(endTime).format("YYYY-MM-DDTHH:mm") : ""}
            type="datetime-local"
            name="end_time"
            id="end_time"
            required
            onChange={(e) => {
              const dt = dayjs(e.target.value);
              dt.isValid() && setEndTime(dt.toISOString());
            }}
          />
        </FormField>
      </Grid>
      <FormField tw="mb-0 flex flex-row justify-end">
        <Button tw="w-24" type="submit">
          Add event
        </Button>
      </FormField>
      {errors
        ? errors.map((e) => (
            <div
              key={e}
              tw="flex justify-end text-xs mt-1 text-center text-red-500"
            >
              {e}
            </div>
          ))
        : null}
    </Form>
  );
};

export default AddEvent;
