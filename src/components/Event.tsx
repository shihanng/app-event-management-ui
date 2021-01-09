/** @jsxImportSource @emotion/react */
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useQuery } from "react-query";
import tw from "twin.macro";
import { Deregister, Register } from "./Register";

interface Props {
  token: string;
}

interface EventItemProps extends EventResponse, Props {
  isRegistered: boolean;
}

const EventItem: React.FC<EventItemProps> = (props) => {
  const {
    uuid,
    token,
    location,
    name,
    start_time,
    end_time,
    isRegistered,
  } = props;

  const Div = tw.div`mb-3 flex flex-row`;
  const TimeDiv = tw.div`w-9 font-thin text-sm inline-block`;

  const ActionButton = isRegistered ? Deregister : Register;

  return (
    <Div>
      <div tw="mr-5 justify-center flex flex-col">
        <ActionButton token={token} eventUuid={uuid} />
      </div>
      <div tw="text-sm mr-5 justify-center flex flex-col">
        <div>
          <TimeDiv>Start </TimeDiv>
          {dayjs(start_time).format("D MMM, YYYY HH:mm")}
        </div>
        <div>
          <TimeDiv>End </TimeDiv>
          {dayjs(end_time).format("D MMM, YYYY HH:mm")}
        </div>
      </div>
      <div>
        <div tw="font-semibold">{name}</div>
        <div tw="font-thin inline">Location: </div>
        <div tw="inline">{location}</div>
      </div>
    </Div>
  );
};

interface EventResponse {
  name: string;
  uuid: string;
  location: string;
  start_time: string;
  end_time: string;
}

function listEvent(token: string) {
  const config = {
    headers: { Authorization: `Token ${token}` },
  };

  return async function (): Promise<EventResponse[]> {
    const response = await axios.get("/events/", config);
    const events: EventResponse[] = response.data.map((e: EventItemProps) => e);
    return events;
  };
}

function listUserEvent(token: string) {
  const config = {
    headers: { Authorization: `Token ${token}` },
  };

  return async function (): Promise<string[]> {
    const response = await axios.get("/events/me/", config);
    const uuids: string[] = response.data.map((e: EventItemProps) => e.uuid);
    return uuids;
  };
}

const Event: React.FC<Props> = ({ token }) => {
  const { data: dataEvents } = useQuery(["events", token], listEvent(token));
  const { data: dataUserEvents } = useQuery(
    ["user_events", token],
    listUserEvent(token)
  );

  return dataEvents && dataUserEvents ? (
    <div>
      {dataEvents.map((d) => {
        return (
          <div key={d.uuid}>
            <EventItem
              token={token}
              isRegistered={dataUserEvents.includes(d.uuid)}
              {...d}
            />
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Event;
