import React from "react";

import { ColonyRole } from "@colony/colony-js";

import { EventName, tokenMap } from "../@config";
import { formatBigNumber } from "../utils";

import styles from "./styles.module.css";
import { IEventLog } from "./types";

export const EventTitle = ({ eventLog }: { eventLog: IEventLog }) => {
  const {
    name,
    userAddress,
    formattedAmount,
    humanReadableFundingPotId,
    values: { role, user, domainId, setTo, token },
  } = eventLog;

  const { overflowEllipsis, fontWeightBold } = styles;

  switch (name) {
    case EventName.ColonyInitialised:
      return (
        <p className={overflowEllipsis}>
          Congratulations! It's a beautiful baby colony!
        </p>
      );
    case EventName.ColonyRoleSet:
      return (
        <p className={overflowEllipsis}>
          <span className={fontWeightBold}>{ColonyRole[role]}</span> role{" "}
          {setTo ? "assigned to" : "revoked from"} user{" "}
          <span className={fontWeightBold}>{user}</span> in domain{" "}
          <span className={fontWeightBold}>{formatBigNumber(domainId)}</span>
        </p>
      );
    case EventName.PayoutClaimed:
      return (
        <p className={overflowEllipsis}>
          User <span className={fontWeightBold}>{userAddress}</span> claimed{" "}
          <span className={fontWeightBold}>
            {formattedAmount}
            {tokenMap[token]}
          </span>{" "}
          payout from pot{" "}
          <span className={fontWeightBold}>{humanReadableFundingPotId}</span>
        </p>
      );
    case EventName.DomainAdded:
      return (
        <p className={overflowEllipsis}>
          Domain{" "}
          <span className={fontWeightBold}>{formatBigNumber(domainId)}</span>{" "}
          added
        </p>
      );
    default:
      return null;
  }
};
