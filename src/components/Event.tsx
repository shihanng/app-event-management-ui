/** @jsxImportSource @emotion/react */
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useQuery } from "react-query";
import tw from "twin.macro";

interface Props {
  token: string;
}

interface EventItemProps {
  name: string;
  uuid: string;
  location: string;
  start_time: string;
  end_time: string;
}

const EventItem: React.FC<EventItemProps> = (props) => {
  const { uuid, location, name, start_time, end_time } = props;

  const Div = tw.div`mb-3 flex flex-row`;
  const TimeDiv = tw.div`w-9 font-thin text-sm inline-block`;

  return (
    <Div key={uuid}>
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

interface Data {
  events: EventItemProps[];
}

function listEvent(token: string) {
  const config = {
    headers: { Authorization: `Token ${token}` },
  };

  return async function (): Promise<Data> {
    const response = await axios.get("/events/", config);
    const events: EventItemProps[] = response.data.map(
      (e: EventItemProps) => e
    );
    return { events };
  };
}

const Event: React.FC<Props> = ({ token }) => {
  const { data } = useQuery("events", listEvent(token));

  return data ? (
    <div>
      {data.events.map((d) => {
        return <EventItem {...d} />;
      })}
    </div>
  ) : null;
};

export default Event;
