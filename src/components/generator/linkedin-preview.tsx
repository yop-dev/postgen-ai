"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, MessageSquare, Repeat2, Send, Globe, MoreHorizontal, User2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface LinkedInPreviewProps {
    userName?: string
    userHeadline?: string
    content: string
    imageUrl?: string
    createdAt?: Date
}

export function LinkedInPreview({
    userName = "Joner De Silva",
    userHeadline = "Building the future of AI Content | Full Stack Developer | Thought Leader",
    content,
    imageUrl,
    createdAt = new Date(),
}: LinkedInPreviewProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isLoading, setIsLoading] = useState(!!imageUrl)

    // Reset loading state when image URL changes
    useEffect(() => {
        setIsLoading(!!imageUrl)
    }, [imageUrl])

    const previewLimit = 200

    const shouldShowSeeMore = content.length > previewLimit
    const displayedContent = isExpanded ? content : content.slice(0, previewLimit)

    return (
        <div className="w-full max-w-[550px] bg-white border border-[#e0e0e0] rounded-lg shadow-sm font-sans text-[14px] text-[#000000e6]">
            {/* Header */}
            <div className="flex items-start justify-between p-3 pb-2">
                <div className="flex gap-2">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0 overflow-hidden">
                        <User2 className="h-8 w-8 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-bold text-[14px] hover:text-[#0a66c2] hover:underline cursor-pointer">
                            {userName}
                        </h4>
                        <p className="text-[12px] text-[#00000099] line-clamp-1">
                            {userHeadline}
                        </p>
                        <div className="flex items-center gap-1 text-[12px] text-[#00000099]">
                            <span>1h •</span>
                            <Globe className="h-3 w-3" />
                        </div>
                    </div>
                </div>
                <button className="text-[#00000099] hover:bg-slate-100 p-1 rounded-full px-2">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </div>

            {/* Content */}
            <div className="px-3 pb-2 break-words whitespace-pre-wrap leading-[1.42857]">
                {displayedContent}
                {shouldShowSeeMore && !isExpanded && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="text-[#00000099] hover:text-[#0a66c2] hover:underline ml-1 font-semibold"
                    >
                        ...see more
                    </button>
                )}
            </div>

            {/* Image */}
            {imageUrl && (
                <div className="relative aspect-auto min-h-[300px] bg-slate-50 border-y border-[#e0e0e0] overflow-hidden flex items-center justify-center">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                        </div>
                    )}
                    <img
                        src={imageUrl}
                        alt="Post content"
                        className={cn("w-full h-full object-cover transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                </div>
            )}

            {/* Stats (Fake) */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-[#e0e0e0] mx-3">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white border border-white">👍</div>
                        <div className="h-4 w-4 rounded-full bg-red-400 flex items-center justify-center text-[8px] text-white border border-white">❤️</div>
                        <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white border border-white">💡</div>
                    </div>
                    <span className="text-[12px] text-[#00000099] hover:text-[#0a66c2] hover:underline cursor-pointer ml-1">
                        42
                    </span>
                </div>
                <div className="text-[12px] text-[#00000099]">
                    <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">12 comments</span>
                    <span className="mx-1">•</span>
                    <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">3 reposts</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-2 py-1 mx-1">
                <ActionButton icon={ThumbsUp} label="Like" />
                <ActionButton icon={MessageSquare} label="Comment" />
                <ActionButton icon={Repeat2} label="Repost" />
                <ActionButton icon={Send} label="Send" />
            </div>
        </div>
    )
}

function ActionButton({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="flex items-center gap-1.5 py-2.5 px-3 rounded hover:bg-black/5 transition-colors text-[#00000099] font-semibold text-[14px]">
            <Icon className="h-5 w-5" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    )
}
