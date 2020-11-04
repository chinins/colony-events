import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
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

  const [loadedEvents, setLoadedEvents] = useState<readonly IEventLog[]>();

  useAsyncEffect(async () => {
    const events = await getEventLogs();
    console.log("Dashboard -> events", events);
    setEventLogs(events);
    setLoadedEvents(events.slice(0, 19));
  }, []);

  const loadMore = (page: number) => {
    setLoadedEvents(eventLogs?.slice(0, page * 20));
  };

  return eventLogs === undefined ? (
    <div className={styles.spinnerContainer}>
      <CircleLoader color={"rgba(62, 118, 244)"} />
    </div>
  ) : (
    <ul className={styles.dashboardList}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={eventLogs.length !== loadedEvents?.length}
      >
        {loadedEvents?.map((event, key) => (
          <EventListItem eventLog={event} key={key} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};
