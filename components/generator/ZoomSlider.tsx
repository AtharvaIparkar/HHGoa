"use client";

interface ZoomSliderProps {
  value: number; // 100 to 250
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export function ZoomSlider({
  value,
  onChange,
  min = 100,
  max = 250
}: ZoomSliderProps) {
  return (
    <div className="flex items-center gap-3 w-full bg-[#062B1F]/80 border border-[#E8F3EC]/20 px-4 py-2.5 rounded-2xl backdrop-blur-md">
      <span className="font-mono text-xs text-[#E8F3EC]/70">🔍 Zoom</span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Photo zoom level"
        className="w-full accent-[#7CFF6B] cursor-pointer h-2 bg-[#062B1F] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#7CFF6B]"
      />
      <span className="font-mono text-xs text-[#7CFF6B] font-bold min-w-[45px] text-right">
        {value}%
      </span>
    </div>
  );
}
