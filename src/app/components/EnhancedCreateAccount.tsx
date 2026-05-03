import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp, HomeCountry } from './AppContext';
import { useT, LANGUAGES, Lang } from './i18n';
import { Check, ChevronRight, Shield, AlertCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { hasSeenTourOffer } from './tour-state';

// ── World countries list ───────────────────────────────────────────────────────
const WORLD_COUNTRIES: { name: string; flag: string }[] = [
  { name: 'Afghanistan',            flag: '🇦🇫' },
  { name: 'Albania',                flag: '🇦🇱' },
  { name: 'Algeria',                flag: '🇩🇿' },
  { name: 'Argentina',              flag: '🇦🇷' },
  { name: 'Australia',              flag: '🇦🇺' },
  { name: 'Austria',                flag: '🇦🇹' },
  { name: 'Bangladesh',             flag: '🇧🇩' },
  { name: 'Belgium',                flag: '🇧🇪' },
  { name: 'Bolivia',                flag: '🇧🇴' },
  { name: 'Botswana',               flag: '🇧🇼' },
  { name: 'Brazil',                 flag: '🇧🇷' },
  { name: 'Cambodia',               flag: '🇰🇭' },
  { name: 'Canada',                 flag: '🇨🇦' },
  { name: 'Chile',                  flag: '🇨🇱' },
  { name: 'China',                  flag: '🇨🇳' },
  { name: 'Colombia',               flag: '🇨🇴' },
  { name: 'Costa Rica',             flag: '🇨🇷' },
  { name: 'Croatia',                flag: '🇭🇷' },
  { name: 'Cuba',                   flag: '🇨🇺' },
  { name: 'Czech Republic',         flag: '🇨🇿' },
  { name: 'Denmark',                flag: '🇩🇰' },
  { name: 'Dominican Republic',     flag: '🇩🇴' },
  { name: 'Ecuador',                flag: '🇪🇨' },
  { name: 'Egypt',                  flag: '🇪🇬' },
  { name: 'El Salvador',            flag: '🇸🇻' },
  { name: 'Ethiopia',               flag: '🇪🇹' },
  { name: 'Finland',                flag: '🇫🇮' },
  { name: 'France',                 flag: '🇫🇷' },
  { name: 'Germany',                flag: '🇩🇪' },
  { name: 'Ghana',                  flag: '🇬🇭' },
  { name: 'Greece',                 flag: '🇬🇷' },
  { name: 'Guatemala',              flag: '🇬🇹' },
  { name: 'Honduras',               flag: '🇭🇳' },
  { name: 'Hungary',                flag: '🇭🇺' },
  { name: 'India',                  flag: '🇮🇳' },
  { name: 'Indonesia',              flag: '🇮🇩' },
  { name: 'Iran',                   flag: '🇮🇷' },
  { name: 'Iraq',                   flag: '🇮🇶' },
  { name: 'Ireland',                flag: '🇮🇪' },
  { name: 'Israel',                 flag: '🇮🇱' },
  { name: 'Italy',                  flag: '🇮🇹' },
  { name: 'Jamaica',                flag: '🇯🇲' },
  { name: 'Japan',                  flag: '🇯🇵' },
  { name: 'Jordan',                 flag: '🇯🇴' },
  { name: 'Kenya',                  flag: '🇰🇪' },
  { name: 'Malaysia',               flag: '🇲🇾' },
  { name: 'Mexico',                 flag: '🇲🇽' },
  { name: 'Morocco',                flag: '🇲🇦' },
  { name: 'Mozambique',             flag: '🇲🇿' },
  { name: 'Myanmar',                flag: '🇲🇲' },
  { name: 'Namibia',                flag: '🇳🇦' },
  { name: 'Nepal',                  flag: '🇳🇵' },
  { name: 'Netherlands',            flag: '🇳🇱' },
  { name: 'New Zealand',            flag: '🇳🇿' },
  { name: 'Nicaragua',              flag: '🇳🇮' },
  { name: 'Nigeria',                flag: '🇳🇬' },
  { name: 'Norway',                 flag: '🇳🇴' },
  { name: 'Pakistan',               flag: '🇵🇰' },
  { name: 'Panama',                 flag: '🇵🇦' },
  { name: 'Paraguay',               flag: '🇵🇾' },
  { name: 'Peru',                   flag: '🇵🇪' },
  { name: 'Philippines',            flag: '🇵🇭' },
  { name: 'Poland',                 flag: '🇵🇱' },
  { name: 'Portugal',               flag: '🇵🇹' },
  { name: 'Romania',                flag: '🇷🇴' },
  { name: 'Russia',                 flag: '🇷🇺' },
  { name: 'Saudi Arabia',           flag: '🇸🇦' },
  { name: 'Senegal',                flag: '🇸🇳' },
  { name: 'Serbia',                 flag: '🇷🇸' },
  { name: 'Singapore',              flag: '🇸🇬' },
  { name: 'South Africa',           flag: '🇿🇦' },
  { name: 'South Korea',            flag: '🇰🇷' },
  { name: 'Spain',                  flag: '🇪🇸' },
  { name: 'Sri Lanka',              flag: '🇱🇰' },
  { name: 'Sweden',                 flag: '🇸🇪' },
  { name: 'Switzerland',            flag: '🇨🇭' },
  { name: 'Tanzania',               flag: '🇹🇿' },
  { name: 'Thailand',               flag: '🇹🇭' },
  { name: 'Turkey',                 flag: '🇹🇷' },
  { name: 'Uganda',                 flag: '🇺🇬' },
  { name: 'Ukraine',                flag: '🇺🇦' },
  { name: 'United Arab Emirates',   flag: '🇦🇪' },
  { name: 'United Kingdom',         flag: '🇬🇧' },
  { name: 'United States',          flag: '🇺🇸' },
  { name: 'Uruguay',                flag: '🇺🇾' },
  { name: 'Venezuela',              flag: '🇻🇪' },
  { name: 'Vietnam',                flag: '🇻🇳' },
  { name: 'Zambia',                 flag: '🇿🇲' },
  { name: 'Zimbabwe',               flag: '🇿🇼' },
];

function mapToHomeCountry(name: string): HomeCountry {
  if (name === 'Namibia') return 'namibia';
  if (name === 'Guatemala') return 'guatemala';
  return 'usa';
}

// ── Demo personas per country (auto-fill form for smooth Figma demo) ──────────
const PERSONA: Record<HomeCountry, { firstName: string; lastName: string; email: string }> = {
  namibia:   { firstName: 'Michelle', lastName: 'McLean', email: 'michelle@pangea.app' },
  guatemala: { firstName: 'Oscar',    lastName: 'Isaac',  email: 'oscar@pangea.app' },
  usa:       { firstName: 'Jack',     lastName: 'Lalanne', email: 'jack@pangea.app' },
  other:     { firstName: '',         lastName: '',        email: '' },
};

// ── Content policy icons (text comes from i18n) ────────────────────────────────
const POLICY_ICONS = ['🚫', '❌', '🤝', '🌍', '✅'];
const POLICY_KEYS  = ['policy_1', 'policy_2', 'policy_3', 'policy_4', 'policy_5'] as const;

// ── Step type ──────────────────────────────────────────────────────────────────
type Step = 'country' | 'form' | 'age' | 'policy' | 'lang';

// ── Progress indicator ─────────────────────────────────────────────────────────
const STEPS: Step[] = ['country', 'form', 'age', 'policy', 'lang'];

function StepDots({ current }: { current: Step }) {
  const idx = STEPS.indexOf(current);
  return (
    <div className="flex items-center justify-center gap-[6px] shrink-0 pb-[2px]">
      {STEPS.map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === idx ? 20 : 7,
            height: 7,
            background: i <= idx ? '#C9633A' : 'rgba(201,99,58,0.2)',
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function EnhancedCreateAccount() {
  const navigate = useNavigate();
  const { login, language, setLanguage } = useApp();
  const t = useT();

  const [step, setStep]                   = useState<Step>('country');
  const [country, setCountry]             = useState<HomeCountry | null>(null);
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryList, setShowCountryList] = useState(true);
  const [form, setForm]                   = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [ageDenied, setAgeDenied]         = useState(false);
  const [policyAgreed, setPolicyAgreed]   = useState(false);
  const [chosenLang, setChosenLang]       = useState<Lang>(language);

  const isUSA = country === 'usa';

  const goBack = () => {
    const prev: Record<Step, Step | null> = {
      country: null, form: 'country', age: 'form', policy: 'age', lang: 'policy',
    };
    const p = prev[step];
    if (p) setStep(p);
    else navigate(-1);
  };

  const finish = () => {
    setLanguage(chosenLang);
    const firstName = form.firstName || 'Maya';
    const lastName  = form.lastName  || '';
    const displayName = lastName ? `${firstName} ${lastName}` : firstName;
    const handle = displayName.toLowerCase().replace(/\s+/g, '.');
    const regionMap: Record<HomeCountry, string> = {
      namibia:   'Windhoek, Namibia',
      guatemala: 'Guatemala City, Guatemala',
      usa:       'Kansas City, MO, USA',
      other:     'Somewhere in the world',
    };
    login({
      id:              handle,
      handle,
      displayName,
      homeRegion:      regionMap[country!],
      streak:          0,
      countriesUnlocked: 0,
      language:        chosenLang,
      homeCountry:     country!,
    });
    navigate(hasSeenTourOffer() ? '/home' : '/onboarding?source=signup');
  };

  // ── Age-denied gate ──────────────────────────────────────────────────────────
  if (ageDenied) {
    return (
      <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">
        <div className="flex-1 flex flex-col items-center justify-center px-[32px] text-center">
          <div className="size-[80px] rounded-full bg-[#C9633A]/15 flex items-center justify-center mb-[20px]">
            <AlertCircle className="size-[36px]" style={{ color: '#C9633A' }} />
          </div>
          <h2 className="font-['Fraunces:Regular',sans-serif] text-[24px] text-[#281e1b] mb-[10px]"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            {t('age_denied_title')}
          </h2>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] leading-relaxed mb-[28px]">
            {t('age_denied_body')}
          </p>
          <button onClick={() => navigate('/welcome')}
            className="rounded-[48px] px-[28px] py-[13px]"
            style={{ background: '#7e3f25' }}>
            <p className="font-['Domine:Regular',sans-serif] text-[15px] text-white">{t('back_to_welcome')}</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">

      {/* Nav bar */}
      <div className="h-[36px] flex items-center px-[20px] shrink-0">
        <button onClick={goBack}>
          <p className="font-['DM_Sans:Regular',sans-serif] text-[15px] text-[#281e1b]">← {t('back')}</p>
        </button>
      </div>

      <StepDots current={step} />

      <AnimatePresence mode="wait">

        {/* ── STEP 1: Country ─────────────────────────────────────────────── */}
        {step === 'country' && (
          <motion.div key="country"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="px-[20px] pt-[10px] pb-[10px] shrink-0">
              <h1 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] leading-[1.15]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                {t('where_from')}
              </h1>
            </div>
            {/* Search input */}
            <div className="px-[16px] pb-[8px] shrink-0">
              <div className="flex items-center gap-[8px] bg-white rounded-[12px] px-[12px] py-[11px]"
                style={{
                  border: selectedCountryName && !showCountryList
                    ? '1.5px solid rgba(201,99,58,0.5)'
                    : '1.5px solid rgba(201,99,58,0.18)',
                }}>
                {selectedCountryName && !showCountryList
                  ? <Check className="size-[15px] shrink-0" style={{ color: '#C9633A' }} />
                  : <Search className="size-[15px] shrink-0" style={{ color: '#C9633A' }} />
                }
                <input
                  value={countrySearch}
                  onChange={e => {
                    setCountrySearch(e.target.value);
                    setShowCountryList(true);
                  }}
                  onFocus={() => {
                    if (selectedCountryName && !showCountryList) {
                      setCountrySearch('');
                      setShowCountryList(true);
                    }
                  }}
                  placeholder={t('search_country')}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#b0a89f]"
                  style={{ color: selectedCountryName && !showCountryList ? '#7e3f25' : '#281e1b', fontWeight: selectedCountryName && !showCountryList ? 500 : 400 }}
                  readOnly={!!(selectedCountryName && !showCountryList)}
                />
                {showCountryList && countrySearch.length > 0 && (
                  <button onClick={() => setCountrySearch('')} className="text-[#b0a89f] text-[16px] leading-none">×</button>
                )}
              </div>
            </div>
            {/* Country list — hidden once a selection is confirmed */}
            {showCountryList && (
              <div className="flex-1 px-[16px] flex flex-col overflow-y-auto pb-[8px]">
                {(() => {
                  const filtered = WORLD_COUNTRIES.filter(c =>
                    c.name.toLowerCase().includes(countrySearch.toLowerCase())
                  );
                  if (filtered.length === 0) {
                    return (
                      <p className="text-center font-['Inter:Regular',sans-serif] text-[13px] text-[#b0a89f] mt-[24px]">
                        {t('no_matches')}
                      </p>
                    );
                  }
                  return filtered.map(c => {
                    const isSelected = selectedCountryName === c.name;
                    return (
                      <button key={c.name}
                        onClick={() => {
                          const mapped = mapToHomeCountry(c.name);
                          setCountry(mapped);
                          setSelectedCountryName(c.name);
                          setForm({ ...PERSONA[mapped], password: '' });
                          setCountrySearch(c.name);
                          setShowCountryList(false);
                        }}
                        className="flex items-center gap-[12px] px-[12px] py-[11px] rounded-[12px] transition-colors shrink-0"
                        style={{ background: isSelected ? 'rgba(201,99,58,0.1)' : 'transparent' }}
                      >
                        <span className="text-[22px] shrink-0">{c.flag}</span>
                        <p className={`flex-1 text-left font-['Inter:Regular',sans-serif] text-[14px] ${isSelected ? 'text-[#7e3f25]' : 'text-[#281e1b]'}`}
                          style={{ fontWeight: isSelected ? 500 : 400 }}>
                          {c.name}
                        </p>
                        {isSelected && <Check className="size-[16px] shrink-0" style={{ color: '#C9633A' }} />}
                      </button>
                    );
                  });
                })()}
              </div>
            )}
            {/* Spacer when list is hidden so continue button stays at bottom */}
            {!showCountryList && <div className="flex-1" />}
            <div className="px-[16px] pb-[24px] pt-[8px] shrink-0">
              <button onClick={() => country && setStep('form')}
                disabled={!country}
                className="rounded-[48px] w-full py-[14px] disabled:opacity-35 transition-opacity"
                style={{ background: '#7e3f25' }}>
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">{t('continue_btn')}</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Form (adapts per country) ───────────────────────────── */}
        {step === 'form' && (
          <motion.div key="form"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="px-[20px] pt-[10px] pb-[14px] shrink-0">
              <h1 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] leading-[1.15]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                {isUSA ? t('quick_setup') : t('create_account')}
              </h1>
              {isUSA && (
                <div className="flex items-center gap-[6px] mt-[6px] bg-[#C9633A]/10 rounded-[10px] px-[10px] py-[7px]">
                  <Shield className="size-[13px] shrink-0" style={{ color: '#C9633A' }} />
                  <p className="font-['Inter:Regular',sans-serif] text-[12px]" style={{ color: '#7e3f25' }}>
                    {t('privacy_note_usa')}
                  </p>
                </div>
              )}
            </div>
            <div className="flex-1 px-[16px] flex flex-col gap-[10px]">
              {isUSA ? (
                /* USA — minimal form */
                <>
                  <input value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    placeholder={t('first_name')}
                    className="bg-white rounded-[12px] px-[14px] py-[13px] text-[14px] text-[#281e1b] outline-none"
                  />
                  <input value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder={t('email')}
                    className="bg-white rounded-[12px] px-[14px] py-[13px] text-[14px] text-[#281e1b] outline-none"
                  />
                  <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] text-center px-[8px]">
                    {t('minimal_form_note')}
                  </p>
                </>
              ) : (
                /* Non-USA — full form */
                <>
                  <div className="grid grid-cols-2 gap-[10px]">
                    <input value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                      placeholder={t('first_name')}
                      className="bg-white rounded-[12px] px-[14px] py-[13px] text-[14px] text-[#281e1b] outline-none"
                    />
                    <input value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                      placeholder={t('last_name')}
                      className="bg-white rounded-[12px] px-[14px] py-[13px] text-[14px] text-[#281e1b] outline-none"
                    />
                  </div>
                  <input value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder={t('email')}
                    className="bg-white rounded-[12px] px-[14px] py-[13px] text-[14px] text-[#281e1b] outline-none"
                  />
                  <input value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    type="password" placeholder={t('password')}
                    className="bg-white rounded-[12px] px-[14px] py-[13px] text-[14px] text-[#281e1b] outline-none"
                  />
                </>
              )}
            </div>
            <div className="px-[16px] pb-[24px] pt-[12px] shrink-0 flex flex-col gap-[10px]">
              <button onClick={() => form.firstName.trim() && setStep('age')}
                disabled={!form.firstName.trim()}
                className="rounded-[48px] w-full py-[14px] disabled:opacity-35"
                style={{ background: '#7e3f25' }}>
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">{t('continue_btn')}</p>
              </button>
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] text-center">
                {t('already_have')}{' '}
                <button onClick={() => navigate('/sign-in')} className="text-[#7e3f25] underline">{t('sign_in')}</button>
              </p>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Age verification ─────────────────────────────────────── */}
        {step === 'age' && (
          <motion.div key="age"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col items-center justify-center px-[32px] text-center"
          >
            <div className="size-[88px] rounded-full flex items-center justify-center mb-[22px]"
              style={{ background: 'rgba(201,99,58,0.12)' }}>
              <p className="text-[44px]">🔞</p>
            </div>
            <h2 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] mb-[10px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
              {t('age_title')}
            </h2>
            <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] leading-relaxed mb-[32px] max-w-[260px]">
              {t('age_body')}
            </p>
            <div className="flex flex-col gap-[10px] w-full max-w-[280px]">
              <button onClick={() => setStep('policy')}
                className="rounded-[48px] w-full py-[14px]"
                style={{ background: '#7e3f25' }}>
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white">{t('age_yes')}</p>
              </button>
              <button onClick={() => setAgeDenied(true)}
                className="rounded-[48px] w-full py-[14px]"
                style={{ background: 'rgba(126,63,37,0.09)' }}>
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-[#7e3f25]">{t('age_no')}</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 4: Content policy ───────────────────────────────────────── */}
        {step === 'policy' && (
          <motion.div key="policy"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="px-[20px] pt-[10px] pb-[10px] shrink-0">
              <h1 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] leading-[1.15]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                {t('community_standards')}
              </h1>
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] mt-[4px]">
                {t('community_standards_body')}
              </p>
            </div>
            <div className="flex-1 px-[16px] flex flex-col gap-[8px] overflow-y-auto pb-[8px]">
              {POLICY_KEYS.map((key, i) => (
                <div key={key}
                  className="bg-white rounded-[14px] px-[14px] py-[13px] flex items-center gap-[12px]">
                  <span className="text-[22px] shrink-0">{POLICY_ICONS[i]}</span>
                  <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#281e1b] leading-snug">{t(key)}</p>
                </div>
              ))}

              {/* Agree checkbox */}
              <button
                onClick={() => setPolicyAgreed(a => !a)}
                className="flex items-center gap-[12px] py-[10px] px-[4px]"
              >
                <div
                  className="size-[22px] rounded-[6px] flex items-center justify-center shrink-0 transition-colors"
                  style={{ background: policyAgreed ? '#7e3f25' : 'white', border: policyAgreed ? 'none' : '2px solid rgba(126,63,37,0.3)' }}
                >
                  {policyAgreed && <Check className="size-[13px] text-white" />}
                </div>
                <p className="font-['Inter:Medium',sans-serif] text-[13px] text-[#281e1b] text-left">
                  {t('agree_standards')}
                </p>
              </button>
            </div>
            <div className="px-[16px] pb-[24px] shrink-0">
              <button onClick={() => policyAgreed && setStep('lang')}
                disabled={!policyAgreed}
                className="rounded-[48px] w-full py-[14px] disabled:opacity-35 transition-opacity"
                style={{ background: '#7e3f25' }}>
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">{t('agree_continue')}</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 5: Language ─────────────────────────────────────────────── */}
        {step === 'lang' && (
          <motion.div key="lang"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="px-[20px] pt-[10px] pb-[14px] shrink-0">
              <h1 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] leading-[1.15]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                {t('choose_language')}
              </h1>
            </div>
            <div className="flex-1 px-[16px] flex flex-col gap-[8px] overflow-y-auto pb-[16px]">
              {LANGUAGES.map(l => (
                <button key={l.code} onClick={() => setChosenLang(l.code)}
                  className="rounded-[16px] px-[16px] py-[14px] flex items-center gap-[12px]"
                  style={{ background: chosenLang === l.code ? '#7e3f25' : 'white' }}>
                  <span className="text-[24px]">{l.flag}</span>
                  <p className={`flex-1 text-left font-['Inter:Medium',sans-serif] text-[15px] ${chosenLang === l.code ? 'text-white' : 'text-[#281e1b]'}`}>
                    {l.label}
                  </p>
                  {chosenLang === l.code && <Check className="size-[18px] text-white" />}
                </button>
              ))}
            </div>
            <div className="px-[16px] pb-[24px] shrink-0">
              <button onClick={finish} className="rounded-[48px] w-full py-[14px]" style={{ background: '#7e3f25' }}>
                <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white text-center">{t('create')}</p>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
