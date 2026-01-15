export default function BillingPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
                <p className="text-gray-600 mt-2">Manage your plan and payment methods</p>
            </div>

            {/* Current Plan */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">Free Plan</p>
                        <p className="text-gray-600 mt-1">3 lifetime generations</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">$0</p>
                        <p className="text-sm text-gray-500">per month</p>
                    </div>
                </div>
            </div>

            {/* Upgrade to Pro */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
                <p className="text-blue-100 mb-4">Unlock unlimited generations and premium features</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Unlimited generations</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>High-res images (1024×1024)</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Full history</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Regenerate captions & images</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-3xl font-bold">$15</p>
                        <p className="text-blue-100 text-sm">per month</p>
                    </div>
                    <button className="rounded-lg bg-white px-6 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    )
}
