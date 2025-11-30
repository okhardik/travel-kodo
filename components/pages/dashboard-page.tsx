"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { LocationMasterSetup } from "@/components/sections/location-master-setup"
import { BookingEngine } from "@/components/sections/booking-engine"
import { SavingsDashboard } from "@/components/sections/savings-dashboard"

export function DashboardPage({ userEmail, onLogout }: { userEmail: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("booking")
  const [locationMasters, setLocationMasters] = useState<any[]>([
    { state: "KA", gstinSuffix: "101", active: true },
    { state: "DL", gstinSuffix: "102", active: true },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-black text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Kodo</h1>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="booking">Book Travel</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="mt-6">
            <LocationMasterSetup locationMasters={locationMasters} setLocationMasters={setLocationMasters} />
          </TabsContent>

          <TabsContent value="booking" className="mt-6">
            <BookingEngine locationMasters={locationMasters} />
          </TabsContent>

          <TabsContent value="savings" className="mt-6">
            <SavingsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
