// Central crypto payment configuration.
// Update this file to change wallet address, network, or supported coin.
// (Admin-dashboard-editable version can be added later once Lovable Cloud
// storage for payment settings is enabled.)

export type CryptoPaymentConfig = {
  coin: string;           // e.g. "Tether (USDT)"
  coinSymbol: string;     // e.g. "USDT"
  network: string;        // e.g. "TRC20"
  walletAddress: string;
  instructions: string[];
  // Rough conversion rate. USDT is pegged 1:1 to USD, so 1 by default.
  usdToCoinRate: number;
};

export const CRYPTO_PAYMENT: CryptoPaymentConfig = {
  coin: "Tether (USDT)",
  coinSymbol: "USDT",
  network: "TRC20",
  walletAddress: "TXiJNmhpp5MNGWvAiFQCJHLnjRXCDmaYmM",
  usdToCoinRate: 1,
  instructions: [
    "Select the cryptocurrency payment option below.",
    "Copy the wallet address or scan the QR code with your wallet app.",
    "Send the exact payment amount shown for your selected product.",
    "Use the correct blockchain network (TRC20) — sending on the wrong network will result in loss of funds.",
    "After sending, submit your transaction hash below for verification.",
  ],
};

export function qrCodeUrl(data: string, size = 320): string {
  const encoded = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=${size}x${size}&margin=8&bgcolor=ffffff&color=0b1220`;
}
