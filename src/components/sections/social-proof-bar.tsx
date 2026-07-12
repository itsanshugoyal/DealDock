"use client";

import { useLocale } from "@/lib/locale-context";

export function SocialProofBar() {
  const { socialProof } = useLocale();
  const doubled = [...socialProof.creators, ...socialProof.creators];

  return (
    <div className="border-y border-white/[0.06] bg-[#0a0a0a] py-5 overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          {/* Stat text */}
          <div className="flex-shrink-0 text-center sm:text-left">
            <p className="text-[13px] text-[#737373] whitespace-nowrap">
              <span className="text-[#fafafa] font-semibold">{socialProof.statPrefix}</span>{" "}
              {socialProof.statMiddle}{" "}
              <span className="text-[#ffc107] font-semibold">{socialProof.statValue}</span>{" "}
              {socialProof.statSuffix}
            </p>
          </div>

          {/* Scrolling avatars */}
          <div className="overflow-hidden w-full relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

            <div
              className="flex items-center gap-3 animate-marquee"
              style={{ width: "max-content" }}
            >
              {doubled.map((creator, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 flex-shrink-0 group cursor-default"
                  title={`${creator.name} · ${creator.niche}`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={creator.img}
                      alt={creator.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-white/[0.1] group-hover:ring-[#ffc107]/50 transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Online dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border border-[#0a0a0a]" />
                  </div>

                  {/* Name — visible on hover */}
                  <span className="text-[11px] text-[#737373] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-0 group-hover:max-w-[100px] overflow-hidden whitespace-nowrap">
                    {creator.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
