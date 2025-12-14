import { bids, addBid } from "./bids.store"
import { auctions, addOrUpdateAuction } from "./auctions.store"
import { getBidsByAuctionId } from "./bids.store"

const demoTraders = ["Shiv", "Rohan", "Vikas", "Neeraj"]

export function simulateBids() {
  auctions
    .filter(a => a.status === "OPEN" && a.id.startsWith("demo-"))
    .forEach(auction => {
      const auctionBids = getBidsByAuctionId(auction.id)

      if (auctionBids.length >= 4) return

      // Get the crop associated with this auction to check MSP
      const allCrops = (globalThis as any).__CROPS__ || []
      const crop = allCrops.find((c: any) => c.id === auction.cropId)
      if (!crop) return

      const basePrice = crop.mspPrice
      const currentHighest = auctionBids.length > 0 
        ? Math.max(...auctionBids.map(b => b.amount)) 
        : basePrice
      
      // Increase by 5-15% or at least 50 rupees
      const increment = Math.max(50, Math.floor(currentHighest * (0.05 + Math.random() * 0.1)))
      const amount = currentHighest + increment

      const traderIndex = auctionBids.length % demoTraders.length
      const traderName = demoTraders[traderIndex]

      const bid = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
        auctionId: auction.id,
        traderId: traderName.toLowerCase(),
        traderName,
        amount,
        timestamp: Date.now(),
      }

      addBid(bid)

      // Reset auction timer
      const updatedAuction = {
        ...auction,
        endTime: Date.now() + 10000 // Reset to 10 seconds from now
      }
      
      addOrUpdateAuction(updatedAuction)
    })
}