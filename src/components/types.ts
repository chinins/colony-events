import { LogDescription } from "ethers/utils";

export interface IEventLog extends LogDescription {
  readonly logTime: number;
  readonly address?: string;
  readonly formattedAmount?: string;
  readonly userAddress?: string;
  readonly humanReadableFundingPotId?: string;
}
