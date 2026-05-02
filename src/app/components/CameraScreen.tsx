import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { X, RotateCcw, Check } from 'lucide-react';

export default function CameraScreen() {
  const navigate = useNavigate();
  const [state, setState] = useState<'idle' | 'recording' | 'preview'>('idle');
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const toggleRec = () => {
    if (state === 'idle') {
      setState('recording');
      setTime(0);
      intervalRef.current = window.setInterval(() => {
        setTime(t => {
          if (t >= 60) { if (intervalRef.current) clearInterval(intervalRef.current); setState('preview'); return 60; }
          return t + 1;
        });
      }, 1000);
    } else if (state === 'recording') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState('preview');
    }
  };

  if (state === 'preview') {
    return (
      <div className="bg-black flex flex-col relative size-full overflow-hidden">
        <div className="h-[32px] flex items-center justify-between px-[20px] shrink-0">
          <button onClick={() => { setState('idle'); setTime(0); }}>
            <X className="size-[24px] text-white" />
          </button>
          <p className="font-['Inter:Medium',sans-serif] text-[14px] text-white">Preview</p>
          <div className="size-[24px]" />
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="text-center">
            <p className="text-[56px] mb-[8px]">🎬</p>
            <p className="font-['Inter:Medium',sans-serif] text-[14px] text-white">{time}s video</p>
          </div>
        </div>
        <div className="px-[16px] py-[24px] flex items-center justify-between shrink-0">
          <button onClick={() => { setState('idle'); setTime(0); }} className="flex items-center gap-[6px] px-[20px] py-[12px] rounded-full bg-white/10">
            <RotateCcw className="size-[16px] text-white" />
            <p className="font-['Inter:Medium',sans-serif] text-[14px] text-white">Retake</p>
          </button>
          <button onClick={() => navigate('/daily-question')} className="flex items-center gap-[6px] px-[24px] py-[12px] rounded-full bg-[#7e3f25]">
            <Check className="size-[16px] text-white" />
            <p className="font-['Domine:Regular',sans-serif] text-[14px] text-white">Use video</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black flex flex-col relative size-full overflow-hidden">
      <div className="h-[32px] flex items-center justify-between px-[20px] shrink-0 z-10">
        <button onClick={() => navigate(-1)}>
          <X className="size-[24px] text-white" />
        </button>
        {state === 'recording' && (
          <div className="bg-red-500 rounded-full px-[10px] py-[4px] flex items-center gap-[6px]">
            <div className="size-[6px] rounded-full bg-white animate-pulse" />
            <p className="font-['Inter:Medium',sans-serif] text-[12px] text-white">
              0:{time.toString().padStart(2, '0')}
            </p>
          </div>
        )}
        <div className="size-[24px]" />
      </div>

      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 relative">
        <div className="text-center">
          <p className="text-[56px] mb-[8px]">📷</p>
          <p className="font-['Inter:Medium',sans-serif] text-[13px] text-white/60">
            {state === 'recording' ? 'Recording…' : 'Tap to record'}
          </p>
        </div>
      </div>

      <div className="h-[120px] flex items-center justify-center shrink-0">
        <button
          onClick={toggleRec}
          className={`size-[72px] rounded-full flex items-center justify-center transition-all ${state === 'recording' ? 'bg-white' : 'bg-white/20 border-4 border-white'}`}
        >
          <div className={`transition-all ${state === 'recording' ? 'size-[28px] rounded-[6px] bg-red-500' : 'size-[52px] rounded-full bg-red-500'}`} />
        </button>
      </div>
    </div>
  );
}
