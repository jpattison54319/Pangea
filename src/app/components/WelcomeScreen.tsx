import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useT, LANGUAGES } from './i18n';
import { useApp } from './AppContext';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const t = useT();
  const { language, setLanguage } = useApp();
  return (
    <div className="bg-[#fff2ed] flex flex-col items-center relative size-full overflow-hidden">

      {/* Language picker — top right */}
      <div className="absolute top-[36px] right-[16px] flex gap-[6px] z-10">
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            onClick={() => setLanguage(l.code)}
            className="text-[20px] transition-opacity"
            style={{ opacity: language === l.code ? 1 : 0.4 }}
          >
            {l.flag}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-[32px] text-center w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="size-[140px] rounded-full mb-[28px] relative overflow-hidden"
          style={{ background: 'radial-gradient(circle at 30% 30%, #4aa8b8 0%, #1F6B6B 55%, #0a3535 100%)' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div className="absolute top-[22%] left-[30%] w-[40px] h-[26px] bg-[#3a7a4a] rounded-[40%] rotate-12" />
            <div className="absolute top-[48%] left-[55%] w-[32px] h-[20px] bg-[#3a7a4a] rounded-[40%] -rotate-6" />
            <div className="absolute top-[62%] left-[18%] w-[24px] h-[18px] bg-[#3a7a4a] rounded-[40%]" />
          </motion.div>
        </motion.div>

        <h1 className="font-['Fraunces:Regular',sans-serif] text-[44px] text-[#c9633a] mb-[10px] leading-[1]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          Pangea
        </h1>
        <p className="font-['Inter:Regular',sans-serif] text-[16px] text-[#281e1b] leading-[1.4] max-w-[280px]">
          {t('tagline')}
        </p>
      </div>

      <div className="w-full px-[16px] pb-[28px] flex flex-col gap-[10px] shrink-0">
        <button
          onClick={() => navigate('/create-account')}
          className="bg-[#7e3f25] rounded-[48px] w-full py-[14px] shadow-[0px_8px_16px_-2px_rgba(0,0,0,0.15)]"
        >
          <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">{t('create_account')}</p>
        </button>
        <button
          onClick={() => navigate('/sign-in')}
          className="bg-[rgba(126,63,37,0.09)] rounded-[48px] w-full py-[14px]"
        >
          <p className="font-['Domine:Regular',sans-serif] text-[16px] text-[#7e3f25] text-center">{t('sign_in')}</p>
        </button>
        <button onClick={() => navigate('/home')} className="w-full py-[8px]">
          <p className="font-['Inter:Medium',sans-serif] text-[13px] text-[#6b6860] text-center underline">
            {t('explore_guest')}
          </p>
        </button>
      </div>
    </div>
  );
}