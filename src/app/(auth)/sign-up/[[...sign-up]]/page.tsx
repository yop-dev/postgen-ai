import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center py-20">
            <SignUp
                routing="path"
                path="/sign-up"
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-white hover:bg-slate-200 text-slate-900 font-semibold',
                        card: 'bg-slate-900 border border-slate-800 shadow-xl',
                        headerTitle: 'text-white',
                        headerSubtitle: 'text-slate-400',
                        socialButtonsBlockButton: 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white',
                        socialButtonsBlockButtonText: 'text-slate-300',
                        formFieldLabel: 'text-slate-300',
                        formFieldInput: 'bg-slate-950 border-slate-700 text-white focus:ring-slate-700',
                        footerActionLink: 'text-white hover:text-slate-300',
                        identityPreviewText: 'text-slate-300',
                        formFieldInputShowPasswordButton: 'text-slate-400 hover:text-white',
                        dividerLine: 'bg-slate-800',
                        dividerText: 'text-slate-400',
                        formFieldSuccessText: 'text-green-400',
                        formFieldErrorText: 'text-red-400',
                        identityPreviewEditButton: 'text-slate-400 hover:text-white',
                        formFieldHintText: 'text-slate-500',
                        formFieldAction: 'text-white hover:text-slate-300',
                        footerActionText: 'text-slate-400',
                        otpCodeFieldInput: 'bg-slate-950 border-slate-700 text-white',
                        alternativeMethodsBlockButton: 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    }
                }}
            />
        </div>
    )
}
