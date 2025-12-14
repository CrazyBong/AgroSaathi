"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function FarmerAuctionSpectatorPage() {
  const params = useParams();
  const auctionId = params.auctionId as string;
  
  const [auction, setAuction] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [farmer, setFarmer] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load farmer from localStorage
    const stored = localStorage.getItem("farmer");
    if (stored) {
      setFarmer(JSON.parse(stored));
    }
    
    // Poll for auction and bids updates
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/auctions?id=${auctionId}`);
        const data = await res.json();
        
        if (res.ok) {
          setAuction(data.auction);
          setBids(data.bids || []);
          setLoading(false);
        } else {
          setError(data.error || "Failed to fetch auction data");
          setLoading(false);
        }
      } catch (err) {
        setError("Network error occurred");
        setLoading(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Loading Auction...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Auction Not Found</h2>
            <p className="text-gray-700">The auction you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to calculate remaining time
  const getTimeRemaining = (endTime: number) => {
    const now = Date.now();
    const difference = endTime - now;
    return Math.max(0, Math.floor(difference / 1000));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Live Auction</h1>
          {typeof params.auctionId === 'string' && params.auctionId.startsWith("demo-") && (
            <p className="text-sm text-gray-500">
              Demo Auction (Simulated Live Bidding)
            </p>
          )}
          {farmer && (
            <p className="mt-2 text-sm text-gray-600">
              Watching as <b>{farmer.name}</b>
            </p>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Auction Details</h2>
          </div>
          
          {auction.farmerName && (
            <div className="mb-3">
              <p className="text-gray-700">
                <span className="font-medium">Farmer:</span> {auction.farmerName}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  auction.status === "OPEN" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {auction.status}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Auction ID:</span> {auction.id.slice(0, 8)}...
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Start Time:</span> {new Date(auction.startTime).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">End Time:</span> {new Date(auction.endTime).toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Countdown Timer Display */}
          {auction && auction.endTime && (
            <p className="mt-2 text-gray-700">
              <b>Auction ends in:</b>{" "}
              {getTimeRemaining(auction.endTime)}s
            </p>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="mt-4 font-bold text-gray-900">Live Bids</h3>
          
          {bids.length === 0 && <p className="text-gray-700">No bids yet</p>}
          
          {bids
            .sort((a, b) => b.amount - a.amount)
            .map((bid, index) => (
              <div
                key={bid.id}
                className={`p-2 border ${
                  index === 0 ? "bg-green-100 border-green-200" : "border-gray-200"
                }`}
              >
                <p className="text-gray-900">
                  <b>Bidder:</b> {bid.traderName}
                </p>
                <p className="text-gray-900">
                  <b>Amount:</b> ₹{bid.amount}
                </p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}