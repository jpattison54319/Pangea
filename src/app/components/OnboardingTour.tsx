import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Bookmark, Captions, Flag, Globe2, Heart, MapPin, MessageCircle, Search, Settings, Trophy, User } from 'lucide-react';
import { useT } from './i18n';
import { markTourOffered, hasSeenTourOffer } from './tour-state';

type TourStep = {
  icon: 'pangea' | 'globe' | 'reels' | 'prompt' | 'hub';
  titleKey: string;
  bodyKey: string;
};

const TOUR_STEPS: TourStep[] = [
  { icon: 'pangea', titleKey: 'tour_step_1_title', bodyKey: 'tour_step_1_body' },
  { icon: 'globe', titleKey: 'tour_step_2_title', bodyKey: 'tour_step_2_body' },
  { icon: 'reels', titleKey: 'tour_step_3_title', bodyKey: 'tour_step_3_body' },
  { icon: 'prompt', titleKey: 'tour_step_4_title', bodyKey: 'tour_step_4_body' },
  { icon: 'hub', titleKey: 'tour_step_5_title', bodyKey: 'tour_step_5_body' },
];

export default function OnboardingTour() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const t = useT();
  const force = params.get('force') === '1';
  const [accepted, setAccepted] = useState(force);
  const [i, setI] = useState(0);

  const shouldBypass = useMemo(() => !force && hasSeenTourOffer(), [force]);
  const step = TOUR_STEPS[i];
  const last = i === TOUR_STEPS.length - 1;

  const finish = () => {
    markTourOffered();
    navigate('/home', { replace: true });
  };

  useEffect(() => {
    if (shouldBypass) navigate('/home', { replace: true });
  }, [navigate, shouldBypass]);

  if (shouldBypass) return null;

  if (!accepted) {
    return (
      <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 24%, rgba(201,99,58,0.14), transparent 34%), radial-gradient(circle at 50% 62%, rgba(31,107,107,0.10), transparent 42%)',
        }} />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-[28px] text-center">
          <Preview icon="pangea" />
          <p className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.16em] text-[#7e3f25] mb-[8px]">
            {t('tour_intro_label')}
          </p>
          <h1 className="font-['Fraunces:Regular',sans-serif] text-[30px] text-[#281e1b] leading-[1.12] mb-[10px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            {t('tour_offer_title')}
          </h1>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] leading-[1.55] max-w-[310px]">
            {t('tour_offer_body')}
          </p>
        </div>

        <div className="relative z-10 px-[16px] pb-[28px] flex flex-col gap-[10px] shrink-0">
          <button
            onClick={() => { markTourOffered(); setAccepted(true); }}
            className="min-h-[48px] rounded-[48px] w-full bg-[#7e3f25] px-[18px]"
          >
            <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">{t('tour_start')}</p>
          </button>
          <button
            onClick={finish}
            className="min-h-[48px] rounded-[48px] w-full bg-[rgba(126,63,37,0.09)] px-[18px]"
          >
            <p className="font-['Domine:Regular',sans-serif] text-[15px] text-[#7e3f25] text-center">{t('tour_skip')}</p>
          </button>
          <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6b6860] text-center px-[10px]">
            {t('tour_relaunch_hint')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(201,99,58,0.10), rgba(255,242,237,0) 34%), radial-gradient(circle at 50% 46%, rgba(31,107,107,0.10), transparent 44%)',
      }} />

      <div className="relative z-10 h-[52px] px-[16px] flex items-center justify-between shrink-0">
        <button
          onClick={() => i > 0 ? setI(i - 1) : setAccepted(false)}
          className="size-[44px] rounded-full flex items-center justify-center"
          aria-label={t('tour_back')}
        >
          <ArrowLeft className="size-[20px] text-[#281e1b]" />
        </button>
        <button onClick={finish} className="min-h-[44px] px-[10px] rounded-full">
          <p className="font-['Inter:Medium',sans-serif] text-[14px] text-[#6b6860]">{t('tour_skip')}</p>
        </button>
      </div>

      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-[28px] text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -34 }}
            transition={{ duration: 0.22 }}
            className="w-full flex flex-col items-center"
          >
            <Preview icon={step.icon} />
            <p className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.16em] text-[#7e3f25] mb-[8px]">
              {t('tour_progress').replace('{current}', String(i + 1)).replace('{total}', String(TOUR_STEPS.length))}
            </p>
            <h2 className="font-['Fraunces:Regular',sans-serif] text-[28px] text-[#281e1b] leading-[1.15] mb-[10px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
              {t(step.titleKey)}
            </h2>
            <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] leading-[1.55] max-w-[320px]">
              {t(step.bodyKey)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 px-[16px] pb-[28px] shrink-0">
        <div className="flex items-center justify-center gap-[8px] mb-[14px]">
          {TOUR_STEPS.map((_, idx) => (
            <div
              key={idx}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === i ? 24 : 8,
                height: 8,
                background: idx === i ? '#7e3f25' : 'rgba(126,63,37,0.25)',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => last ? finish() : setI(i + 1)}
          className="min-h-[48px] rounded-[48px] w-full bg-[#7e3f25] px-[18px]"
        >
          <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">
            {last ? t('tour_finish') : t('tour_next')}
          </p>
        </button>
      </div>
    </div>
  );
}

function Preview({ icon }: { icon: TourStep['icon'] }) {
  if (icon === 'globe') return <GlobePreview />;
  if (icon === 'reels') return <ReelsPreview />;
  if (icon === 'prompt') return <PromptPreview />;
  if (icon === 'hub') return <HubPreview />;
  return <PangeaPreview />;
}

function PangeaPreview() {
  return (
    <div className="relative w-[230px] h-[190px] mb-[24px]">
      <div className="absolute inset-x-[18px] top-[8px] h-[150px] rounded-full bg-[#1F6B6B] shadow-[0_20px_44px_rgba(31,107,107,0.24)] overflow-hidden">
        <div className="absolute top-[28px] left-[44px] w-[58px] h-[36px] rounded-[45%] bg-[#6b8f55] rotate-12" />
        <div className="absolute top-[78px] left-[118px] w-[50px] h-[32px] rounded-[45%] bg-[#6b8f55] -rotate-12" />
        <div className="absolute bottom-[24px] left-[62px] w-[38px] h-[26px] rounded-[45%] bg-[#6b8f55]" />
      </div>
      <div className="absolute bottom-[8px] left-[20px] right-[20px] bg-white rounded-[16px] px-[14px] py-[12px] shadow-lg text-left">
        <p className="font-['Fraunces:Regular',sans-serif] text-[18px] text-[#c9633a] leading-none">Pangea</p>
        <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] mt-[4px]">Local stories, shared prompts</p>
      </div>
    </div>
  );
}

function GlobePreview() {
  return (
    <div className="relative w-[230px] h-[190px] mb-[24px]">
      <div className="absolute inset-x-[22px] top-[4px] h-[166px] rounded-full bg-[#1F6B6B] shadow-[0_20px_44px_rgba(31,107,107,0.26)] overflow-hidden">
        <div className="absolute top-[28px] left-[36px] w-[70px] h-[42px] rounded-[45%] bg-[#5f8c5c] rotate-12" />
        <div className="absolute top-[80px] right-[32px] w-[58px] h-[36px] rounded-[45%] bg-[#5f8c5c] -rotate-6" />
        <div className="absolute inset-0 border border-white/20 rounded-full" />
      </div>
      {[
        ['top-[40px]', 'left-[58px]', 'Guatemala'],
        ['top-[82px]', 'right-[40px]', 'Ohio'],
        ['bottom-[28px]', 'left-[82px]', 'Namibia'],
      ].map(([y, x, label]) => (
        <div key={label} className={`absolute ${y} ${x} flex flex-col items-center`}>
          <MapPin className="size-[18px] fill-[#E8B04B] text-[#7e3f25]" />
          <span className="rounded-full bg-white/90 px-[7px] py-[3px] text-[9px] text-[#281e1b] shadow-sm">{label}</span>
        </div>
      ))}
    </div>
  );
}

function ReelsPreview() {
  return (
    <div className="relative w-[190px] h-[210px] mb-[24px] rounded-[24px] overflow-hidden shadow-[0_18px_36px_rgba(40,30,27,0.20)]" style={{ background: 'linear-gradient(160deg, #1F6B6B, #C9633A)' }}>
      <div className="absolute top-[14px] left-[12px] right-[12px] rounded-[14px] bg-black/35 px-[10px] py-[8px] text-left">
        <p className="text-[9px] uppercase tracking-[0.12em] text-[#E8B04B]">Today's prompt</p>
        <p className="text-[12px] text-white leading-snug">What food feels like home?</p>
      </div>
      <div className="absolute right-[12px] bottom-[42px] flex flex-col gap-[10px]">
        <Heart className="size-[20px] text-white" />
        <MessageCircle className="size-[20px] text-white" />
        <Bookmark className="size-[20px] text-white" />
        <Flag className="size-[19px] text-white" />
      </div>
      <div className="absolute left-[12px] right-[52px] bottom-[16px] text-left">
        <div className="inline-flex items-center gap-[5px] rounded-full bg-black/45 px-[7px] py-[3px] mb-[5px]">
          <Captions className="size-[11px] text-white" />
          <span className="text-[9px] text-white">Auto-captioned</span>
        </div>
        <p className="text-[12px] text-white leading-snug">You have to try this local spot.</p>
      </div>
    </div>
  );
}

function PromptPreview() {
  return (
    <div className="w-[230px] mb-[24px] rounded-[24px] bg-white shadow-[0_18px_36px_rgba(40,30,27,0.14)] p-[16px] text-left">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[#7e3f25] mb-[8px]">Daily prompt</p>
      <p className="font-['Fraunces:Regular',sans-serif] text-[20px] leading-[1.18] text-[#281e1b] mb-[12px]">What tradition do you want people to understand?</p>
      <div className="rounded-[14px] bg-[#fff2ed] px-[12px] py-[10px] flex items-center gap-[10px]">
        <div className="size-[36px] rounded-full bg-[#C9633A] flex items-center justify-center text-white">+</div>
        <div>
          <p className="text-[12px] text-[#281e1b] font-['Inter:Medium',sans-serif]">Share your answer</p>
          <p className="text-[10px] text-[#6b6860]">Compare voices around the world</p>
        </div>
      </div>
    </div>
  );
}

function HubPreview() {
  return (
    <div className="w-[238px] mb-[24px] rounded-[24px] bg-white shadow-[0_18px_36px_rgba(40,30,27,0.14)] overflow-hidden">
      <div className="p-[14px] flex items-center gap-[10px] border-b border-black/5">
        <Search className="size-[18px] text-[#7e3f25]" />
        <div className="h-[24px] flex-1 rounded-full bg-[#fff2ed]" />
      </div>
      <div className="p-[14px] grid grid-cols-3 gap-[8px]">
        <div className="rounded-[12px] bg-[#fff2ed] p-[10px] flex flex-col items-center gap-[5px]"><Globe2 className="size-[18px] text-[#1F6B6B]" /><span className="text-[9px]">Places</span></div>
        <div className="rounded-[12px] bg-[#fff2ed] p-[10px] flex flex-col items-center gap-[5px]"><Trophy className="size-[18px] text-[#E8B04B]" /><span className="text-[9px]">Trophies</span></div>
        <div className="rounded-[12px] bg-[#fff2ed] p-[10px] flex flex-col items-center gap-[5px]"><Settings className="size-[18px] text-[#7e3f25]" /><span className="text-[9px]">Tour</span></div>
      </div>
      <div className="h-[44px] bg-[#fff2ed] flex items-center justify-around">
        <Globe2 className="size-[18px] text-[#7e3f25]" />
        <Search className="size-[18px] text-[#6b6860]" />
        <User className="size-[18px] text-[#6b6860]" />
      </div>
    </div>
  );
}
