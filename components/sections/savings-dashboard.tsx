"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, CheckCircle2, IndianRupee } from "lucide-react"

const monthlyData = [
  { month: "Nov", savings: 12500, compliance: "Good", audits: 0 },
  { month: "Dec", savings: 18700, compliance: "Good", audits: 0 },
  { month: "Jan", savings: 22300, compliance: "Perfect", audits: 0 },
  { month: "Feb", savings: 31200, compliance: "Perfect", audits: 0 },
  { month: "Mar", savings: 42100, compliance: "Perfect", audits: 0 },
]

const savingBreakdown = [
  { name: "Hotel ITC", value: 85400, color: "oklch(0.52 0.16 160)" },
  { name: "Flight Reconciliation", value: 23200, color: "oklch(0.65 0.2 140)" },
  { name: "GSTIN Auto-Swap", value: 15300, color: "oklch(0.4 0.15 250)" },
]

const totalSavings = savingBreakdown.reduce((sum, item) => sum + item.value, 0)

export function SavingsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Savings & Compliance</h2>
        <p className="text-muted-foreground">Track your financial impact and regulatory health</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total GST Savings</p>
                <p className="text-3xl font-bold text-accent">₹{totalSavings.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground mt-2">This quarter</p>
              </div>
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Compliance Status</p>
                <p className="text-3xl font-bold text-primary">Perfect</p>
                <p className="text-xs text-muted-foreground mt-2">0 audit flags</p>
              </div>
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reconciliation Time</p>
                <p className="text-3xl font-bold">Instant</p>
                <p className="text-xs text-muted-foreground mt-2">100% automated</p>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Savings Trend</CardTitle>
          <CardDescription>GST savings accumulation over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                contentStyle={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="oklch(0.52 0.16 160)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.52 0.16 160)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Savings breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Breakdown</CardTitle>
            <CardDescription>Sources of GST optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={savingBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₹${(value / 1000).toFixed(0)}k`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {savingBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Scorecard</CardTitle>
            <CardDescription>Your regulatory health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">GSTIN Accuracy</span>
                  <span className="text-sm font-bold text-accent">100%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">ITC Recovery Rate</span>
                  <span className="text-sm font-bold text-accent">95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Reconciliation Match</span>
                  <span className="text-sm font-bold text-accent">100%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-xs">
                <strong>Zero audit flags detected.</strong> Your travel spend is fully compliant with GST regulations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
