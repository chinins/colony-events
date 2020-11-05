import { utils } from "ethers";
import { BigNumber } from "ethers/utils";

export const formatBigNumber = (bigNumber: BigNumber) =>
  new utils.BigNumber(bigNumber).toString();
