import { auctions } from "@/data/auctions.store"
import { bids } from "@/data/bids.store"
import { crops } from "@/data/crops.store"
import { getAuctionById, addOrUpdateAuction } from "@/data/auctions.store"
import { getBidsByAuctionId } from "@/data/bids.store"
import { closeAuction } from "@/core/auction"

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
  const liveAuctions = auctions
    .filter(a => a.status === "OPEN")
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
      }
    })

  return Response.json({ auctions: liveAuctions })
}

export async function POST(req: Request) {
  const body = await req.json()

  const auction = getAuctionById(body.auctionId)
  if (!auction) {
    return Response.json({ error: "Auction not found" }, { status: 404 })
  }

  const bids = getBidsByAuctionId(auction.id)
  const closedAuction = closeAuction(auction, bids)

  addOrUpdateAuction(closedAuction)

  return Response.json({ auction: closedAuction })
}