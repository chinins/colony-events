import React from "react";
import Blockies from "react-blockies";

import blockies from "blockies";

import { formatDate } from "../utils";

import { EventTitle } from "./EventTitle";
import styles from "./styles.module.css";
import { IEventLog } from "./types";

export const EventListItem = ({ eventLog }: { eventLog: IEventLog }) => {
  return (
    <li className={styles.eventListItem}>
      <Blockies
        seed={eventLog.userAddress || eventLog.values.user || eventLog.address}
        size={9}
        className={styles.avatar}
      />
      <div>
        <EventTitle eventLog={eventLog} />
        <div className={styles.subtitle}>{formatDate(eventLog.logTime)}</div>
      </div>
    </li>
  );
};
