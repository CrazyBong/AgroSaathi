import { createAuction, closeAuction } from "../core/auction"
import { Bid } from "../core/types"

const auction = createAuction("crop-1")

const bids: Bid[] = [
  { id: "b1", auctionId: auction.id, traderId: "t1", amount: 2100, timestamp: 1 },
  { id: "b2", auctionId: auction.id, traderId: "t2", amount: 2600, timestamp: 2 },
]

const closedAuction = closeAuction(auction, bids)

if (closedAuction.status !== "CLOSED") {
  throw new Error("FAIL: Auction not closed")
}

if (closedAuction.winningBidId !== "b2") {
  throw new Error("FAIL: Winning bid ID incorrect")
}

console.log("PASS: Auction closed with correct winner")