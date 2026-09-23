import React from 'react';
import { NavLink } from 'react-router-dom';
import { Send, Check, Star, ShieldCheck, Lock } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeMode: 'login' | 'register';
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  activeMode,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 flex flex-col justify-between antialiased selection:bg-indigo-600 selection:text-white">
      <main className="flex-grow flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Column: Dark Branding Hero Pane (Stitch AI design) */}
        <div className="relative w-full lg:w-[48%] bg-[#0b1c30] text-white p-8 lg:p-14 flex flex-col justify-between overflow-hidden border-r border-slate-800 shrink-0">
          {/* Background Decorative Grid & Ambient Glow */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c3c0ff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-30 pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500 rounded-full blur-[140px] opacity-25 pointer-events-none" />

          {/* Top Branding Section */}
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Send className="w-5 h-5 -rotate-12 translate-x-0.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">TaskPilot</span>
              <span className="ml-2 text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-200 border border-indigo-400/30 tracking-wider uppercase">
                ENTERPRISE
              </span>
            </div>

            {/* Headline & Description */}
            <div className="mt-12 lg:mt-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-indigo-200 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SOC-2 Type II Certified & SAML 2.0 Compliant
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white max-w-lg leading-tight tracking-tight">
                Streamlined Task & Project Management for Organizations
              </h1>
              <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
                Empower high-velocity engineering, product, and operations teams with unified task execution, automated orchestration, and enterprise compliance.
              </p>
            </div>

            {/* Enterprise Feature List */}
            <div className="mt-8 space-y-3.5 max-w-lg">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-600/80 flex items-center justify-center shrink-0 text-white shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <p className="text-sm text-slate-200">
                  Multi-workspace orchestration with real-time sprint tracking
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-600/80 flex items-center justify-center shrink-0 text-white shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <p className="text-sm text-slate-200">
                  Granular role-based access control & SOC-2 compliance
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-600/80 flex items-center justify-center shrink-0 text-white shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <p className="text-sm text-slate-200">
                  Automated task distribution powered by predictive resource routing
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-600/80 flex items-center justify-center shrink-0 text-white shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <p className="text-sm text-slate-200">
                  Native integrations with Slack, GitHub, Jira, and Google Workspace
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badge & Rating */}
          <div className="relative z-10 mt-12 pt-8 border-t border-slate-800">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-sm text-white font-semibold">4.9 / 5.0</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Trusted by over 4,500+ forward-thinking teams worldwide
                </p>
              </div>
              <div className="flex items-center gap-4 opacity-75 grayscale hover:grayscale-0 transition duration-200 text-xs font-bold tracking-widest text-slate-300">
                <span>ACME CORP</span>
                <span>DATALOOP</span>
                <span>STRATIO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Console (52% width) */}
        <div className="w-full lg:w-[52%] bg-[#f8f9ff] flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 relative min-h-screen">
          {/* Top Action Navigation */}
          <div className="w-full max-w-[450px] flex justify-end items-center mb-6 text-slate-500 text-xs font-medium">
            <span>Need an enterprise demo?</span>
            <button
              type="button"
              onClick={() => alert('Contacting enterprise sales team...')}
              className="ml-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Contact Sales
            </button>
          </div>

          {/* Fixed-Dimensions Auth Card Container: Prevents Any Size/Height Shift */}
          <div className="w-full max-w-[450px] min-h-[610px] bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              {/* Segmented Tab Control (Clean route-based navigation) */}
              <div className="flex p-1 bg-slate-100 rounded-lg mb-6 border border-slate-200">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `flex-1 py-2 px-3 text-center text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                      isActive || activeMode === 'register'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 font-medium'
                    }`
                  }
                >
                  Register Organization
                </NavLink>

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex-1 py-2 px-3 text-center text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                      isActive || activeMode === 'login'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 font-medium'
                    }`
                  }
                >
                  Login
                </NavLink>
              </div>

              {/* Header Title & Subtitle */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
                <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
              </div>

              {/* Form Content */}
              {children}
            </div>

            {/* Card Footer: Enterprise Single Sign-On / Footnote */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Enterprise Grade Security • Multi-Tenant Isolation</span>
              </div>
            </div>
          </div>

          {/* Trust Assurance Footnote below Card */}
          <div className="mt-5 flex items-center gap-2 text-slate-500 text-xs font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>256-bit TLS encrypted connection</span>
          </div>
        </div>
      </main>
    </div>
  );
};
