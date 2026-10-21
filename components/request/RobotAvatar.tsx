import React from "react";
import { cn } from "@/lib/utils";

interface RobotAvatarProps {
  /** Scanning eyes and a pulsing antenna while DAILY AI is working. */
  thinking?: boolean;
  className?: string;
}

/**
 * DAILY AI's small robot. Idle it just blinks now and then; while thinking
 * its eyes scan and the antenna glows. Motion is CSS only and is switched
 * off by the global reduced-motion rules.
 */
export function RobotAvatar({ thinking = false, className }: RobotAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "robot relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]",
        thinking && "robot-thinking border-signal/30",
        className
      )}
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        {/* Antenna */}
        <line x1="16" y1="4.5" x2="16" y2="8.5" stroke="currentColor" strokeWidth="1.5" className="text-white/40" />
        <circle cx="16" cy="4" r="2" className="robot-antenna fill-signal" />

        {/* Head */}
        <rect x="5" y="8.5" width="22" height="17" rx="6" className="fill-white/[0.06] stroke-white/50" strokeWidth="1.5" />

        {/* Ears */}
        <rect x="2.5" y="14" width="2.5" height="6" rx="1.25" className="fill-white/30" />
        <rect x="27" y="14" width="2.5" height="6" rx="1.25" className="fill-white/30" />

        {/* Visor */}
        <rect x="8.5" y="12.5" width="15" height="8" rx="4" className="fill-ink" />

        {/* Eyes */}
        <g className="robot-eyes">
          <rect x="11.5" y="14.75" width="3" height="3.5" rx="1.5" className="fill-signal" />
          <rect x="17.5" y="14.75" width="3" height="3.5" rx="1.5" className="fill-signal" />
        </g>

        {/* Mouth */}
        <path d="M13.5 23h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="text-white/35" />
      </svg>
    </span>
  );
}
