import { auctions, addOrUpdateAuction } from "./auctions.store"
import { getBidsByAuctionId } from "./bids.store"
import { closeAuction } from "@/core/auction"

export function autoCloseAuctions() {
  const now = Date.now()
  
  auctions
    .filter(a => a.status === "OPEN" && now > a.endTime)
    .forEach(a => {
      const auctionBids = getBidsByAuctionId(a.id)
      const closed = closeAuction(a, auctionBids)
      addOrUpdateAuction(closed)
    })
}