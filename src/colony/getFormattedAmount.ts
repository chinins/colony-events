import { utils } from "ethers";

export const getFormattedAmount = (hexNumber: string) => {
  const wei = new utils.BigNumber(10);
  return new utils.BigNumber(hexNumber).div(wei.pow(18)).toString();
};
