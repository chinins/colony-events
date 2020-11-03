import React from "react";

import styles from "./styles.module.css";
import { EventListItem } from "./EventListItem";

const faker = ["boo", "foo", "bar"];

export const Dashboard = () => {
  return (
    <ul className={styles.dashboardList}>
      {faker.map((event, key) => (
        <EventListItem event={event} key={key} />
      ))}
    </ul>
  );
};
