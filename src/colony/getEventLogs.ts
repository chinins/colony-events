import { getLogs } from "@colony/colony-js";
import { Log } from "ethers/providers";

import { getColonyClient } from "./getColonyClient";
import { getFormattedAmount } from "./getFormattedAmount";
import { getLogTime } from "./getLogTime";
import { getUserAddress } from "./getUserAddress";

export const getEventLogs = async () => {
  const colonyClient = await getColonyClient();
  console.log("colonyClient", colonyClient);

  // @ts-ignore
  const colonyInitialisedFilter = colonyClient.filters.ColonyInitialised();
  // @ts-ignore
  const colonyRoleSetFilter = colonyClient.filters.ColonyRoleSet();
  // @ts-ignore
  const payoutClaimedFilter = colonyClient.filters.PayoutClaimed();
  // @ts-ignore
  const domainAddedFilter = colonyClient.filters.DomainAdded();

  const colonyInitialisedLogs = await getLogs(
    colonyClient,
    colonyInitialisedFilter
  );
  const colonyRoleSetLogs = await getLogs(colonyClient, colonyRoleSetFilter);
  const payoutClaimedLogs = await getLogs(colonyClient, payoutClaimedFilter);
  const domainAddedLogs = await getLogs(colonyClient, domainAddedFilter);

  const combinedEventLogs: readonly Log[] = [
    ...colonyInitialisedLogs,
    ...colonyRoleSetLogs,
    ...payoutClaimedLogs,
    ...domainAddedLogs,
  ];
  const parsedLogs = combinedEventLogs.map((event) => ({
    ...event,
    ...colonyClient.interface.parseLog(event),
  }));
  // console.log("parsedLogs", parsedLogs);

  const logs = await Promise.all(
    parsedLogs.map(async (eventLog) => {
      const logTime = await getLogTime(eventLog.blockHash as string);

      if (eventLog.name === "PayoutClaimed") {
        const additionalData = await getUserAddress(
          colonyClient,
          eventLog.values.fundingPotId
        );

        const formattedAmount = getFormattedAmount(eventLog.values.amount);

        return {
          ...eventLog,
          ...additionalData,
          formattedAmount,
          logTime,
        };
      } else {
        return { ...eventLog, logTime };
      }
    })
  );

  const sortedLogs = logs.sort((a, b) => b.logTime - a.logTime);

  // console.log("logs", logs);
  // console.log("sortedLogs", sortedLogs);
  return sortedLogs;
};
