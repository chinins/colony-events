import { ColonyClient } from "@colony/colony-js";
import { utils } from "ethers";

export const getUserAddress = async (
  colonyClient: ColonyClient,
  fundingPotId: any
) => {
  const humanReadableFundingPotId = new utils.BigNumber(
    fundingPotId
  ).toString();

  const { associatedTypeId } = await colonyClient.getFundingPot(
    humanReadableFundingPotId
  );

  const { recipient } = await colonyClient.getPayment(associatedTypeId);
  return { userAddress: recipient, humanReadableFundingPotId };
};
