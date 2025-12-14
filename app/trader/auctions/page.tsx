"use client";

import { useState, useEffect } from "react";

export default function TraderAuctionsPage() {
  const [trader, setTrader] = useState<{ id: string; name: string } | null>(null);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<any | null>(null);
  const [amount, setAmount] = useState("");
  const [placeBidResult, setPlaceBidResult] = useState<any>(null);
  const [closeAuctionResult, setCloseAuctionResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("trader");
    if (stored) {
      setTrader(JSON.parse(stored));
    }
  }, []);

  // Fetch live auctions automatically
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/auctions");
        const data = await res.json();
        setAuctions(data.auctions || []);
      } catch (err) {
        console.error("Failed to fetch auctions:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePlaceBid = async () => {
    if (!trader || !selectedAuction || !amount) {
      setError("Missing required information");
      return;
    }
    
    setLoading(true);
    setError("");
    setPlaceBidResult(null);

    try {
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auctionId: selectedAuction.auctionId,
          traderId: trader.id,
          traderName: trader.name,
          amount: Number(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPlaceBidResult(data);
        setAmount(""); // Clear the amount field after successful bid
      } else {
        setError(data.error || "Failed to place bid");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAuction = async () => {
    if (!selectedAuction) {
      setError("No auction selected");
      return;
    }
    
    setLoading(true);
    setError("");
    setCloseAuctionResult(null);

    try {
      const response = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auctionId: selectedAuction.auctionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCloseAuctionResult(data);
        // Refresh the auctions list
        const res = await fetch("/api/auctions");
        const auctionData = await res.json();
        setAuctions(auctionData.auctions || []);
      } else {
        setError(data.error || "Failed to close auction");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!trader) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-xl font-bold mb-4">Trader Session Expired</h1>
            <p className="text-gray-600 mb-4">Please go back and log in again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Trader Auctions
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Logged in as <b>{trader.name}</b> ({trader.id.slice(0, 8)}...)
          </div>
        </div>

        {/* Live Auction Feed */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Live Crop Auctions</h2>

          {auctions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No live auctions available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auctions.map(a => (
                <div
                  key={a.auctionId}
                  className={`border rounded-lg p-4 shadow cursor-pointer transition-all ${
                    selectedAuction?.auctionId === a.auctionId
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setSelectedAuction(a)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{a.cropType}</p>
                      <p className="text-sm text-gray-600">
                        <b>Farmer:</b> {a.farmerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <b>Quantity:</b> {a.quantity} kg
                      </p>
                      <p className="text-sm text-gray-600">
                        <b>MSP:</b> ₹{a.mspPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        a.status === "OPEN" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {a.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        <b>Highest:</b> ₹{a.highestBid ?? "No bids"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <b>Bids:</b> {a.bidCount}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAuction(a);
                    }}
                    className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Place Bid
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Auction Actions */}
        {selectedAuction && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Bidding on {selectedAuction.cropType} (Farmer: {selectedAuction.farmerName})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Place Bid Form */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Place Bid</h4>
                <div className="flex">
                  <input
                    type="number"
                    placeholder="Enter bid amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                  <button
                    onClick={handlePlaceBid}
                    disabled={loading}
                    className="relative -ml-px inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Bid"}
                  </button>
                </div>
              </div>

              {/* Close Auction Form */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Close Auction</h4>
                <button
                  onClick={handleCloseAuction}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {loading ? "Closing..." : "Close Auction"}
                </button>
              </div>
            </div>

            {/* Results and Errors */}
            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  <p>Error: {error}</p>
                </div>
              </div>
            )}

            {placeBidResult && (
              <div className="mt-4 rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">
                  <h3 className="font-medium">Bid Placed Successfully!</h3>
                  <p>Bid ID: {placeBidResult.bid.id}</p>
                  <p>Amount: ₹{placeBidResult.bid.amount}/kg</p>
                </div>
              </div>
            )}

            {closeAuctionResult && (
              <div className="mt-4 rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">
                  <h3 className="font-medium">Auction Closed Successfully!</h3>
                  <p>Status: {closeAuctionResult.auction.status}</p>
                  {closeAuctionResult.auction.winningBidId && (
                    <p>Winning Bid ID: {closeAuctionResult.auction.winningBidId}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}