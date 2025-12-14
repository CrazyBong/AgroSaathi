// Use globalThis to persist data across module reloads in development
const globalAny: any = globalThis
globalAny.__AGROSAATHI_PAYMENTS__ = globalAny.__AGROSAATHI_PAYMENTS__ || []

export const paidAuctions: string[] = globalAny.__AGROSAATHI_PAYMENTS__

export function markPaid(auctionId: string) {
  if (!paidAuctions.includes(auctionId)) {
    paidAuctions.push(auctionId)
  }
}

export function isPaid(auctionId: string) {
  return paidAuctions.includes(auctionId)
}