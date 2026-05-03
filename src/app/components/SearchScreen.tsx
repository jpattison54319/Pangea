import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Search as SearchIcon, User, Home, MapPin, Globe as GlobeIcon } from 'lucide-react';
import { useT, getQuestions } from './i18n';
import { useApp } from './AppContext';
import { MOCK, searchLocations } from './videos';

const CATEGORY_IDS = [
  { id: 'food',       key: 'category_food',       icon: '🍲' },
  { id: 'traditions', key: 'category_traditions',  icon: '🎎' },
  { id: 'daily-life', key: 'category_daily_life',  icon: '🏠' },
  { id: 'music',      key: 'category_music',       icon: '🎵' },
  { id: 'festivals',  key: 'category_festivals',   icon: '🎉' },
  { id: 'language',   key: 'category_language',    icon: '💬' },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const restoredSearch = (location.state as { searchReturn?: { q?: string } } | null)?.searchReturn;
  const { language } = useApp();
  const t = useT();
  const [q, setQ] = useState(restoredSearch?.q || '');
  const questions = getQuestions(language);
  const reelState = useMemo(() => ({ from: 'search', searchReturn: { q } }), [q]);

  const featuredPrompts = useMemo(
    () => questions
      .map((text, index) => ({
        text,
        index,
        count: MOCK.filter(video => video.questionKey === index).length,
      }))
      .filter(prompt => prompt.count > 0)
      .filter(prompt => prompt.text.toLowerCase().includes(q.toLowerCase())),
    [q, questions]
  );

  const locationResults = useMemo(() => searchLocations(q), [q]);

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">

      <div className="px-[16px] pb-[8px] shrink-0">
        <h1 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] mb-[10px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          {t('search')}
        </h1>
        <div className="bg-white rounded-[24px] px-[14px] py-[10px] flex items-center gap-[10px] shadow-sm">
          <SearchIcon className="size-[18px] text-[#6b6860]" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={t('search_placeholder')}
            className="flex-1 font-['Inter:Regular',sans-serif] text-[14px] text-[#281e1b] outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="px-[16px] mt-[10px] shrink-0">
        <p className="font-['Inter:Medium',sans-serif] text-[11px] text-[#6b6860] mb-[8px] uppercase tracking-wide">{t('browse_by')}</p>
        <div className="grid grid-cols-3 gap-[8px]">
          {CATEGORY_IDS.map(c => (
            <button
              key={c.id}
              onClick={() => navigate(`/reel?category=${c.id}`, { state: reelState })}
              className="bg-white rounded-[12px] px-[8px] py-[10px] flex flex-col items-center gap-[2px] shadow-sm"
            >
              <span className="text-[20px]">{c.icon}</span>
              <p className="font-['Inter:Medium',sans-serif] text-[11px] text-[#281e1b]">{t(c.key)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-[16px] mt-[14px] flex-1 overflow-hidden flex flex-col min-h-0">
        {q.trim() && locationResults.length > 0 && (
          <>
            <p className="font-['Inter:Medium',sans-serif] text-[11px] text-[#6b6860] mb-[8px] uppercase tracking-wide shrink-0">{t('locations')}</p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] mb-[8px] shrink-0">{t('demo_places_hint')}</p>
            <div className="flex flex-col gap-[8px] mb-[12px] shrink-0">
              {locationResults.map((r, i) => (
                <button key={i} onClick={() => navigate(`/reel?q=${encodeURIComponent(r.query)}`, { state: reelState })} className="bg-white rounded-[12px] p-[12px] text-left shadow-sm flex items-center gap-[10px]">
                  {r.kind === 'country' ? <GlobeIcon className="size-[16px] text-[#1F6B6B] shrink-0" /> : <MapPin className="size-[16px] text-[#C9633A] shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter:Medium',sans-serif] text-[13px] text-[#281e1b] leading-[1.3]">{r.label}</p>
                    <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860]">{r.count} {r.count === 1 ? t('post_singular') : t('post_plural')} · {r.kind}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
        <p className="font-['Inter:Medium',sans-serif] text-[11px] text-[#6b6860] mb-[4px] uppercase tracking-wide shrink-0">{t('featured_prompts')}</p>
        <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] mb-[8px] shrink-0">{t('featured_prompts_sub')}</p>
        <div className="flex-1 overflow-y-auto flex flex-col gap-[8px] pb-[8px]">
          {featuredPrompts.map(({ text, index, count }) => (
            <button key={index} onClick={() => navigate(`/reel?question=${index}`, { state: reelState })} className="bg-white rounded-[12px] p-[12px] text-left shadow-sm shrink-0">
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#281e1b] leading-[1.4]">{text}</p>
              <p className="font-['Inter:Medium',sans-serif] text-[11px] text-[#7e3f25] mt-[6px]">
                {count} {count === 1 ? t('story_singular') : t('story_plural')} · {t('across_world')}
              </p>
            </button>
          ))}
          {featuredPrompts.length === 0 && locationResults.length === 0 && (
            <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] text-center py-[16px]">{t('no_matches')}</p>
          )}
        </div>
      </div>

      <div className="h-[60px] bg-white shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.08)] flex items-center justify-around shrink-0">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-[2px]">
          <Home className="size-[22px] text-[rgba(0,0,0,0.5)]" />
          <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">{t('globe')}</p>
        </button>
        <button className="flex flex-col items-center gap-[2px]">
          <SearchIcon className="size-[22px] text-[#7e3f25]" />
          <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[#7e3f25]">{t('search')}</p>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-[2px]">
          <User className="size-[22px] text-[rgba(0,0,0,0.5)]" />
          <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">{t('profile')}</p>
        </button>
      </div>
    </div>
  );
}
