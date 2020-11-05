import { ColonyClient } from "@colony/colony-js";
import { BigNumber } from "ethers/utils";

import { formatBigNumber } from "../utils";

export const getAddressAndPotId = async (
  colonyClient: ColonyClient,
  fundingPotId: BigNumber
) => {
  const humanReadableFundingPotId = formatBigNumber(fundingPotId);

  const { associatedTypeId } = await colonyClient.getFundingPot(
    humanReadableFundingPotId
  );

  const { recipient } = await colonyClient.getPayment(associatedTypeId);

  return { userAddress: recipient, humanReadableFundingPotId };
};
