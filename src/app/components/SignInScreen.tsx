import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp, HomeCountry } from './AppContext';
import { useT } from './i18n';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const COUNTRIES: { id: HomeCountry; flag: string; label: string }[] = [
  { id: 'namibia',   flag: '🇳🇦', label: 'Namibia' },
  { id: 'guatemala', flag: '🇬🇹', label: 'Guatemala' },
  { id: 'usa',       flag: '🇺🇸', label: 'United States' },
  { id: 'other',     flag: '🌍',  label: 'Somewhere else' },
];

type Step = 'credentials' | 'location';

export default function SignInScreen() {
  const navigate = useNavigate();
  const { signIn } = useApp();
  const t = useT();

  const [step, setStep]         = useState<Step>('credentials');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry]   = useState<HomeCountry | null>(null);

  const submitCredentials = () => {
    if (!email.trim()) return;
    setStep('location');
  };

  const submitLocation = () => {
    signIn(email.trim(), country ?? 'usa');
    navigate('/home');
  };

  const socialSignIn = (stub: string) => {
    // Social sign-in skips to location step
    setEmail(stub);
    setStep('location');
  };

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">

      <div className="h-[36px] flex items-center px-[20px] shrink-0">
        <button onClick={() => step === 'location' ? setStep('credentials') : navigate(-1)}>
          <p className="font-['DM_Sans:Regular',sans-serif] text-[15px] text-[#281e1b]">← {t('back')}</p>
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* ── Step 1: Credentials ── */}
        {step === 'credentials' && (
          <motion.div
            key="credentials"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <div className="px-[20px] pb-[8px] shrink-0">
              <h1
                className="font-['Fraunces:Regular',sans-serif] text-[28px] text-[#281e1b] leading-[1.1]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                {t('welcome_back')}
              </h1>
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] mt-[4px]">
                {t('sign_in')}
              </p>
            </div>

            <div className="flex-1 px-[16px] pt-[12px] flex flex-col gap-[10px]">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('email')}
                className="bg-white rounded-[12px] px-[14px] py-[12px] text-[14px] outline-none"
              />
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder={t('password')}
                className="bg-white rounded-[12px] px-[14px] py-[12px] text-[14px] outline-none"
              />

              <button
                onClick={submitCredentials}
                className="bg-[#7e3f25] rounded-[48px] w-full py-[14px] mt-[4px]"
              >
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">
                  {t('sign_in')}
                </p>
              </button>

              <div className="flex items-center gap-[8px] my-[4px]">
                <div className="flex-1 h-px bg-black/10" />
                <p className="text-[12px] text-[#6b6860]">{t('continue_with')}</p>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              <div className="flex gap-[10px]">
                <button
                  onClick={() => socialSignIn('maya@google.com')}
                  className="flex-1 bg-white rounded-[12px] py-[12px] text-[14px] font-['Inter:Medium',sans-serif] text-[#281e1b]"
                >
                  Google
                </button>
                <button
                  onClick={() => socialSignIn('maya@apple.com')}
                  className="flex-1 bg-black rounded-[12px] py-[12px] text-[14px] font-['Inter:Medium',sans-serif] text-white"
                >
                  Apple
                </button>
                <button
                  onClick={() => socialSignIn('maya@facebook.com')}
                  className="flex-1 bg-[#1877f2] rounded-[12px] py-[12px] text-[14px] font-['Inter:Medium',sans-serif] text-white"
                >
                  Facebook
                </button>
              </div>
            </div>

            <div className="px-[16px] pb-[24px] shrink-0 text-center">
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860]">
                {t('no_account')}{' '}
                <button
                  onClick={() => navigate('/create-account')}
                  className="text-[#7e3f25] underline"
                >
                  {t('create_account')}
                </button>
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Location ── */}
        {step === 'location' && (
          <motion.div
            key="location"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="px-[20px] pt-[4px] pb-[14px] shrink-0">
              <h1
                className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] leading-[1.15]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                {t('where_from')}
              </h1>
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] mt-[4px]">
                {t('tailor_location')}
              </p>
            </div>

            <div className="flex-1 px-[16px] flex flex-col gap-[8px] overflow-y-auto pb-[16px]">
              {COUNTRIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCountry(c.id)}
                  className="rounded-[16px] px-[16px] py-[14px] flex items-center gap-[14px] transition-all"
                  style={{
                    background: country === c.id ? '#7e3f25' : 'white',
                    border: country === c.id ? '2px solid #7e3f25' : '2px solid transparent',
                  }}
                >
                  <span className="text-[28px]">{c.flag}</span>
                  <p
                    className="flex-1 text-left font-['Inter:Medium',sans-serif] text-[15px]"
                    style={{ color: country === c.id ? 'white' : '#281e1b' }}
                  >
                    {c.label}
                  </p>
                  {country === c.id && <Check className="size-[18px] text-white shrink-0" />}
                </button>
              ))}
            </div>

            <div className="px-[16px] pb-[28px] shrink-0 flex flex-col gap-[10px]">
              <button
                onClick={submitLocation}
                disabled={!country}
                className="rounded-[48px] w-full py-[14px] disabled:opacity-35 transition-opacity"
                style={{ background: '#7e3f25' }}
              >
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">
                  {t('lets_go')}
                </p>
              </button>
              <button
                onClick={() => { setCountry('other'); submitLocation(); }}
                className="rounded-[48px] w-full py-[12px]"
                style={{ background: 'rgba(126,63,37,0.08)' }}
              >
                <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#7e3f25] text-center">
                  {t('skip_for_now')}
                </p>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}