import { assertBidAboveMSP } from "@/core/msp"
import { getAuctionById } from "@/data/auctions.store"
import { getCropById } from "@/data/crops.store"
import { addBid } from "@/data/bids.store"

// Simple ID generator as fallback
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function POST(req: Request) {
  const body = await req.json()

  const auction = getAuctionById(body.auctionId)
  if (!auction) {
    return Response.json({ error: "Auction not found" }, { status: 404 })
  }

  const crop = getCropById(auction.cropId)
  if (!crop) {
    return Response.json({ error: "Crop not found" }, { status: 404 })
  }

  try {
    assertBidAboveMSP(body.amount, crop.mspPrice)
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 })
  }

  const bid = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : generateId(),
    auctionId: body.auctionId,
    traderId: body.traderId,
    traderName: body.traderName,
    amount: body.amount,
    timestamp: Date.now(),
  }

  addBid(bid)

  return Response.json({ bid })
}