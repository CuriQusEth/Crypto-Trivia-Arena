import { toHex } from 'viem';

/**
 * ERC-8021 Transaction Attribution
 * Placeholder implementation for Base Mainnet.
 */

export interface AttributionConfig {
  attributionCode: string;
  builderCode: string;
}

export const DEFAULT_ATTRIBUTION: AttributionConfig = {
  attributionCode: "[ATTRIBUTION_CODE]",
  builderCode: "bc_ekv5luad" // Provided by user
};

export function getAttributionData(customConfig?: Partial<AttributionConfig>): string {
  const config = { ...DEFAULT_ATTRIBUTION, ...customConfig };
  // In a real implementation, this would encode the attribution payload for the transaction.
  // For demonstration, we simply return a hex string representation.
  const hexPart = toHex(config.builderCode).replace('0x', '');
  return `0x0000000000000000000000000000000000000000000000000000000000000000${hexPart}`;
}
