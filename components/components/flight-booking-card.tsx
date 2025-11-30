"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane } from "lucide-react"

export function FlightBookingCard({ flight, onBook }: any) {
  const gst = Math.round(flight.price * (flight.gstRate / 100))
  const total = flight.price + gst

  return (
    <Card>
      <CardContent className="pt-6 pb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">{flight.airline}</p>
              <p className="text-sm text-muted-foreground">Flight</p>
            </div>
            <Plane className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Route</span>
              <span className="font-medium">
                {flight.from} → {flight.to}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Fare</span>
              <span className="font-medium">₹{flight.price.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">GST (5%)</span>
              <span className="font-medium">₹{gst.toLocaleString("en-IN")}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-bold">Total Cost</span>
              <span className="font-bold text-lg text-primary">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground p-2 bg-accent/10 rounded">
            ITC auto-claimed to Head Office GSTIN - 100% reconciliation guaranteed
          </p>

          <Button onClick={() => onBook(flight)} className="w-full bg-primary hover:bg-primary/90">
            Book Flight
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
