import { selectWinningBid } from "../core/auction"
import { Bid } from "../core/types"

const bids: Bid[] = [
  { id: "1", auctionId: "a1", traderId: "t1", amount: 2200, timestamp: 1 },
  { id: "2", auctionId: "a1", traderId: "t2", amount: 2500, timestamp: 2 },
  { id: "3", auctionId: "a1", traderId: "t3", amount: 2400, timestamp: 3 },
]

const winner = selectWinningBid(bids)

if (winner.amount !== 2500) {
  throw new Error("FAIL: Incorrect winning bid selected")
}

console.log("PASS: Highest bid selected correctly")