import { Bid } from "@/core/types"

const g = globalThis as any

if (!g.__BIDS__) {
  g.__BIDS__ = []
}

export const bids: Bid[] = g.__BIDS__

export function addBid(bid: Bid) {
  bids.push(bid)
}

export function getBidsByAuctionId(auctionId: string) {
  return bids.filter(bid => bid.auctionId === auctionId)
}