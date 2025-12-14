import { addCrop } from "@/data/crops.store"
import { addOrUpdateAuction } from "@/data/auctions.store"
import { createAuction } from "@/core/auction"

// Simple ID generator as fallback
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function POST(req: Request) {
  const body = await req.json()

  const crop = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : generateId(),
    farmerId: body.farmerId,
    farmerName: body.farmerName,
    cropType: body.cropType,
    quantity: body.quantity,
    mspPrice: body.mspPrice,
  }

  const auction = createAuction(crop.id)

  addCrop(crop)
  addOrUpdateAuction(auction)

  return Response.json({ crop, auction })
}