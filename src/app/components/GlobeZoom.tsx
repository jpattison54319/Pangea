import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import { useT } from './i18n';

type DrillStep = { label: string; sub: string; emoji: string; next?: { id: string; label: string; emoji: string }[] };

// Drill-down tree: region -> country view -> state view -> city -> reel
const DRILL: Record<string, DrillStep[]> = {
  'usa': [
    { label: 'United States', sub: 'Pick a state', emoji: '🇺🇸', next: [
      { id: 'illinois', label: 'Illinois', emoji: '🏙️' },
      { id: 'iowa', label: 'Iowa', emoji: '🌽' },
      { id: 'ohio', label: 'Ohio', emoji: '🌰' },
      { id: 'missouri', label: 'Missouri', emoji: '🌽' },
      { id: 'california', label: 'California', emoji: '🌴' },
      { id: 'ny', label: 'New York', emoji: '🗽' },
    ]},
    // Each state becomes its own step after selection
    { label: 'Illinois', sub: 'Pick a city', emoji: '🏙️', next: [
      { id: 'chicago', label: 'Chicago', emoji: '🏙️' },
    ]},
    { label: 'Iowa', sub: 'Pick a city', emoji: '🌽', next: [
      { id: 'des-moines', label: 'Des Moines', emoji: '🏛️' },
      { id: 'iowa-city', label: 'Iowa City', emoji: '📚' },
    ]},
    { label: 'Ohio', sub: 'Pick a city', emoji: '🌰', next: [
      { id: 'columbus', label: 'Columbus', emoji: '🏛️' },
      { id: 'cleveland', label: 'Cleveland', emoji: '🎸' },
    ]},
    { label: 'Missouri', sub: 'Pick a city', emoji: '🌽', next: [
      { id: 'kansas-city', label: 'Kansas City', emoji: '🥩' },
    ]},
    { label: 'California', sub: 'Pick a city', emoji: '🌴', next: [
      { id: 'sf', label: 'San Francisco', emoji: '🌉' },
    ]},
    { label: 'New York', sub: 'Pick a city', emoji: '🗽', next: [
      { id: 'nyc', label: 'New York City', emoji: '🗽' },
    ]},
    { label: 'Loading stories', sub: '', emoji: '🏛️' },
  ],
  'japan': [{ label: 'Japan', sub: 'Tokyo', emoji: '🗼' }],
  'iceland': [
    { label: 'Iceland', sub: 'Pick a city', emoji: '🇮🇸', next: [
      { id: 'reykjavik', label: 'Reykjavik', emoji: '🌋' },
      { id: 'akureyri', label: 'Akureyri', emoji: '🏔️' },
    ]},
    { label: 'Loading stories', sub: '', emoji: '🌋' },
  ],
  'guatemala': [
    { label: 'Guatemala', sub: 'Pick a destination', emoji: '🇬🇹', next: [
      { id: 'antigua', label: 'Antigua', emoji: '🌋' },
      { id: 'tikal', label: 'Tikal', emoji: '🗿' },
      { id: 'atitlan', label: 'Atitlán', emoji: '🛶' },
      { id: 'semuc', label: 'Semuc Champey', emoji: '💦' },
      { id: 'huehue', label: 'Huehuetenango', emoji: '🖐️' },
    ]},
    { label: 'Loading stories', sub: '', emoji: '🇬🇹' },
  ],
  'namibia': [
    { label: 'Namibia', sub: 'Pick a location', emoji: '🇳🇦', next: [
      { id: 'windhoek', label: 'Windhoek', emoji: '🏙️' },
      { id: 'swakopmund', label: 'Swakopmund', emoji: '🌊' },
      { id: 'luderitz', label: 'Lüderitz', emoji: '⚓' },
      { id: 'tsumeb', label: 'North Namibia', emoji: '☄️' },
      { id: 'oshakati', label: 'Oshakati', emoji: '🏪' },
    ]},
    { label: 'Loading stories', sub: '', emoji: '🇳🇦' },
  ],
  'portugal': [
    { label: 'Portugal', sub: 'Pick a city', emoji: '🇵🇹', next: [
      { id: 'lisbon', label: 'Lisbon', emoji: '🚃' },
      { id: 'porto', label: 'Porto', emoji: '🍷' },
    ]},
    { label: 'Loading stories', sub: '', emoji: '🇵🇹' },
  ],
  'india': [{ label: 'India', sub: 'Jaipur', emoji: '🕌' }],
  'brazil': [{ label: 'Brazil', sub: 'Rio de Janeiro', emoji: '🏖️' }],
  'egypt': [
    { label: 'Egypt', sub: 'Pick a city', emoji: '🇪🇬', next: [
      { id: 'cairo', label: 'Cairo', emoji: '🕌' },
      { id: 'luxor', label: 'Luxor', emoji: '🏺' },
    ]},
    { label: 'Loading stories', sub: '', emoji: '🇪🇬' },
  ],
  'kazakhstan': [{ label: 'Kazakhstan', sub: 'Astana', emoji: '🚀' }],
  'mexico': [{ label: 'Mexico', sub: 'Guadalajara', emoji: '🇲🇽' }],
};

// Mapping from state/country IDs to city reel IDs
const CITY_MAP: Record<string, string[]> = {
  'illinois': ['chicago'],
  'iowa': ['des-moines', 'iowa-city'],
  'ohio': ['columbus', 'cleveland'],
  'missouri': ['kansas-city'],
  'california': ['sf'],
  'ny': ['nyc'],
};

export default function GlobeZoom() {
  const navigate = useNavigate();
  const { region } = useParams<{ region: string }>();
  const { unlockRegion } = useApp();
  const t = useT();

  const steps = (region && DRILL[region]) || DRILL['kansas-city'];
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // For USA: after picking a state, find the matching state step
  const step = steps[stepIdx];
  const isFinal = !step.next;

  useEffect(() => {
    if (region) unlockRegion(region);
  }, [region]);

  // Navigate based on selection
  const handleCityPick = (cityId: string) => {
    // Determine the actual reel route
    let reelId = cityId;
    
    // Map state IDs to their city if needed (USA states)
    const stateCities = CITY_MAP[cityId];
    if (stateCities && stateCities.length >= 1) {
      if (stateCities.length === 1) {
        // Single city: navigate directly
        reelId = stateCities[0];
      } else {
        // Multiple cities: advance to city pick step
        setSelectedId(cityId);
        setStepIdx(stepIdx + 1);
        return;
      }
    }
    
    navigate(`/reel/${reelId}`, { state: { from: 'globe' } });
  };

  // Auto-navigate for single-step countries (no city pick)
  useEffect(() => {
    if (isFinal && !selectedId) {
      const to = setTimeout(() => navigate(`/reel/${region}`, { state: { from: 'globe' } }), 1400);
      return () => clearTimeout(to);
    }
  }, [isFinal, region, selectedId]);

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">
      <div className="h-[32px] flex items-center px-[20px] shrink-0">
        <button onClick={() => stepIdx > 0 ? setStepIdx(stepIdx - 1) : navigate('/home')}>
          <p className="font-['DM_Sans:Regular',sans-serif] text-[15px] text-[#281e1b]">← {t('back')}</p>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIdx}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex-1 flex flex-col items-center justify-center px-[24px] text-center"
        >
          <div
            className="size-[140px] rounded-full flex items-center justify-center mb-[20px]"
            style={{ background: 'radial-gradient(circle at 30% 30%, #4aa8b8 0%, #1F6B6B 55%, #0a3535 100%)' }}
          >
            <p className="text-[60px]">{step.emoji}</p>
          </div>
          <h2 className="font-['Fraunces:Regular',sans-serif] text-[30px] text-[#c9633a] leading-[1.1]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            {step.label}
          </h2>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] mt-[4px]">
            {step.next ? (stepIdx === 0 ? t('select_state') : t('select_city')) : t('zoom_loading')}
          </p>

          {step.next ? (
            <div className="grid grid-cols-2 gap-[10px] mt-[24px] w-full max-w-[320px]">
              {step.next.map(n => (
                <button
                  key={n.id}
                  onClick={() => handleCityPick(n.id)}
                  className="bg-white rounded-[14px] p-[14px] flex flex-col items-center gap-[4px] shadow-sm"
                >
                  <p className="text-[28px]">{n.emoji}</p>
                  <p className="font-['Inter:Medium',sans-serif] text-[13px] text-[#281e1b]">{n.label}</p>
                </button>
              ))}
            </div>
          ) : (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-[20px]"
            >
              <p className="text-[28px]">{step.emoji}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
