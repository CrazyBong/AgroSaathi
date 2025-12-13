"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Clock,
  MapPin,
  Plus,
  Search,
  Eye,
  Gavel,
  CheckCircle,
  DollarSign,
  Wheat,
  Leaf,
  Target,
  Award,
  Activity,
  Home,
  Calendar,
  Star,
  AlertCircle,
  Trophy,
  Timer,
  X,
  ArrowRight,
  Shield,
  Sparkles,
  Bell,
  MessageCircle,
  Cloud,
  Sun,
  CloudRain,
  Brain,
  TrendingDown,
  Filter,
  Globe,
  Phone,
  Video,
  RefreshCw,
  Wifi,
} from "lucide-react"

export default function AgroSaathiPlatform() {
  const [currentView, setCurrentView] = useState<"role-selection" | "farmer-dashboard" | "trader-dashboard">(
    "role-selection",
  )
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showMSPPrices, setShowMSPPrices] = useState(false)
  const [showAuctionDetail, setShowAuctionDetail] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMarketInsights, setShowMarketInsights] = useState(false)
  const [showWeatherWidget, setShowWeatherWidget] = useState(false)
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month")
  const [bidAmount, setBidAmount] = useState("")
  const [isPlacingBid, setIsPlacingBid] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [filterBy, setFilterBy] = useState("all")
  const [language, setLanguage] = useState("en")
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(3)

  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 }
        }
        return prev
      })
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "bid",
        title: "New bid on your Premium Wheat",
        message: "Gujarat Traders Ltd. placed a bid of ₹2450/kg",
        time: "2 mins ago",
        read: false,
      },
      {
        id: 2,
        type: "weather",
        title: "Weather Alert",
        message: "Rain expected in Punjab region - may affect crop prices",
        time: "1 hour ago",
        read: false,
      },
      {
        id: 3,
        type: "market",
        title: "Market Insight",
        message: "Wheat prices trending up by 8% this week",
        time: "3 hours ago",
        read: false,
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  // Mock data with enhanced features
  const mspPrices = [
    { crop: "Wheat", season: "Rabi 2024-25", price: "₹22.75/kg", status: "Govt. assured", trend: "+2.3%" },
    { crop: "Barley", season: "Rabi 2024-25", price: "₹18.50/kg", status: "Govt. assured", trend: "+1.8%" },
    { crop: "Gram", season: "Rabi 2024-25", price: "₹54.40/kg", status: "Govt. assured", trend: "+5.2%" },
    { crop: "Rice", season: "Kharif 2023-24", price: "₹21.83/kg", status: "Govt. assured", trend: "-0.5%" },
    { crop: "Corn", season: "Kharif 2023-24", price: "₹20.90/kg", status: "Govt. assured", trend: "+3.1%" },
    { crop: "Arhar", season: "Kharif 2023-24", price: "₹70.00/kg", status: "Govt. assured", trend: "+7.8%" },
    { crop: "Moong", season: "Kharif 2023-24", price: "₹85.58/kg", status: "Govt. assured", trend: "+4.5%" },
    { crop: "Soybean", season: "Kharif 2023-24", price: "₹46.00/kg", status: "Govt. assured", trend: "+2.9%" },
    { crop: "Cotton", season: "Kharif 2023-24", price: "₹66.20/kg", status: "Govt. assured", trend: "+6.3%" },
    { crop: "Sugarcane", season: "Other", price: "₹3.15/kg", status: "Govt. assured", trend: "+1.2%" },
  ]

  const liveAuctions = [
    {
      id: 1,
      crop: "Premium Wheat",
      quantity: "5000kg",
      location: "Punjab, India",
      grade: "A",
      currentBid: "₹2450",
      mspPrice: "₹2125/kg",
      reservePrice: "₹2200/kg",
      premium: "+₹325",
      timeLeft: `${timeLeft.days} days, ${timeLeft.hours} hours`,
      totalBids: 18,
      leadingBidder: "Green Valley Trading",
      image: "/golden-wheat-grains.png",
      status: "active",
      harvestDate: "2024-03-15",
      description:
        "High-quality wheat harvested from organic farms with excellent storage conditions. Grade A certified with moisture content below 12%.",
      storageConditions: "Climate-controlled warehouse, pest-free environment",
      aiQualityScore: 94,
      weatherImpact: "positive",
      predictedPrice: "₹2580",
      confidence: 87,
      farmer: {
        name: "Rajesh Kumar",
        location: "Punjab",
        rating: 4.8,
        totalSales: 156,
        verified: true,
        avatar: "/indian-farmer.png",
      },
      bidHistory: [
        { bidder: "Green Valley Trading", amount: "₹2450", time: "2 mins ago" },
        { bidder: "AgriTrade Corp", amount: "₹2400", time: "5 mins ago" },
        { bidder: "Gujarat Traders Ltd.", amount: "₹2350", time: "12 mins ago" },
      ],
    },
    {
      id: 2,
      crop: "Organic Rice",
      quantity: "300kg",
      location: "Punjab",
      grade: "A",
      currentBid: "₹2200",
      mspPrice: "₹2060/kg",
      premium: "+₹140",
      timeLeft: "5 days, 8 hours",
      totalBids: 12,
      leadingBidder: "AgriTrade Corp",
      image: "/white-rice-grains.png",
      status: "active",
      aiQualityScore: 91,
      weatherImpact: "neutral",
      predictedPrice: "₹2280",
      confidence: 82,
    },
    {
      id: 3,
      crop: "Yellow Corn",
      quantity: "750kg",
      location: "Punjab",
      grade: "B",
      currentBid: "₹2090",
      mspPrice: "₹2090/kg",
      premium: "+₹0",
      timeLeft: "0h 43m",
      totalBids: 3,
      leadingBidder: "Gujarat Traders Ltd.",
      image: "/yellow-corn-kernels.png",
      status: "active",
      aiQualityScore: 78,
      weatherImpact: "negative",
      predictedPrice: "₹2050",
      confidence: 75,
    },
  ]

  const myActiveBids = [
    {
      id: 1,
      crop: "Premium Wheat - 500kg",
      location: "Punjab",
      timeLeft: "2 days",
      myBid: "₹24.50/kg",
      status: "outbid",
      message: "You have been outbid",
      currentHighest: "₹25.20/kg",
      nextMinBid: "₹25.25/kg",
    },
    {
      id: 2,
      crop: "Organic Rice - 300kg",
      location: "Haryana",
      timeLeft: "5 days",
      myBid: "₹22.00/kg",
      status: "winning",
      message: "You are the highest bidder!",
      leadMargin: "₹1.50/kg",
    },
    {
      id: 3,
      crop: "Moong Dal - 200kg",
      location: "Rajasthan",
      timeLeft: "0 days",
      myBid: "₹72.00/kg",
      status: "won",
      message: "Auction completed successfully! Payment processing.",
      finalPrice: "₹72.00/kg",
      totalAmount: "₹14,400",
    },
  ]

  const farmerStats = {
    totalCropsListed: 12,
    activeAuctions: 5,
    totalEarnings: "₹2,45,000",
    mspGuarantee: "100% Protected",
  }

  const traderStats = {
    totalBids: 3,
    activeBids: 0,
    wonAuctions: 1,
    totalInvested: "₹NaNK",
  }

  const weatherData = {
    location: "Punjab, India",
    temperature: "28°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    rainfall: "12mm",
    forecast: [
      { day: "Today", temp: "28°C", condition: "sunny", impact: "positive" },
      { day: "Tomorrow", temp: "26°C", condition: "cloudy", impact: "neutral" },
      { day: "Day 3", temp: "24°C", condition: "rainy", impact: "negative" },
    ],
  }

  const marketInsights = {
    trending: [
      { crop: "Wheat", change: "+8.2%", reason: "High demand from export markets" },
      { crop: "Rice", change: "+5.1%", reason: "Favorable weather conditions" },
      { crop: "Corn", change: "-2.3%", reason: "Oversupply in local markets" },
    ],
    predictions: [
      { crop: "Wheat", nextWeek: "+3-5%", confidence: 87, factors: ["Export demand", "Weather"] },
      { crop: "Rice", nextWeek: "+2-4%", confidence: 82, factors: ["Seasonal demand", "Quality"] },
    ],
  }

  const RoleSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full space-y-8 text-center relative z-10">
        <div className="space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Wheat className="w-12 h-12 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent mb-3">
              Welcome to AgroSaathi
            </h1>
            <p className="text-lg text-green-700 font-medium">Ensuring fair prices through MSP-backed auctions</p>
            <div className="flex items-center justify-center mt-2 space-x-2">
              <Brain className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-600 font-medium">AI-Powered • Real-time • Secure</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Choose Your Role</h2>

          <Card
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-green-200 hover:border-green-400 transform hover:-translate-y-1 bg-gradient-to-br from-white to-green-50 group"
            onClick={() => setCurrentView("farmer-dashboard")}
          >
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Wheat className="w-8 h-8 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-green-800 mb-1">Login as Farmer</h3>
                  <p className="text-green-600 mb-3">List crops & get fair prices guaranteed by MSP</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 border-green-300">MSP Protected</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">AI Insights</Badge>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-green-600 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 transform hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50 group"
            onClick={() => setCurrentView("trader-dashboard")}
          >
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-blue-800 mb-1">Login as Trader</h3>
                  <p className="text-blue-600 mb-3">Bid on quality crops from verified farmers</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">Verified</Badge>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">Smart Bidding</Badge>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Button variant="link" className="text-blue-600 hover:text-blue-800 font-medium">
              <Shield className="w-4 h-4 mr-2" />
              MSP Guarantee Policy
            </Button>
            <Button variant="link" className="text-green-600 hover:text-green-800 font-medium">
              <Globe className="w-4 h-4 mr-2" />
              हिंदी
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Wifi className="w-4 h-4 text-green-500" />
              <span>Real-time</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const Header = ({ userType }: { userType: "farmer" | "trader" }) => (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("role-selection")}
            className="hover:bg-green-100 text-green-700 transition-all duration-200"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <Wheat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AgroSaathi</h1>
              <p className="text-sm text-gray-600">MSP-Ensured Auction Platform</p>
            </div>
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          <Button variant="ghost" className="hover:bg-green-50 text-green-700">
            Live Auctions
          </Button>
          <Button variant="ghost" className="hover:bg-green-50 text-green-700">
            My Crops
          </Button>
          <Button variant="ghost" onClick={() => setShowAnalytics(true)} className="hover:bg-green-50 text-green-700">
            Analytics
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowMarketInsights(true)}
            className="hover:bg-blue-50 text-blue-700"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWeatherWidget(true)}
            className="hover:bg-blue-50 text-blue-600"
          >
            <Sun className="w-4 h-4 mr-1" />
            28°C
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(true)}
              className="hover:bg-orange-50 text-orange-600 relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{unreadCount}</span>
                </div>
              )}
            </Button>
          </div>

          <Avatar className="ring-2 ring-green-200">
            <AvatarFallback className="bg-green-100 text-green-800 font-semibold">
              {userType === "farmer" ? "KT" : "GT"}
            </AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              {userType === "farmer" ? "Khushi Thakur" : "Gujarat Traders Ltd."}
            </p>
            <Badge
              variant="secondary"
              className={`${userType === "farmer" ? "bg-green-100 text-green-800 border-green-300" : "bg-blue-100 text-blue-800 border-blue-300"} font-medium`}
            >
              {userType === "farmer" ? "Premium Farmer" : "Premium Trader"}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )

  const StatsCards = ({ stats, userType }: { stats: any; userType: "farmer" | "trader" }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {userType === "farmer" ? (
        <>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Crops Listed</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalCropsListed}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+2 this week</span>
                  </div>
                </div>
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Auctions</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.activeAuctions}</p>
                  <div className="flex items-center mt-1">
                    <Activity className="w-3 h-3 text-orange-500 mr-1" />
                    <span className="text-xs text-orange-600">High activity</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalEarnings}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+12% this month</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">MSP Guarantee</p>
                  <p className="text-lg font-bold text-green-600">{stats.mspGuarantee}</p>
                  <div className="flex items-center mt-1">
                    <Shield className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">Fully secured</span>
                  </div>
                </div>
                <Award className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bids</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalBids}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-blue-500 mr-1" />
                    <span className="text-xs text-blue-600">+1 today</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bids</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.activeBids}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="w-3 h-3 text-orange-500 mr-1" />
                    <span className="text-xs text-orange-600">1 ending soon</span>
                  </div>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Won Auctions</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.wonAuctions}</p>
                  <div className="flex items-center mt-1">
                    <Trophy className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">100% success</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Invested</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalInvested}</p>
                  <div className="flex items-center mt-1">
                    <DollarSign className="w-3 h-3 text-purple-500 mr-1" />
                    <span className="text-xs text-purple-600">Portfolio</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )

  const WelcomeBanner = ({ userType }: { userType: "farmer" | "trader" }) => (
    <Card
      className={`mb-8 ${userType === "farmer" ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-blue-500 to-blue-600"} text-white relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {userType === "farmer" ? "Welcome back, Khushi! 🌾" : "Welcome, Gujarat Traders Ltd.! 🏢"}
            </h2>
            <p className="text-lg opacity-90 mb-2">
              {userType === "farmer"
                ? "Your farm is thriving with MSP-protected auctions"
                : "Discover premium crops with MSP-guaranteed quality"}
            </p>
            <div className="flex items-center space-x-4 text-sm opacity-80">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Market Active</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Prices trending up 5.2%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>18 active auctions</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
              {userType === "farmer" ? "Premium Farmer" : "Premium Trader"}
            </Badge>
            <div className="text-sm opacity-80">
              <div className="flex items-center space-x-1">
                <Wifi className="w-3 h-3" />
                <span>Connected</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const QuickActions = ({ userType }: { userType: "farmer" | "trader" }) => (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2 text-orange-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userType === "farmer" ? (
            <>
              <Button className="bg-green-500 hover:bg-green-600 text-white h-12 transform hover:scale-105 transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                List New Crop
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-transparent hover:bg-green-50"
                onClick={() => setShowMSPPrices(true)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Check MSP Prices
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-transparent hover:bg-blue-50"
                onClick={() => setShowAnalytics(true)}
              >
                <Target className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </>
          ) : (
            <>
              <div className="col-span-3 space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Find Premium Crops
                </h3>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search by crop name, location..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="All Crops" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Crops</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="time">Time Left</SelectItem>
                      <SelectItem value="quality">Quality</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-800">AI Recommendations</span>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      Premium Wheat
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      Organic Rice
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                      Grade A Corn
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const AuctionDetailModal = () => (
    <Dialog open={showAuctionDetail} onOpenChange={setShowAuctionDetail}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <div className="flex h-[95vh]">
          {/* Left Panel - Auction Details */}
          <div className="flex-1 overflow-y-auto">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center text-2xl">
                  <Wheat className="w-6 h-6 mr-3 text-green-500" />
                  Premium Wheat Auction Details
                  <div className="ml-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-normal">Live</span>
                  </div>
                </DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAuctionDetail(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <DialogDescription className="text-base">
                Comprehensive auction information for informed bidding decisions
              </DialogDescription>
            </DialogHeader>

            <div className="px-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="quality">Quality</TabsTrigger>
                  <TabsTrigger value="history">Bid History</TabsTrigger>
                  <TabsTrigger value="farmer">Farmer</TabsTrigger>
                  <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg relative">
                    <img src="/golden-wheat-grains.png" alt="Premium Wheat" className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-semibold">AI Quality: 94/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Punjab, India</p>
                        <p className="text-sm text-gray-600">Location</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">2024-03-15</p>
                        <p className="text-sm text-gray-600">Harvested</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-green-500" />
                      <div>
                        <Badge className="bg-green-100 text-green-800">Grade A</Badge>
                        <p className="text-sm text-gray-600">Quality Grade</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Timer className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-red-600">2 days, 14 hours left</p>
                        <p className="text-sm text-gray-600">Time Remaining</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description & Storage</h3>
                    <p className="text-gray-700 mb-4">
                      High-quality wheat harvested from organic farms with excellent storage conditions. Grade A
                      certified with moisture content below 12%.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Storage Conditions</h4>
                      <p className="text-blue-700">Climate-controlled warehouse, pest-free environment</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="quality" className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          Quality Metrics
                          <Badge className="ml-2 bg-green-100 text-green-800">Certified</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Moisture Content</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={88} className="w-16 h-2" />
                              <span className="font-semibold text-green-600">11.2%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Protein Content</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={85} className="w-16 h-2" />
                              <span className="font-semibold text-green-600">12.8%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Foreign Matter</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={92} className="w-16 h-2" />
                              <span className="font-semibold text-green-600">0.8%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Test Weight</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={90} className="w-16 h-2" />
                              <span className="font-semibold text-green-600">78 kg/hl</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Certifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Organic Certified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Grade A Quality</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Pesticide Free</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>MSP Compliant</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Brain className="w-5 h-5 text-blue-500" />
                          <span>AI Verified Quality</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Bidding History</h3>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {selectedAuction?.bidHistory?.map((bid: any, index: number) => (
                      <Card key={index} className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{bid.bidder}</p>
                              <p className="text-sm text-gray-600">{bid.time}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-green-600">{bid.amount}</p>
                              <Badge variant="secondary">{index === 0 ? "Leading" : `#${index + 1}`}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="farmer" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-green-100 text-green-800 text-xl">RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold">Rajesh Kumar</h3>
                            <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                          </div>
                          <p className="text-gray-600">Punjab, India</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">4.8 rating (156 reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-2xl font-bold text-green-600">156</p>
                          <p className="text-sm text-gray-600">Total Sales</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">98%</p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">5.2</p>
                          <p className="text-sm text-gray-600">Years Experience</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai-insights" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Brain className="w-5 h-5 mr-2 text-blue-500" />
                          AI Quality Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">94/100</div>
                            <p className="text-sm text-gray-600">Overall Quality Score</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Visual Quality</span>
                              <span className="text-sm font-semibold">96/100</span>
                            </div>
                            <Progress value={96} className="h-2" />
                            <div className="flex justify-between">
                              <span className="text-sm">Grain Uniformity</span>
                              <span className="text-sm font-semibold">92/100</span>
                            </div>
                            <Progress value={92} className="h-2" />
                            <div className="flex justify-between">
                              <span className="text-sm">Storage Quality</span>
                              <span className="text-sm font-semibold">94/100</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                          Price Prediction
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">₹2580</div>
                            <p className="text-sm text-gray-600">Predicted Final Price</p>
                            <div className="flex items-center justify-center mt-2">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-green-600">87% Confidence</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="font-medium text-green-800 mb-2">Key Factors</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              <li>• High quality grade (A)</li>
                              <li>• Strong bidding activity</li>
                              <li>• Favorable weather conditions</li>
                              <li>• Market demand trending up</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Cloud className="w-5 h-5 mr-2 text-blue-500" />
                        Weather Impact Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                          <p className="text-sm font-medium">Current</p>
                          <p className="text-xs text-gray-600">Favorable</p>
                        </div>
                        <div className="text-center">
                          <Cloud className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-sm font-medium">Tomorrow</p>
                          <p className="text-xs text-gray-600">Neutral</p>
                        </div>
                        <div className="text-center">
                          <CloudRain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm font-medium">Day 3</p>
                          <p className="text-xs text-gray-600">Monitor</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Impact:</strong> Current weather conditions are favorable for crop quality
                          maintenance. Expected rain in 3 days may slightly affect transportation costs.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Panel - Enhanced Bidding */}
          <div className="w-80 bg-gray-50 border-l p-6 flex flex-col">
            <div className="space-y-6 flex-1">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Current Highest Bid</h3>
                <p className="text-4xl font-bold text-green-600">₹2450</p>
                <p className="text-sm text-gray-600">per kg</p>
                <div className="flex items-center justify-center mt-2 space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Updated 2 mins ago</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">MSP Price:</span>
                  <span className="font-semibold">₹2125/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reserve Price:</span>
                  <span className="font-semibold">₹2200/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Quantity:</span>
                  <span className="font-semibold">5000 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bids:</span>
                  <span className="font-semibold">18</span>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-800">MSP Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-700">AI suggests bidding ₹2480-2520</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Place Your Bid</h4>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Min: ₹2451</label>
                  <Input
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="text-lg font-semibold"
                  />
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => setBidAmount("2480")}>
                      ₹2480
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setBidAmount("2500")}>
                      ₹2500
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setBidAmount("2520")}>
                      ₹2520
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg font-semibold"
                  disabled={isPlacingBid}
                  onClick={() => {
                    setIsPlacingBid(true)
                    setTimeout(() => setIsPlacingBid(false), 2000)
                  }}
                >
                  {isPlacingBid ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Placing Bid...
                    </div>
                  ) : (
                    <>
                      <Gavel className="w-5 h-5 mr-2" />
                      Place Bid
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">Minimum increment: ₹1/kg</p>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-3">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Premium over MSP</span>
                    </div>
                    <span className="font-semibold text-green-600">+₹325</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Bidding Activity</span>
                    </div>
                    <span className="font-semibold">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Time Remaining</span>
                    </div>
                    <span className="font-semibold text-red-600">2 days, 14 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">AI Confidence</span>
                    </div>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const LiveAuctionsSection = ({ userType }: { userType: "farmer" | "trader" }) => (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-2xl">
              <Activity className="w-6 h-6 mr-3 text-red-500" />
              {userType === "farmer" ? "Your Live Auctions" : "Available Auctions"}
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Updates
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {liveAuctions.length} Active Auctions
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                <Brain className="w-3 h-3 mr-1" />
                AI Enhanced
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveAuctions.map((auction) => (
              <Card
                key={auction.id}
                className="group border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-green-50/30 relative overflow-hidden"
                onClick={() => {
                  setSelectedAuction(auction)
                  setShowAuctionDetail(true)
                }}
              >
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-blue-500 text-white shadow-lg">
                    <Brain className="w-3 h-3 mr-1" />
                    AI: {auction.aiQualityScore}/100
                  </Badge>
                </div>

                <div className="relative overflow-hidden">
                  <img
                    src={auction.image || "/placeholder.svg"}
                    alt={auction.crop}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-green-500 shadow-lg">Grade {auction.grade}</Badge>
                  <Badge className="absolute bottom-3 left-3 bg-red-500 shadow-lg animate-pulse">
                    {auction.timeLeft}
                  </Badge>
                  <div className="absolute bottom-3 right-3">
                    {auction.weatherImpact === "positive" && <Sun className="w-5 h-5 text-yellow-400" />}
                    {auction.weatherImpact === "neutral" && <Cloud className="w-5 h-5 text-gray-400" />}
                    {auction.weatherImpact === "negative" && <CloudRain className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div className="absolute bottom-16 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <h3 className="font-bold text-lg text-gray-800">{auction.crop}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {auction.location} • {auction.quantity}
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 font-medium">Current Bid</span>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{auction.totalBids} bids</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-orange-600">{auction.currentBid}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
                        {auction.premium}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">MSP: {auction.mspPrice}</p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-1">
                        <Brain className="w-3 h-3 text-blue-500" />
                        <span className="text-xs text-blue-700 font-medium">AI Prediction</span>
                      </div>
                      <span className="text-xs text-blue-600">{auction.confidence}% confidence</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-800">Expected Final:</span>
                      <span className="text-sm font-bold text-blue-800">{auction.predictedPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Leading Bidder</span>
                      <span className="font-semibold text-gray-800">{auction.leadingBidder}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Time Left</span>
                      <span className="font-semibold text-red-600 flex items-center">
                        <Timer className="w-3 h-3 mr-1" />
                        {auction.timeLeft}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-500 hover:bg-green-600 shadow-lg transform hover:scale-105 transition-all duration-200">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {userType === "trader" && (
                      <Button variant="outline" className="flex-1 border-green-300 hover:bg-green-50 bg-transparent">
                        <Gavel className="w-4 h-4 mr-2" />
                        Bid
                      </Button>
                    )}
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg flex items-center text-sm text-green-700 border border-green-200">
                    <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">Excellent! Bidding above ₹100 premium over MSP</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ... existing My Active Bids section ... */}
      {userType === "trader" && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-6 h-6 mr-3 text-blue-500" />
                My Active Bids
              </CardTitle>
              <Badge variant="outline" className="px-3 py-1">
                1 Leading
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myActiveBids.map((bid) => (
                <Card
                  key={bid.id}
                  className={`border-l-4 transition-all duration-300 hover:shadow-lg ${
                    bid.status === "winning"
                      ? "border-l-green-500 bg-green-50/50"
                      : bid.status === "outbid"
                        ? "border-l-red-500 bg-red-50/50"
                        : "border-l-blue-500 bg-blue-50/50"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{bid.crop}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {bid.location}
                          </span>
                          <span className="flex items-center">
                            <Timer className="w-3 h-3 mr-1" />
                            Ends in {bid.timeLeft}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-gray-600">My Bid</p>
                            <p className="text-xl font-bold text-gray-800">{bid.myBid}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {bid.status === "winning" && (
                              <>
                                <Trophy className="w-5 h-5 text-green-500" />
                                <div>
                                  <Badge className="bg-green-100 text-green-800">winning</Badge>
                                  {bid.leadMargin && (
                                    <p className="text-xs text-green-600 mt-1">Lead by {bid.leadMargin}</p>
                                  )}
                                </div>
                              </>
                            )}
                            {bid.status === "outbid" && (
                              <>
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <div>
                                  <Badge className="bg-red-100 text-red-800">outbid</Badge>
                                  {bid.currentHighest && (
                                    <p className="text-xs text-red-600 mt-1">Current: {bid.currentHighest}</p>
                                  )}
                                </div>
                              </>
                            )}
                            {bid.status === "won" && (
                              <>
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                                <div>
                                  <Badge className="bg-blue-100 text-blue-800">won</Badge>
                                  {bid.totalAmount && (
                                    <p className="text-xs text-blue-600 mt-1">Total: {bid.totalAmount}</p>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div
                          className={`mt-3 p-3 rounded-lg ${
                            bid.status === "winning"
                              ? "bg-green-100 text-green-800"
                              : bid.status === "outbid"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <p className="text-sm font-medium">{bid.message}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        {bid.status === "outbid" && bid.nextMinBid && (
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            Rebid {bid.nextMinBid}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">1</p>
                  <p className="text-sm text-green-700">Winning Bids</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-sm text-blue-700">Total Bids</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const NotificationsModal = () => (
    <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-500" />
            Notifications
            <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
              {unreadCount} new
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.read ? "border-orange-200 bg-orange-50/30" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {notification.type === "bid" && <Gavel className="w-5 h-5 text-green-500" />}
                    {notification.type === "weather" && <Cloud className="w-5 h-5 text-blue-500" />}
                    {notification.type === "market" && <TrendingUp className="w-5 h-5 text-orange-500" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setUnreadCount(0)}>
            Mark All Read
          </Button>
          <Button className="flex-1">View All</Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  const MarketInsightsModal = () => (
    <Dialog open={showMarketInsights} onOpenChange={setShowMarketInsights}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-500" />
            AI Market Insights
          </DialogTitle>
          <DialogDescription>
            Real-time market analysis and AI-powered predictions for informed trading decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  Trending Crops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.trending.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.crop}</p>
                        <p className="text-sm text-gray-600">{item.reason}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${item.change.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {item.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-blue-500" />
                  AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.predictions.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{item.crop}</p>
                        <Badge className="bg-blue-100 text-blue-800">{item.confidence}% confidence</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Next week prediction:</span>
                        <span className="font-semibold text-green-600">{item.nextWeek}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.factors.map((factor, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-orange-500" />
                Market Activity Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 21 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded ${
                      Math.random() > 0.7 ? "bg-green-500" : Math.random() > 0.4 ? "bg-yellow-400" : "bg-gray-200"
                    }`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <span>Low Activity</span>
                <span>High Activity</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )

  const WeatherModal = () => (
    <Dialog open={showWeatherWidget} onOpenChange={setShowWeatherWidget}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sun className="w-5 h-5 mr-2 text-yellow-500" />
            Weather Impact
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{weatherData.temperature}</h3>
                <p className="text-gray-600">{weatherData.condition}</p>
                <p className="text-sm text-gray-500">{weatherData.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="font-semibold">{weatherData.humidity}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Rainfall</p>
                  <p className="font-semibold">{weatherData.rainfall}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {day.condition === "sunny" && <Sun className="w-5 h-5 text-yellow-500" />}
                      {day.condition === "cloudy" && <Cloud className="w-5 h-5 text-gray-500" />}
                      {day.condition === "rainy" && <CloudRain className="w-5 h-5 text-blue-500" />}
                      <div>
                        <p className="font-medium">{day.day}</p>
                        <p className="text-sm text-gray-600">{day.temp}</p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${
                        day.impact === "positive"
                          ? "bg-green-100 text-green-800"
                          : day.impact === "negative"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {day.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )

  // ... existing AnalyticsModal and MSPPricesModal code ...

  const AnalyticsModal = () => (
    <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
            Farm Analytics Dashboard
          </DialogTitle>
          <DialogDescription>
            Comprehensive insights into your crop sales performance and market trends.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="This Week">This Week</TabsTrigger>
            <TabsTrigger value="This Month">This Month</TabsTrigger>
            <TabsTrigger value="This Year">This Year</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTimeframe} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-800">₹125,000</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12% from last month
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Total Sales</p>
                      <p className="text-2xl font-bold text-blue-800">45</p>
                      <p className="text-xs text-blue-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +8 auctions
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">Avg Price/kg</p>
                      <p className="text-2xl font-bold text-orange-800">₹2778</p>
                      <p className="text-xs text-orange-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Above MSP
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">MSP Compliance</p>
                      <p className="text-2xl font-bold text-purple-800">100%</p>
                      <Badge className="bg-purple-500 text-xs mt-1">Perfect Score</Badge>
                    </div>
                    <Award className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Monthly Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Jan</span>
                      <span className="font-semibold">₹85,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Feb</span>
                      <span className="font-semibold">₹92,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mar</span>
                      <span className="font-semibold">₹125,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Crop Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span>Wheat</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹52,000</p>
                        <p className="text-xs text-gray-500">18 sales • ₹2890/kg avg</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                        <span>Rice</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹45,000</p>
                        <p className="text-xs text-gray-500">15 sales • ₹3000/kg avg</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span>Maize</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹28,000</p>
                        <p className="text-xs text-gray-500">12 sales • ₹2333/kg avg</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  const MSPPricesModal = () => (
    <Dialog open={showMSPPrices} onOpenChange={setShowMSPPrices}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Current MSP Prices</DialogTitle>
          <DialogDescription>Government assured minimum support prices for various crops</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mspPrices.map((item, index) => (
            <Card key={index} className="border-green-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.crop}</h3>
                    <p className="text-sm text-gray-600">{item.season}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{item.price}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {item.trend.startsWith("+") ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${item.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <div>
              <p className="font-semibold text-green-800">MSP Guarantee</p>
              <p className="text-sm text-green-600">
                All crops listed on AgroSaathi are guaranteed to sell at or above the government MSP rates.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  if (currentView === "role-selection") {
    return <RoleSelection />
  }

  const userType = currentView === "farmer-dashboard" ? "farmer" : "trader"
  const stats = userType === "farmer" ? farmerStats : traderStats

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
      <Header userType={userType} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <WelcomeBanner userType={userType} />
        <StatsCards stats={stats} userType={userType} />
        <QuickActions userType={userType} />
        <LiveAuctionsSection userType={userType} />
      </main>

      <AnalyticsModal />
      <MSPPricesModal />
      <AuctionDetailModal />
      <NotificationsModal />
      <MarketInsightsModal />
      <WeatherModal />

      <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
        <Button
          size="sm"
          className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
          onClick={() => setShowMarketInsights(true)}
        >
          <Brain className="w-5 h-5" />
        </Button>
        <Button
          size="sm"
          className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
          onClick={() => setShowNotifications(true)}
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl transform hover:scale-110 transition-all duration-300">
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  )
}
