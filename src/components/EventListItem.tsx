import React from "react";

import styles from "./styles.module.css";

interface IEventListItemProps {
  readonly event: string;
}

export const EventListItem = (props: IEventListItemProps) => {
  return (
    <li className={styles.eventListItem}>
      <div className={styles.avatar}>avatar</div>
      <div>
        <div className={styles.title}>{props.event}</div>
        <div className={styles.subtitle}>{props.event}</div>
      </div>
    </li>
  );
};
