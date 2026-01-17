import { Loader2 } from "lucide-react"

export default function HistoryLoading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                <p className="text-sm text-slate-400">Loading history...</p>
            </div>
        </div>
    )
}
