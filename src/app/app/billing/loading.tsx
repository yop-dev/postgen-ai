import { Loader2 } from "lucide-react"

export default function BillingLoading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                <p className="text-sm text-slate-400">Loading billing...</p>
            </div>
        </div>
    )
}
