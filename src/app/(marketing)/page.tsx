import { Hero } from "@/components/marketing/hero"
import { Features } from "@/components/marketing/features"
import { Pricing } from "@/components/marketing/pricing"
import { CTA } from "@/components/marketing/cta"

export default function MarketingPage() {
    return (
        <div className="flex flex-col w-full">
            <Hero />
            <Features />
            <Pricing />
            <CTA />
        </div>
    )
}
