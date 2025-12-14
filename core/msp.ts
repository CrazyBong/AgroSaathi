export function isBidAboveMSP(
  bidAmount: number,
  mspPrice: number
): boolean {
  return bidAmount >= mspPrice
}

export function assertBidAboveMSP(
  bidAmount: number,
  mspPrice: number
): void {
  if (bidAmount < mspPrice) {
    throw new Error("Bid amount is below MSP")
  }
}