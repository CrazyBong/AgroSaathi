import { getAuctionById } from "@/data/auctions.store"
import { markPaid } from "@/data/payments.store"

export async function POST(req: Request) {
  const body = await req.json()

  const auction = getAuctionById(body.auctionId)
  if (!auction || auction.status !== "CLOSED") {
    return Response.json({ error: "Auction closed" }, { status: 400 })
  }

  markPaid(auction.id)

  return Response.json({ success: true })
}