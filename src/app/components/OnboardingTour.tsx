import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, HomeCountry } from './AppContext';
import { useT, getSlideContent } from './i18n';

type Slide = { emoji: string; bg: string };

const SLIDE_META: Record<HomeCountry, Slide[]> = {
  namibia: [
    { emoji: '🌿', bg: '#1F6B6B' },
    { emoji: '🤝', bg: '#C9633A' },
    { emoji: '🏆', bg: '#7e3f25' },
  ],
  guatemala: [
    { emoji: '🌍', bg: '#1F6B6B' },
    { emoji: '🔔', bg: '#C9633A' },
    { emoji: '🏆', bg: '#7e3f25' },
  ],
  usa: [
    { emoji: '🌍', bg: '#1F6B6B' },
    { emoji: '⭐', bg: '#C9633A' },
    { emoji: '🏆', bg: '#7e3f25' },
  ],
  other: [
    { emoji: '🌍', bg: '#1F6B6B' },
    { emoji: '⭐', bg: '#C9633A' },
    { emoji: '🏆', bg: '#7e3f25' },
  ],
};

export default function OnboardingTour() {
  const navigate = useNavigate();
  const { language, user } = useApp();
  const t = useT();
  const [i, setI] = useState(0);

  const country: HomeCountry = user?.homeCountry ?? 'other';
  const slides = SLIDE_META[country];
  const last = i === slides.length - 1;
  const s = slides[i];
  const content = getSlideContent(language, country, i);

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">
      <div className="h-[32px] flex items-center justify-end px-[20px] shrink-0">
        <button onClick={() => navigate('/home')}>
          <p className="font-['Inter:Medium',sans-serif] text-[14px] text-[#6b6860]">{t('onboard_skip')}</p>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-[32px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              className="size-[140px] rounded-full flex items-center justify-center mb-[24px]"
              style={{ background: s.bg }}
              animate={{ background: s.bg }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[60px]">{s.emoji}</p>
            </motion.div>
            <h2
              className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] mb-[10px] leading-[1.2]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              {content.title}
            </h2>
            <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] leading-[1.55] max-w-[280px]">
              {content.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-[8px] pb-[12px] shrink-0">
        {slides.map((_, idx) => (
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

      <div className="px-[16px] pb-[28px] shrink-0">
        <button
          onClick={() => last ? navigate('/home') : setI(i + 1)}
          className="rounded-[48px] w-full py-[14px]"
          style={{ background: '#7e3f25' }}
        >
          <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">
            {last ? t('onboard_start') : t('onboard_next')}
          </p>
        </button>
      </div>
    </div>
  );
}