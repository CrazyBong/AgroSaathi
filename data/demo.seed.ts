import { addCrop } from "./crops.store"
import { addOrUpdateAuction } from "./auctions.store"
import { createAuction } from "@/core/auction"

// Simple ID generator as fallback
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function seedDemoAuctions() {
  const demoFarmers = [
    { name: "Rahul", crop: "Wheat", qty: 500, msp: 2100 },
    { name: "Amit", crop: "Rice", qty: 800, msp: 1800 },
    { name: "Suresh", crop: "Maize", qty: 600, msp: 1700 },
  ]

  demoFarmers.forEach((f, i) => {
    const cropId = `demo-crop-${i}`
    const auctionId = `demo-auction-${i}`

    addCrop({
      id: cropId,
      farmerId: `farmer-${i}`,
      cropType: f.crop,
      quantity: f.qty,
      mspPrice: f.msp,
      farmerName: f.name,
    })

    // Create auction with a known ID
    const now = Date.now()
    const auction = {
      id: auctionId,
      cropId: cropId,
      startTime: now,
      endTime: now + 60000, // 60 seconds from now
      status: "OPEN" as const,
    }
    
    addOrUpdateAuction(auction)
  })
}