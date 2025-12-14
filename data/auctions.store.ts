import { Auction } from "@/core/types"

const g = globalThis as any

if (!g.__AUCTIONS__) {
  g.__AUCTIONS__ = []
}

export const auctions: Auction[] = g.__AUCTIONS__

export function addOrUpdateAuction(auction: Auction) {
  const index = auctions.findIndex(a => a.id === auction.id)
  if (index >= 0) {
    auctions[index] = auction
  } else {
    auctions.push(auction)
  }
}

export function getAuctionById(id: string) {
  return auctions.find(a => a.id === id)
}