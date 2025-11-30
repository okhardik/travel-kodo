"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"

export function HotelBookingCard({ hotel, onBook, netCostInfo, currentGstin, allHotelsForComparison }: any) {
  const { netCost, gst, recoverableITC, itcQualifies } = netCostInfo

  // A hotel is a "smart pick" only if ITC qualifies AND it has lower net cost than alternatives
  const isBetter =
    itcQualifies &&
    netCost < (allHotelsForComparison?.find((h: any) => h.state === currentGstin)?.netCost || Number.POSITIVE_INFINITY)

  return (
    <Card className={`relative overflow-hidden transition-all ${isBetter ? "border-accent border-2" : ""}`}>
      {isBetter && (
        <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Smart Pick
        </div>
      )}
      <CardContent className="pt-6 pb-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg">{hotel.name}</h3>
            <p className="text-sm text-muted-foreground">
              {hotel.city} • {hotel.state}
            </p>
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Price</span>
              <span className="font-medium">₹{hotel.stickPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">GST ({hotel.gstRate}%)</span>
              <span className="font-medium">₹{gst.toLocaleString("en-IN")}</span>
            </div>
            {itcQualifies && (
              <div className="flex justify-between text-sm text-accent font-medium">
                <span>Recoverable ITC</span>
                <span>-₹{recoverableITC.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-bold">Net Cost to Company</span>
              <span className="font-bold text-lg text-primary">₹{netCost.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Compliance indicator */}
          <div className="flex items-start gap-2 p-2 rounded-lg bg-background border border-border">
            {itcQualifies ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-medium">ITC Qualified</p>
                  <p className="text-muted-foreground">GSTIN matches hotel state</p>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-medium">ITC Blocked</p>
                  <p className="text-muted-foreground">State mismatch with your GSTIN</p>
                </div>
              </>
            )}
          </div>

          <Button onClick={() => onBook(hotel)} className="w-full bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
