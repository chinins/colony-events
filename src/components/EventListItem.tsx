import React from "react";
import Blockies from "react-blockies";

import { ColonyRole } from "@colony/colony-js";
import { utils } from "ethers";
import blockies from "blockies";

import { tokenMap } from "../colony/tokenMap";

import { IEventLog } from "./Dashboard";
import styles from "./styles.module.css";

console.log("ColonyRole", ColonyRole);

interface IEventListItemProps {
  readonly eventLog: IEventLog;
}

enum EventName {
  ColonyInitialised = "ColonyInitialised",
  ColonyRoleSet = "ColonyRoleSet",
  PayoutClaimed = "PayoutClaimed",
  DomainAdded = "DomainAdded",
}

const getTitle = (eventLog: IEventLog) => {
  switch (eventLog.name) {
    case EventName.ColonyInitialised:
      return (
        <p className={styles.overflowellipsis}>
          Congratulations! It's a beautiful baby colony!
        </p>
      );
    case EventName.ColonyRoleSet:
      const domain = new utils.BigNumber(eventLog.values.domainId).toString();
      return (
        <p className={styles.overflowellipsis}>
          <span className={styles.bold}>
            {ColonyRole[eventLog.values.role]}
          </span>{" "}
          role {eventLog.values.setTo ? "assigned to" : "revoked from"} user{" "}
          <span className={styles.bold}>{eventLog.values.user}</span> in domain{" "}
          <span className={styles.bold}>{domain}</span>
        </p>
      );
    case EventName.PayoutClaimed:
      return (
        <p className={styles.overflowellipsis}>
          User <span className={styles.bold}>{eventLog.userAddress}</span>{" "}
          claimed{" "}
          <span className={styles.bold}>
            {eventLog.formattedAmount}
            {tokenMap[eventLog.values.token]}
          </span>{" "}
          payout from pot{" "}
          <span className={styles.bold}>
            {eventLog.humanReadableFundingPotId}
          </span>
        </p>
      );
    case EventName.DomainAdded:
      const domainId = new utils.BigNumber(eventLog.values.domainId).toString();
      return (
        <p className={styles.overflowellipsis}>
          Domain <span className={styles.bold}>{domainId}</span> added
        </p>
      );
  }
};

export const EventListItem = ({ eventLog }: IEventListItemProps) => {
  const date = new Date(eventLog.logTime).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <li className={styles.eventListItem}>
      <Blockies
        seed={eventLog.userAddress || eventLog.values.user || eventLog.address}
        size={9}
        className={styles.avatar}
      />
      <div>
        {getTitle(eventLog)}
        <div className={styles.subtitle}>{date}</div>
      </div>
    </li>
  );
};
