export type Crop = {
  id: string
  farmerId: string
  farmerName?: string
  cropType: string
  quantity: number
  mspPrice: number
}

export type AuctionStatus = "OPEN" | "CLOSED"

export type Auction = {
  id: string
  cropId: string
  startTime: number
  endTime: number
  status: AuctionStatus
  winningBidId?: string
}

export type Bid = {
  id: string
  auctionId: string
  traderId: string
  traderName?: string
  amount: number
  timestamp: number
}