import { getLogs } from "@colony/colony-js";
import { Log } from "ethers/providers";

import { EventName } from "../@config";
import { formatHexNumber } from "../utils";

import { getColonyClient } from "./getColonyClient";
import { getLogTime } from "./getLogTime";
import { getAddressAndPotId } from "./getAddressAndPotId";

export const getEventLogs = async () => {
  const colonyClient = await getColonyClient();

  const colonyInitialisedFilter = colonyClient.filters.ColonyInitialised(
    null,
    null
  );
  // @ts-ignore
  const colonyRoleSetFilter = colonyClient.filters.ColonyRoleSet();
  const payoutClaimedFilter = colonyClient.filters.PayoutClaimed(
    null,
    null,
    null
  );
  const domainAddedFilter = colonyClient.filters.DomainAdded(null);

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

  const formattedLogs = await Promise.all(
    parsedLogs.map(async (eventLog) => {
      const logTime = await getLogTime(eventLog.blockHash as string);

      if (eventLog.name === EventName.PayoutClaimed) {
        const additionalData = await getAddressAndPotId(
          colonyClient,
          eventLog.values.fundingPotId
        );

        const formattedAmount = formatHexNumber(eventLog.values.amount);

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

  return formattedLogs.sort((a, b) => b.logTime - a.logTime);
};
