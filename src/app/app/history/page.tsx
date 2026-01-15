import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import { History, Sparkles, Calendar, Layers, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function HistoryPage() {
    const clerkUser = await currentUser()

    if (!clerkUser) return null

    const generations = await db.generation.findMany({
        where: {
            user: {
                clerkId: clerkUser.id
            }
        },
        include: {
            variants: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="space-y-10 pb-10">
            <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    Generation History
                </h1>
                <p className="text-lg text-slate-500 mt-2">
                    View and manage your past LinkedIn masterpiece creations.
                </p>
            </div>

            {generations.length === 0 ? (
                <div className="bg-white rounded-[2rem] border border-slate-200 p-20 text-center shadow-sm">
                    <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <History className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No history yet</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                        Your generated LinkedIn posts will appear here. Start by creating your first post.
                    </p>
                    <Link href="/app/generate">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-2xl font-bold">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate My First Post
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generations.map((gen) => (
                        <Link key={gen.id} href={`/app/history/${gen.id}`} className="group">
                            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
                                <div className="aspect-video relative bg-slate-100">
                                    {gen.imageUrl ? (
                                        <img
                                            src={gen.imageUrl}
                                            alt={gen.topic}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <Layers className="h-10 w-10" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-widest border border-white/20">
                                        {gen.tone}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors">
                                        {gen.topic}
                                    </h4>
                                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(gen.createdAt), 'MMM d, yyyy')}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Layers className="h-3 w-3" />
                                            {gen.variants.length} Variants
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{gen.objective}</span>
                                        <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

