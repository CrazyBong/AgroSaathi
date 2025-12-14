import { Auction, Bid } from "./types"
import { AUCTION_DURATION_MS } from "./constants"

// Simple ID generator as fallback
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function createAuction(cropId: string): Auction {
  const now = Date.now()
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : generateId(),
    cropId,
    startTime: now,
    endTime: now + AUCTION_DURATION_MS,
    status: "OPEN",
  }
}

export function isAuctionOpen(auction: Auction): boolean {
  return auction.status === "OPEN" && Date.now() < auction.endTime
}

export function closeAuction(
  auction: Auction,
  bids: Bid[]
): Auction {
  if (auction.status === "CLOSED") {
    return auction
  }

  if (bids.length === 0) {
    return {
      ...auction,
      status: "CLOSED",
    }
  }

  const winningBid = selectWinningBid(bids)

  return {
    ...auction,
    status: "CLOSED",
    winningBidId: winningBid.id,
  }
}

export function selectWinningBid(bids: Bid[]): Bid {
  if (bids.length === 0) {
    throw new Error("No bids to select from")
  }

  return bids.reduce((max, bid) =>
    bid.amount > max.amount ? bid : max
  )
}