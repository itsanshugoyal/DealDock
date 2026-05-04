export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050505] py-10">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: logo + tagline */}
          <div>
            <p className="font-semibold text-[#fafafa] text-sm tracking-tight">
              DealDock
            </p>
            <p className="text-[12px] text-[#525252] mt-0.5">
              Revenue recovery for Instagram creators.
            </p>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[12px] text-[#525252] hover:text-[#a3a3a3] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[12px] text-[#525252] hover:text-[#a3a3a3] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-[11px] text-[#404040]">
            © 2026 DealDock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
