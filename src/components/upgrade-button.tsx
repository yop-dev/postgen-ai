"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface UpgradeButtonProps {
    isPro: boolean
}

export function UpgradeButton({ isPro }: UpgradeButtonProps) {
    const [loading, setLoading] = useState(false)

    const handleUpgrade = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                toast.error("Failed to create checkout session")
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleManageSubscription = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/stripe/portal", {
                method: "POST",
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                toast.error("Failed to open billing portal")
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (isPro) {
        return (
            <Button
                onClick={handleManageSubscription}
                disabled={loading}
                className="bg-white text-slate-900 hover:bg-slate-100 border border-white gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                    </>
                ) : (
                    <>
                        Manage Subscription
                    </>
                )}
            </Button>
        )
    }

    return (
        <Button
            onClick={handleUpgrade}
            disabled={loading}
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
            {loading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                <>
                    <Sparkles className="h-4 w-4" />
                    Upgrade to Pro
                </>
            )}
        </Button>
    )
}
