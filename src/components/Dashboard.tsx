import React, { useState } from "react";
import { CircleLoader } from "react-spinners";
import useAsyncEffect from "use-async-effect";

import { Log } from "ethers/providers";

import { getEventLogs } from "../colony/getEventLogs";

import styles from "./styles.module.css";
import { EventListItem } from "./EventListItem";

export interface IEventLog extends Log {
  readonly name: string;
  readonly signature: string;
  readonly topic: string;
  readonly decode: (data: string, topics: Array<string>) => any;
  readonly values: any;
  readonly logTime: number;
  readonly formattedAmount?: string;
  readonly userAddress?: string;
  readonly humanReadableFundingPotId?: string;
}

export const Dashboard = () => {
  const [eventLogs, setEventLogs] = useState<readonly IEventLog[]>();
  console.log("Dashboard -> eventLogs", eventLogs);

  useAsyncEffect(async () => {
    const events = await getEventLogs();
    console.log("Dashboard -> events", events);
    setEventLogs(events);
  }, []);

  return eventLogs === undefined ? (
    <div className={styles.spinnerContainer}>
      <CircleLoader color={"rgba(62, 118, 244)"} />
    </div>
  ) : (
    <ul className={styles.dashboardList}>
      {eventLogs?.slice(0, 150).map((event, key) => (
        <EventListItem eventLog={event} key={key} />
      ))}
    </ul>
  );
};
