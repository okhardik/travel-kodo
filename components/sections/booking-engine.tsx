"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HotelBookingCard } from "@/components/components/hotel-booking-card"
import { FlightBookingCard } from "@/components/components/flight-booking-card"
import { MapPin, Plane } from "lucide-react"

const HOTEL_DATA = [
  { id: 1, name: "Budget Inn", city: "Delhi", stickPrice: 7400, gstRate: 5, state: "DL" },
  { id: 2, name: "Luxury Suite", city: "Delhi", stickPrice: 7600, gstRate: 18, state: "DL" },
  { id: 3, name: "Premium Hotel", city: "Bangalore", stickPrice: 6800, gstRate: 18, state: "KA" },
  { id: 4, name: "Budget Stay", city: "Bangalore", stickPrice: 5200, gstRate: 5, state: "KA" },
  { id: 5, name: "Executive Tower", city: "Mumbai", stickPrice: 8500, gstRate: 18, state: "MH" },
  { id: 6, name: "City Hotel", city: "Mumbai", stickPrice: 7200, gstRate: 5, state: "MH" },
]

const FLIGHT_DATA = [
  { id: 101, airline: "Air India", from: "BLR", to: "DEL", price: 600000, gstRate: 5 },
  { id: 102, airline: "IndiGo", from: "BLR", to: "DEL", price: 550000, gstRate: 5 },
  { id: 103, airline: "SpiceJet", from: "DEL", to: "BLR", price: 520000, gstRate: 5 },
]

const CITIES = [
  { code: "DL", name: "Delhi", state: "DL" },
  { code: "BLR", name: "Bangalore", state: "KA" },
  { code: "MUM", name: "Mumbai", state: "MH" },
]

const AIRPORTS = [
  { code: "DEL", name: "Delhi (IGI)", state: "DL" },
  { code: "BLR", name: "Bangalore", state: "KA" },
  { code: "MUM", name: "Mumbai", state: "MH" },
]

export function BookingEngine({ locationMasters }: any) {
  const [bookingType, setBookingType] = useState<"hotel" | "flight">("hotel")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [fromAirport, setFromAirport] = useState<string>("BLR")
  const [toAirport, setToAirport] = useState<string>("DEL")
  const [selectedGstin, setSelectedGstin] = useState(locationMasters[0]?.state || "KA")
  const [cart, setCart] = useState<any[]>([])

  const hotelsByCity = useMemo(() => {
    if (!selectedCity) return HOTEL_DATA
    return HOTEL_DATA.filter((h) => h.city === selectedCity)
  }, [selectedCity])

  const cities = [...new Set(HOTEL_DATA.map((h) => h.city))]

  const calculateNetCost = (hotel: any) => {
    const itcQualifies = hotel.state === selectedGstin
    const gst = Math.round(hotel.stickPrice * (hotel.gstRate / 100))
    const recoverableITC = itcQualifies ? gst : 0
    const netCost = hotel.stickPrice + gst - recoverableITC
    return { netCost, gst, recoverableITC, itcQualifies }
  }

  const hotelsWithCosts = useMemo(() => {
    return hotelsByCity.map((hotel) => ({
      ...hotel,
      ...calculateNetCost(hotel),
    }))
  }, [hotelsByCity, selectedGstin])

  const bestDealInCity = useMemo(() => {
    const withQualifiedITC = hotelsWithCosts.filter((h) => h.itcQualifies)
    return withQualifiedITC.length > 0
      ? withQualifiedITC.reduce((best, current) => (current.netCost < best.netCost ? current : best))
      : hotelsWithCosts.reduce((best, current) => (current.netCost < best.netCost ? current : best))
  }, [hotelsWithCosts])

  const handleBookHotel = (hotel: any) => {
    const { netCost, gst, recoverableITC, itcQualifies } = calculateNetCost(hotel)
    setCart([
      ...cart,
      {
        type: "hotel",
        name: hotel.name,
        city: hotel.city,
        stickPrice: hotel.stickPrice,
        gst,
        netCost,
        recoverableITC,
        itcQualifies,
        date: new Date().toLocaleDateString(),
      },
    ])
  }

  const handleBookFlight = (flight: any) => {
    const gst = Math.round(flight.price * (flight.gstRate / 100))
    const netCost = flight.price + gst
    setCart([
      ...cart,
      {
        type: "flight",
        airline: flight.airline,
        route: `${flight.from}-${flight.to}`,
        price: flight.price,
        gst,
        netCost,
        date: new Date().toLocaleDateString(),
      },
    ])
  }

  const totalSavings = useMemo(() => {
    return cart.reduce((sum, item) => {
      if (item.type === "hotel") {
        return sum + (item.recoverableITC || 0)
      }
      return sum
    }, 0)
  }, [cart])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Book Travel</h2>
        <p className="text-muted-foreground">Smart booking with GST optimization</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Booking Branch (GSTIN)</CardTitle>
          <CardDescription>Select which state branch will be used for booking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {locationMasters.map((loc: any) => (
              <Button
                key={loc.state}
                onClick={() => setSelectedGstin(loc.state)}
                variant={selectedGstin === loc.state ? "default" : "outline"}
                className="flex-1"
              >
                {loc.state}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={bookingType} onValueChange={(v) => setBookingType(v as "hotel" | "flight")} className="w-full">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="hotel">Hotels</TabsTrigger>
          <TabsTrigger value="flight">Flights</TabsTrigger>
        </TabsList>

        <TabsContent value="hotel" className="mt-6 space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border">
            <CardContent className="pt-8 pb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Search Hotels
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Destination City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground font-medium"
                    >
                      <option value="">All cities</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Check-in Date</label>
                    <input
                      type="date"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Check-out Date</label>
                    <input
                      type="date"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {hotelsByCity.length > 0 ? (
              hotelsByCity.map((hotel) => (
                <HotelBookingCard
                  key={hotel.id}
                  hotel={hotel}
                  onBook={handleBookHotel}
                  netCostInfo={calculateNetCost(hotel)}
                  currentGstin={selectedGstin}
                  allHotelsForComparison={hotelsWithCosts}
                />
              ))
            ) : (
              <Card className="md:col-span-2">
                <CardContent className="pt-8 text-center text-muted-foreground">
                  Select a city to see available hotels
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="flight" className="mt-6 space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border">
            <CardContent className="pt-8 pb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Search Flights
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">From</label>
                    <select
                      value={fromAirport}
                      onChange={(e) => setFromAirport(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground font-medium"
                    >
                      {AIRPORTS.map((airport) => (
                        <option key={airport.code} value={airport.code}>
                          {airport.code} - {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">To</label>
                    <select
                      value={toAirport}
                      onChange={(e) => setToAirport(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground font-medium"
                    >
                      {AIRPORTS.map((airport) => (
                        <option key={airport.code} value={airport.code}>
                          {airport.code} - {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Depart</label>
                    <input
                      type="date"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Return</label>
                    <input
                      type="date"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {FLIGHT_DATA.map((flight) => (
              <FlightBookingCard key={flight.id} flight={flight} onBook={handleBookFlight} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Cart summary */}
      {cart.length > 0 && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg">Booking Cart</CardTitle>
            <CardDescription>
              {cart.length} item(s) | Total Savings: ₹{totalSavings.toLocaleString("en-IN")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {cart.map((item, idx) => (
              <div key={idx} className="p-4 bg-card rounded-lg border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.type === "hotel" ? item.name : item.airline}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === "hotel" ? item.city : item.route} • {item.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">₹{item.netCost.toLocaleString("en-IN")}</p>
                    {item.type === "hotel" && item.itcQualifies && (
                      <p className="text-xs text-accent font-medium">
                        ITC: ₹{item.recoverableITC.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
