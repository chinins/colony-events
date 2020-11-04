import { getBlockTime } from "@colony/colony-js";
import { InfuraProvider } from "ethers/providers";

export const getLogTime = async (blockHash: string) => {
  const provider = new InfuraProvider();

  return await getBlockTime(provider, blockHash);
};
