"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListCropPage() {
  const router = useRouter();
  const [farmer, setFarmer] = useState<{ id: string; name: string } | null>(null);
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mspPrice, setMspPrice] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("farmer");
    if (stored) {
      setFarmer(JSON.parse(stored));
    } else {
      // Redirect to farmer login if not logged in
      router.push("/farmer");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!farmer) {
      setError("Farmer not found. Please log in again.");
      return;
    }
    
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/crops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmerId: farmer.id,
          farmerName: farmer.name,
          cropType,
          quantity: Number(quantity),
          mspPrice: Number(mspPrice),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        // DEMO MODE: auto-redirect farmer to demo auction
        if (process.env.NODE_ENV === "development") {
          router.push("/farmer/auction/demo-auction-0");
        } else {
          // Redirect to farmer auction spectator page after 2 seconds
          setTimeout(() => {
            router.push(`/farmer/auction/${data.auction.id}`);
          }, 2000);
        }
      } else {
        setError(data.error || "Failed to list crop");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!farmer) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-xl font-bold mb-4">Loading...</h1>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            List New Crop
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Logged in as <b>{farmer.name}</b>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="cropType" className="block text-sm font-medium text-gray-700">
                Crop Type
              </label>
              <input
                id="cropType"
                name="cropType"
                type="text"
                required
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="e.g., Wheat, Rice, Corn"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity (kg)
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="e.g., 1000"
              />
            </div>
            <div>
              <label htmlFor="mspPrice" className="block text-sm font-medium text-gray-700">
                MSP Price (₹ per kg)
              </label>
              <input
                id="mspPrice"
                name="mspPrice"
                type="number"
                required
                value={mspPrice}
                onChange={(e) => setMspPrice(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="e.g., 2000"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? "Listing..." : "List Crop"}
            </button>
          </div>
        </form>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              <p>Error: {error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">
              <h3 className="font-medium">Crop Listed Successfully!</h3>
              <p>Crop ID: {result.crop.id}</p>
              <p>Auction ID: {result.auction.id}</p>
              <p>Crop Type: {result.crop.cropType}</p>
              <p>Quantity: {result.crop.quantity} kg</p>
              <p>MSP Price: ₹{result.crop.mspPrice}/kg</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}