import { Loader2 } from "lucide-react"

export default function SettingsLoading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                <p className="text-sm text-slate-400">Loading settings...</p>
            </div>
        </div>
    )
}
