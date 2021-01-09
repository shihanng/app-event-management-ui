import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface Props {
  token: string;
}

interface Event {
  name: string;
  uuid: string;
  location: string;
}

interface Data {
  events: Event[];
}

function listEvent(token: string) {
  const config = {
    headers: { Authorization: `Token ${token}` },
  };

  return async function (): Promise<Data> {
    const response = await axios.get("/events/", config);
    const events: Event[] = response.data.map((e: Event) => e);
    return { events };
  };
}

const Event: React.FC<Props> = ({ token }) => {
  const { data } = useQuery("events", listEvent(token));

  return data ? (
    <div>
      {data.events.map((d) => {
        return (
          <div key={d.uuid}>
            {d.name}, {d.location}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Event;
