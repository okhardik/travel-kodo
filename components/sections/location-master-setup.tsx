"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, CheckCircle2 } from "lucide-react"

const INDIAN_STATES = ["KA", "MH", "DL", "TN", "UP", "WB", "RJ", "MP", "TG", "KL", "GJ", "AP", "HR", "PN", "OD"]

export function LocationMasterSetup({ locationMasters, setLocationMasters }: any) {
  const [newState, setNewState] = useState("")
  const [newGstin, setNewGstin] = useState("")

  const handleAdd = () => {
    if (newState && newGstin) {
      setLocationMasters([...locationMasters, { state: newState, gstinSuffix: newGstin, active: true }])
      setNewState("")
      setNewGstin("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Location Master</h2>
        <p className="text-muted-foreground">Configure your business GST registrations by state</p>
      </div>

      {/* Add new location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Branch</CardTitle>
          <CardDescription>Register your GSTIN for each state where you have operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <select
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground"
              >
                <option value="">Select state...</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GSTIN (suffix)</label>
              <Input placeholder="e.g., 101 or 102" value={newGstin} onChange={(e) => setNewGstin(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleAdd} className="w-full gap-2" variant="default">
            <Plus className="w-4 h-4" />
            Add Branch
          </Button>
        </CardContent>
      </Card>

      {/* Configured locations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Branches</CardTitle>
          <CardDescription>{locationMasters.length} state(s) configured</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {locationMasters.map((location: any, idx: number) => (
              <div key={idx} className="p-4 border border-border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium">{location.state}</p>
                  <p className="text-sm text-muted-foreground">GSTIN: ...{location.gstinSuffix}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
