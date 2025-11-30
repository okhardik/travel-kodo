"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Zap } from "lucide-react"

export function LoginPage({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "verify">("email")

  const handleLogin = () => {
    if (email) {
      onLogin(email)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl grid md:grid-cols-2 gap-8 relative z-10">
        {/* Left side - Brand message */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Kodo
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-balance">Autonomous Travel & Expense</h1>
            <p className="text-lg text-muted-foreground">
              Gen 3 platform for CFOs who care about compliance, not clutter
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-3 pt-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-success rounded-full" />
              </div>
              <div>
                <p className="font-medium text-sm">Smart GST Optimization</p>
                <p className="text-xs text-muted-foreground">Auto-swap GSTIN by location, claim max ITC</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-success rounded-full" />
              </div>
              <div>
                <p className="font-medium text-sm">Net Cost Calculations</p>
                <p className="text-xs text-muted-foreground">Save money by booking premium hotels</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-success rounded-full" />
              </div>
              <div>
                <p className="font-medium text-sm">Zero SaaS Fees</p>
                <p className="text-xs text-muted-foreground">Pay only on transactions, never on seats</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>Enter your company email to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="cfo@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="h-11"
              />
            </div>

            {step === "email" && (
              <Button
                onClick={handleLogin}
                disabled={!email}
                className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-medium"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            <div className="text-xs text-center text-muted-foreground pt-4">Demo mode - Use any email to explore</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
