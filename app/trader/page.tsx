"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TraderPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [trader, setTrader] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("trader");
    if (stored) {
      setTrader(JSON.parse(stored));
      // Redirect to auctions page if trader already exists
      router.push("/trader/auctions");
    }
  }, [router]);

  const handleContinue = () => {
    if (!name.trim()) return;
    
    const newTrader = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      name,
    };
    
    localStorage.setItem("trader", JSON.stringify(newTrader));
    setTrader(newTrader);
    router.push("/trader/auctions");
  };

  // If trader exists, redirect (handled by useEffect)
  if (trader) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Trader Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your name to continue
          </p>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="trader-name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="trader-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              />
            </div>
            
            <button
              onClick={handleContinue}
              disabled={!name.trim()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}