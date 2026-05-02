import { Navigation, Signal, Wifi } from 'lucide-react';

export default function StatusBar({ floating = false, tint = 'dark' }: { floating?: boolean; tint?: 'dark' | 'light' }) {
  const color = tint === 'light' ? '#ffffff' : '#281e1b';
  const base = 'h-[44px] w-full flex items-center justify-between px-[20px] shrink-0';
  const cls = floating
    ? `${base} absolute top-0 left-0 right-0 z-50 pointer-events-none`
    : base;
  return (
    <div className={cls}>
      <div className="flex items-center gap-[10px]">
        <p className="font-['DM_Sans:Regular',sans-serif] text-[15px]" style={{ color }}>10:30</p>
        <Navigation className="size-[13px]" style={{ color, fill: color }} />
      </div>
      <div className="flex items-center gap-[8px]">
        <Signal className="size-[14px]" style={{ color }} />
        <Wifi className="size-[14px]" style={{ color }} />
        <div className="relative w-[24px] h-[12px] border rounded-[3px] flex items-center" style={{ borderColor: color }}>
          <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1.5px] h-[5px] rounded-r-[1px]" style={{ background: color }} />
          <div className="h-[8px] rounded-[1px] ml-[1px]" style={{ width: `${(24 - 4) * 0.72}px`, background: color }} />
          <p className="absolute inset-0 flex items-center justify-center font-['DM_Sans:Bold',sans-serif] text-[7px] leading-none" style={{ color: tint === 'light' ? '#281e1b' : '#ffffff' }}>72</p>
        </div>
      </div>
    </div>
  );
}