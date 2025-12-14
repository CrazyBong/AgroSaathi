import { seedDemoAuctions } from "@/data/demo.seed"
import { auctions } from "@/data/auctions.store"
import { bids } from "@/data/bids.store"
import { crops } from "@/data/crops.store"
import { getAuctionById, addOrUpdateAuction } from "@/data/auctions.store"
import { getBidsByAuctionId } from "@/data/bids.store"
import { closeAuction } from "@/core/auction"
import { simulateBids } from "@/data/demo.bids"
import { autoCloseAuctions } from "@/data/demo.scheduler"

const g = globalThis as any
if (!g.__DEMO_SEEDED__) {
  seedDemoAuctions()
  g.__DEMO_SEEDED__ = true
}

// Run demo engine every 3 seconds
setInterval(() => {
  try {
    simulateBids()
    autoCloseAuctions()
  } catch (error) {
    console.error("Demo engine error:", error)
  }
}, 3000)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  // 🔹 Single auction view
  if (id) {
    const auction = auctions.find(a => a.id === id)
    const auctionBids = bids.filter(b => b.auctionId === id)
    return Response.json({ auction, bids: auctionBids })
  }

  // 🔹 Live auction feed
  const now = Date.now()
  const liveAuctions = auctions
    .filter(a => a.status === "OPEN")
    .filter(a => now - a.startTime < 2 * 60 * 1000) // only recent ones
    .map(a => {
      const crop = crops.find(c => c.id === a.cropId)
      const auctionBids = bids.filter(b => b.auctionId === a.id)

      return {
        auctionId: a.id,
        status: a.status,
        cropType: crop?.cropType,
        quantity: crop?.quantity,
        mspPrice: crop?.mspPrice,
        farmerName: crop?.farmerName,
        highestBid: auctionBids.length
          ? Math.max(...auctionBids.map(b => b.amount))
          : null,
        bidCount: auctionBids.length,
        endsAt: a.endTime, // Add end time for countdown display
      }
    })

  return Response.json({ auctions: liveAuctions })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { auctionId } = body

  const auction = getAuctionById(auctionId)
  if (!auction) {
    return Response.json({ error: "Auction not found" }, { status: 404 })
  }

  const auctionBids = getBidsByAuctionId(auctionId)
  const closedAuction = closeAuction(auction, auctionBids)

  addOrUpdateAuction(closedAuction)

  return Response.json({ auction: closedAuction })
}