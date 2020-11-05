import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { CircleLoader } from "react-spinners";
import useAsyncEffect from "use-async-effect";

import { getEventLogs } from "../colony/getEventLogs";

import { EventListItem } from "./EventListItem";
import styles from "./styles.module.css";
import { IEventLog } from "./types";

export const Dashboard = () => {
  const [eventLogs, setEventLogs] = useState<readonly IEventLog[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [loadedEvents, setLoadedEvents] = useState<readonly IEventLog[]>();

  useAsyncEffect(async () => {
    try {
      const events = await getEventLogs();
      setEventLogs(events);
      setLoadedEvents(events.slice(0, 19));
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Error fetching data:\n", error);
      setIsLoading(false);
    }
  }, []);

  const loadMore = (page: number) => {
    setLoadedEvents(eventLogs?.slice(0, page * 20));
  };

  return isLoading ? (
    <div className={styles.dashboardHelperContainer}>
      <CircleLoader color={"rgba(62, 118, 244)"} />
    </div>
  ) : eventLogs === undefined ? (
    <div className={styles.dashboardHelperContainer}>
      Error, please try again in 30 seconds
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
