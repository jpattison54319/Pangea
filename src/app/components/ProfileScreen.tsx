import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp, TROPHIES, WEEKLY_MISSIONS, calcLevel, xpInCurrentLevel, XP_PER_LEVEL } from './AppContext';
import { Settings, MapPin, Flame, Globe as GlobeIcon, Home, Search as SearchIcon, User, Star, Lock, Users, MessageSquare, BookOpen, ChevronRight, X } from 'lucide-react';
import { useT } from './i18n';
import SettingsSheet from './SettingsScreen';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK } from './videos';

type Tab = 'posts' | 'favorites' | 'saved' | 'trophies';
type DetailSheet = 'streak' | 'countries';

const MOCK_POSTS = [
  { id: '1', emoji: '🍔', views: 1234 },
  { id: '2', emoji: '🌆', views: 892 },
  { id: '3', emoji: '☕', views: 2156 },
  { id: '4', emoji: '🎸', views: 421 },
  { id: '5', emoji: '🌅', views: 3102 },
  { id: '6', emoji: '🚲', views: 678 },
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    user, isAuthenticated, unlockedRegions,
    xp, level, earnedTrophies, likedVideos, savedVideos,
    questionsAnsweredTotal, userCommentsTotal,
  } = useApp();
  const isNamibia = user?.homeCountry === 'namibia';
  const t = useT();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [detailSheet, setDetailSheet] = useState<DetailSheet | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [expandedTrophy, setExpandedTrophy] = useState<string | null>(null);

  const isOwn = !userId || userId === user?.id || userId === user?.handle;
  const profile = isOwn && user
    ? { handle: user.handle, displayName: user.displayName, home: user.homeRegion, streak: user.streak || 3, countries: unlockedRegions.size }
    : { handle: userId || 'maya.kc', displayName: userId?.split('.')[0]?.replace(/^./, c => c.toUpperCase()) || 'Maya', home: 'Kansas City, MO, USA', streak: 15, countries: 8 };

  if (!isAuthenticated && isOwn) {
    return (
      <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">
        <div className="flex-1 flex flex-col items-center justify-center px-[32px] text-center">
          <div className="size-[80px] rounded-full bg-[#E8B04B]/30 flex items-center justify-center mb-[20px]">
            <p className="text-[36px]">👤</p>
          </div>
          <h2 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b] mb-[8px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{t('create_account')}</h2>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] mb-[24px]">{t('create_account_gate_body')}</p>
          <button onClick={() => navigate('/create-account')} className="bg-[#7e3f25] rounded-[48px] px-[40px] py-[14px] w-full max-w-[280px] mb-[10px]">
            <p className="font-['Domine:Regular',sans-serif] text-[15px] text-white">{t('create_account')}</p>
          </button>
          <button onClick={() => navigate('/sign-in')} className="bg-[rgba(126,63,37,0.09)] rounded-[48px] px-[40px] py-[14px] w-full max-w-[280px]">
            <p className="font-['Domine:Regular',sans-serif] text-[15px] text-[#7e3f25]">{t('sign_in')}</p>
          </button>
        </div>
        <BottomNav navigate={navigate} t={t} />
      </div>
    );
  }

  const likedVideosList = MOCK.filter(v => likedVideos.has(v.id));
  const savedVideosList = MOCK.filter(v => savedVideos.has(v.id));

  const missionProgress: Record<string, number> = {
    'answer-questions': Math.min(questionsAnsweredTotal, 5),
    'like-posts': Math.min(likedVideos.size, 10),
    'comment-posts': Math.min(userCommentsTotal, 3),
    'unlock-countries': Math.min(unlockedRegions.size, 2),
  };

  const xpProgress = xpInCurrentLevel(xp);
  const xpPercent = (xpProgress / XP_PER_LEVEL) * 100;

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">

      {isOwn && (
        <div className="h-[44px] flex items-center justify-end px-[20px] shrink-0">
          <button onClick={() => setSettingsOpen(true)} className="size-[44px] rounded-full flex items-center justify-center">
            <Settings className="size-[20px] text-[#281e1b]" />
          </button>
        </div>
      )}

      {/* ── Profile header ── */}
      <div className="px-[20px] pt-[4px] pb-[10px] shrink-0">
        {/* Avatar row */}
        <div className="flex items-center gap-[14px] mb-[10px]">
          <div className="relative shrink-0">
            <div className="size-[64px] rounded-full bg-[#E8B04B] flex items-center justify-center">
              <p className="font-['Fraunces:Regular',sans-serif] text-[26px] text-white">{profile.displayName[0]}</p>
            </div>
            {/* Namibia: community leaf badge · Others: level badge */}
            {isNamibia ? (
              <div className="absolute -bottom-[5px] -right-[5px] bg-[#1F6B6B] rounded-full size-[24px] flex items-center justify-center border-2 border-[#fff2ed] shadow-sm">
                <span className="text-[11px] leading-none">🌿</span>
              </div>
            ) : (
              <div className="absolute -bottom-[5px] -right-[5px] bg-[#7e3f25] rounded-full min-w-[24px] h-[24px] flex items-center justify-center px-[5px] border-2 border-[#fff2ed] shadow-sm">
                <p className="font-['Inter:Bold',sans-serif] text-[10px] text-white leading-none">{level}</p>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-['Fraunces:Regular',sans-serif] text-[20px] text-[#281e1b] leading-[1.1]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{profile.displayName}</h2>
            <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860]">@{profile.handle}</p>
            <div className="flex items-center gap-[4px] mt-[2px]">
              <MapPin className="size-[12px] text-[#6b6860]" />
              <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860]">{profile.home}</p>
            </div>
          </div>
        </div>

        {/* Namibia: Community Impact bar · Others: XP progress bar */}
        {isNamibia ? (
          <div
            className="mb-[10px] rounded-[12px] px-[14px] py-[11px]"
            style={{ background: 'rgba(31,107,107,0.08)', border: '1px solid rgba(31,107,107,0.18)' }}
          >
            <div className="flex items-center gap-[6px] mb-[8px]">
              <Users className="size-[13px]" style={{ color: '#1F6B6B' }} />
              <p className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.1em]" style={{ color: '#1F6B6B' }}>
                {t('community_impact')}
              </p>
            </div>
            <div className="flex gap-[16px]">
              <div className="flex items-center gap-[6px]">
                <BookOpen className="size-[14px]" style={{ color: '#1F6B6B' }} />
                <div>
                  <p className="font-['Fraunces:Bold',sans-serif] text-[18px] leading-[1]" style={{ color: '#1F6B6B' }}>
                    {questionsAnsweredTotal}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('stories_shared')}</p>
                </div>
              </div>
              <div className="flex items-center gap-[6px]">
                <MessageSquare className="size-[14px]" style={{ color: '#1F6B6B' }} />
                <div>
                  <p className="font-['Fraunces:Bold',sans-serif] text-[18px] leading-[1]" style={{ color: '#1F6B6B' }}>
                    {userCommentsTotal}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('voices_added')}</p>
                </div>
              </div>
              <div className="flex items-center gap-[6px]">
                <GlobeIcon className="size-[14px]" style={{ color: '#1F6B6B' }} />
                <div>
                  <p className="font-['Fraunces:Bold',sans-serif] text-[18px] leading-[1]" style={{ color: '#1F6B6B' }}>
                    {unlockedRegions.size}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('cultures_reached')}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-[10px]">
            <div className="flex items-center justify-between mb-[5px]">
              <div className="flex items-center gap-[5px]">
                <Star className="size-[12px] text-[#E8B04B] fill-[#E8B04B]" />
                <p className="font-['Inter:Medium',sans-serif] text-[11px] text-[#6b6860]">Level {level}</p>
              </div>
              <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860]">{xpProgress} / {XP_PER_LEVEL} XP</p>
            </div>
            <div className="h-[7px] bg-[#E8B04B]/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#E8B04B] to-[#C9633A]"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="flex gap-[6px]">
          {isNamibia ? (
            /* Namibia stats: streak + trophies (community recognition) */
            <>
              <button onClick={() => setDetailSheet('streak')} className="flex-1 min-h-[48px] bg-white rounded-[12px] px-[10px] py-[9px] flex items-center gap-[7px] text-left">
                <Flame className="size-[17px] text-[#C9633A] fill-[#C9633A]" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Fraunces:Bold',sans-serif] text-[17px] text-[#c9633a] leading-[1]">{profile.streak}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('day_streak_label')}</p>
                </div>
                <ChevronRight className="size-[13px] text-[#6b6860]" />
              </button>
              <button onClick={() => setActiveTab('trophies')} className="flex-1 min-h-[48px] bg-white rounded-[12px] px-[10px] py-[9px] flex items-center gap-[7px] text-left">
                <span className="text-[17px]">🤝</span>
                <div className="flex-1 min-w-0">
                  <p className="font-['Fraunces:Bold',sans-serif] text-[17px] text-[#1F6B6B] leading-[1]">{earnedTrophies.size}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('honours')}</p>
                </div>
                <ChevronRight className="size-[13px] text-[#6b6860]" />
              </button>
            </>
          ) : (
            /* USA / Guatemala / Other stats */
            <>
              <button onClick={() => setDetailSheet('streak')} className="flex-1 min-h-[48px] bg-white rounded-[12px] px-[10px] py-[9px] flex items-center gap-[7px] text-left">
                <Flame className="size-[17px] text-[#C9633A] fill-[#C9633A]" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Fraunces:Bold',sans-serif] text-[17px] text-[#c9633a] leading-[1]">{profile.streak}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('streak')}</p>
                </div>
                <ChevronRight className="size-[13px] text-[#6b6860]" />
              </button>
              <button onClick={() => setDetailSheet('countries')} className="flex-1 min-h-[48px] bg-white rounded-[12px] px-[10px] py-[9px] flex items-center gap-[7px] text-left">
                <GlobeIcon className="size-[17px] text-[#1F6B6B]" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Fraunces:Bold',sans-serif] text-[17px] text-[#1F6B6B] leading-[1]">{profile.countries}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('countries')}</p>
                </div>
                <ChevronRight className="size-[13px] text-[#6b6860]" />
              </button>
              <button onClick={() => setActiveTab('trophies')} className="flex-1 min-h-[48px] bg-white rounded-[12px] px-[10px] py-[9px] flex items-center gap-[7px] text-left">
                <span className="text-[17px]">🏆</span>
                <div className="flex-1 min-w-0">
                  <p className="font-['Fraunces:Bold',sans-serif] text-[17px] text-[#E8B04B] leading-[1]">{earnedTrophies.size}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]">{t('trophies')}</p>
                </div>
                <ChevronRight className="size-[13px] text-[#6b6860]" />
              </button>
            </>
          )}
        </div>

        {!isOwn && (
          <button className="bg-[#7e3f25] rounded-[48px] w-full min-h-[44px] py-[10px] mt-[10px]">
            <p className="font-['Domine:Regular',sans-serif] text-[14px] text-white">{t('follow')}</p>
          </button>
        )}
      </div>

      {/* ── Tab bar ── */}
      <div className="flex bg-white border-b border-black/[0.06] shrink-0 px-[4px]">
        {(['posts', 'favorites', 'saved', 'trophies'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 min-h-[44px] flex flex-col items-center justify-center relative"
          >
            <p className={`font-['Inter:Medium',sans-serif] text-[11px] transition-colors ${activeTab === tab ? 'text-[#7e3f25]' : 'text-[#6b6860]'}`}>
              {tab === 'posts' ? t('posts_tab') : tab === 'favorites' ? t('liked_tab') : tab === 'saved' ? t('saved_tab') : t('trophies_tab')}
            </p>
            {activeTab === tab && (
              <motion.div
                layoutId="tab-line"
                className="absolute bottom-0 left-[8%] right-[8%] h-[2px] bg-[#7e3f25] rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="flex-1 overflow-y-auto min-h-0 bg-white"
        >
          {/* POSTS */}
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-[2px]">
              {MOCK_POSTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/reel/${profile.handle}`)}
                  className="aspect-square bg-gradient-to-br from-[#E8B04B]/40 to-[#C9633A]/40 relative flex items-center justify-center"
                >
                  <p className="text-[30px]">{p.emoji}</p>
                  <div className="absolute bottom-[4px] left-[6px] font-['Inter:Medium',sans-serif] text-[10px] text-white drop-shadow">{p.views.toLocaleString()}</div>
                </button>
              ))}
            </div>
          )}

          {/* FAVORITES */}
          {activeTab === 'favorites' && (
            likedVideosList.length > 0 ? (
              <div className="grid grid-cols-3 gap-[2px]">
                {likedVideosList.map(v => (
                  <button
                    key={v.id}
                    onClick={() => navigate(`/reel/${v.region}`)}
                    className="aspect-square relative overflow-hidden"
                  >
                    {v.media ? (
                      <img src={v.media} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${v.gradient} flex items-center justify-center`}>
                        <span className="text-[24px]">❤️</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-[4px] left-[6px] font-['Inter:Medium',sans-serif] text-[10px] text-white drop-shadow">{v.username}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-[60px] px-[40px] text-center">
                <p className="text-[44px] mb-[14px]">❤️</p>
                <h3 className="font-['Fraunces:Regular',sans-serif] text-[19px] text-[#281e1b] mb-[6px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{t('no_favorites')}</h3>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860]">{t('no_favorites_body')}</p>
                <button onClick={() => navigate('/home')} className="mt-[20px] bg-[#7e3f25] rounded-[48px] px-[24px] min-h-[44px] py-[11px]">
                  <p className="font-['Domine:Regular',sans-serif] text-[14px] text-white">{t('explore_globe')}</p>
                </button>
              </div>
            )
          )}

          {/* SAVED */}
          {activeTab === 'saved' && (
            savedVideosList.length > 0 ? (
              <div className="grid grid-cols-3 gap-[2px]">
                {savedVideosList.map(v => (
                  <button
                    key={v.id}
                    onClick={() => navigate(`/reel/${v.region}`)}
                    className="aspect-square relative overflow-hidden"
                  >
                    {v.media ? (
                      <img src={v.media} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${v.gradient} flex items-center justify-center`}>
                        <span className="text-[24px]">🔖</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-[4px] left-[6px] font-['Inter:Medium',sans-serif] text-[10px] text-white drop-shadow">{v.username}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-[60px] px-[40px] text-center">
                <p className="text-[44px] mb-[14px]">🔖</p>
                <h3 className="font-['Fraunces:Regular',sans-serif] text-[19px] text-[#281e1b] mb-[6px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{t('no_saved')}</h3>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860]">{t('no_saved_body')}</p>
                <button onClick={() => navigate('/home')} className="mt-[20px] bg-[#7e3f25] rounded-[48px] px-[24px] min-h-[44px] py-[11px]">
                  <p className="font-['Domine:Regular',sans-serif] text-[14px] text-white">{t('explore_globe')}</p>
                </button>
              </div>
            )
          )}

          {/* TROPHIES */}
          {activeTab === 'trophies' && (
            <div className="p-[14px]">
              {/* Weekly missions / Community Contributions */}
              <p className="font-['Inter:Medium',sans-serif] text-[10px] text-[#6b6860] uppercase tracking-widest mb-[10px]">
                {isNamibia ? t('community_contributions') : t('weekly_missions')}
              </p>
              <div className="flex flex-col gap-[8px] mb-[22px]">
                {WEEKLY_MISSIONS.map(mission => {
                  const progress = missionProgress[mission.id] ?? 0;
                  const pct = Math.min((progress / mission.goal) * 100, 100);
                  const done = progress >= mission.goal;
                  return (
                    <div
                      key={mission.id}
                      className={`rounded-[14px] p-[13px] flex items-center gap-[12px] ${done ? 'bg-gradient-to-br from-[#E8B04B]/12 to-[#C9633A]/8 border border-[#E8B04B]/30' : 'bg-[#fff2ed]'}`}
                    >
                      <div className={`size-[44px] rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-[#E8B04B]/20' : 'bg-black/5'}`}>
                        <span className="text-[22px]">{done ? '✅' : mission.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-[2px]">
                          <p className={`font-['Inter:Medium',sans-serif] text-[13px] ${done ? 'text-[#7e3f25]' : 'text-[#281e1b]'}`}>{mission.title}</p>
                          <p className="font-['Inter:Bold',sans-serif] text-[11px] text-[#E8B04B]">+{mission.xpReward} XP</p>
                        </div>
                        <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] mb-[7px]">{mission.description}</p>
                        <div className="flex items-center gap-[8px]">
                          <div className="flex-1 h-[4px] bg-black/8 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${done ? 'bg-[#E8B04B]' : 'bg-[#C9633A]'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.7, ease: 'easeOut' }}
                            />
                          </div>
                          <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860] shrink-0 tabular-nums">{progress}/{mission.goal}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trophies grid */}
              <p className="font-['Inter:Medium',sans-serif] text-[10px] text-[#6b6860] uppercase tracking-widest mb-[10px]">
                {isNamibia ? t('community_honours') : t('trophies')}
              </p>
              <div className="grid grid-cols-2 gap-[8px]">
                {TROPHIES.map(trophy => {
                  const earned = earnedTrophies.has(trophy.id);
                  const isExpanded = expandedTrophy === trophy.id;
                  return (
                    <motion.button
                      key={trophy.id}
                      layout
                      onClick={() => setExpandedTrophy(isExpanded ? null : trophy.id)}
                      className={`rounded-[16px] p-[14px] flex flex-col items-center text-center relative overflow-hidden text-left ${
                        earned
                          ? 'bg-gradient-to-br from-[#E8B04B]/18 to-[#C9633A]/10 border border-[#E8B04B]/35'
                          : 'bg-[#f7f5f3] border border-transparent'
                      }`}
                    >
                      {/* Shine on earned */}
                      {earned && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}

                      <div className={`size-[54px] rounded-full flex items-center justify-center mb-[8px] relative ${earned ? 'bg-[#E8B04B]/18' : 'bg-black/5'}`}>
                        <span className={`text-[30px] ${earned ? '' : 'grayscale opacity-35'}`}>{trophy.icon}</span>
                        {!earned && (
                          <div className="absolute inset-0 rounded-full flex items-center justify-center">
                            <Lock className="size-[14px] text-[#6b6860]/60 absolute bottom-[2px] right-[2px]" />
                          </div>
                        )}
                      </div>

                      <p className={`font-['Inter:Medium',sans-serif] text-[13px] mb-[3px] w-full text-center ${earned ? 'text-[#7e3f25]' : 'text-[#6b6860]'}`}>
                        {trophy.name}
                      </p>

                      {earned ? (
                        <>
                          <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860] leading-snug text-center">{trophy.earnedDescription}</p>
                          <div className="mt-[8px] flex items-center gap-[3px] bg-[#E8B04B]/15 rounded-full px-[8px] py-[3px]">
                            <span className="text-[10px]">⭐</span>
                            <p className="font-['Inter:Bold',sans-serif] text-[11px] text-[#E8B04B]">+{trophy.xpReward} XP</p>
                          </div>
                        </>
                      ) : (
                        <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6b6860]/70 leading-snug text-center">{trophy.description}</p>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="h-[20px]" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <BottomNav navigate={navigate} t={t} />
      <ProfileDetailSheet
        detail={detailSheet}
        onClose={() => setDetailSheet(null)}
        profile={profile}
        unlockedRegions={unlockedRegions}
        t={t}
      />
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

function BottomNav({ navigate, t }: { navigate: (p: string) => void; t: (k: string) => string }) {
  return (
    <div className="h-[60px] bg-white shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.08)] flex items-center justify-around shrink-0">
      <button onClick={() => navigate('/home')} className="min-h-[44px] min-w-[64px] flex flex-col items-center justify-center gap-[2px]">
        <Home className="size-[22px] text-[rgba(0,0,0,0.5)]" />
        <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">{t('globe')}</p>
      </button>
      <button onClick={() => navigate('/search')} className="min-h-[44px] min-w-[64px] flex flex-col items-center justify-center gap-[2px]">
        <SearchIcon className="size-[22px] text-[rgba(0,0,0,0.5)]" />
        <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">{t('search')}</p>
      </button>
      <button className="min-h-[44px] min-w-[64px] flex flex-col items-center justify-center gap-[2px]">
        <User className="size-[22px] text-[#7e3f25]" />
        <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[#7e3f25]">{t('profile')}</p>
      </button>
    </div>
  );
}

function ProfileDetailSheet({
  detail,
  onClose,
  profile,
  unlockedRegions,
  t,
}: {
  detail: DetailSheet | null;
  onClose: () => void;
  profile: { displayName: string; streak: number; countries: number };
  unlockedRegions: Set<string>;
  t: (k: string) => string;
}) {
  const regionNames = [...unlockedRegions].map(region =>
    region
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  );

  return (
    <AnimatePresence>
      {detail && (
        <motion.div
          className="absolute inset-0 bg-black/45 z-40 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-t-[24px] w-full p-[22px] pb-[28px]"
            initial={{ y: 260 }}
            animate={{ y: 0 }}
            exit={{ y: 260 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-[12px] mb-[14px]">
              <div>
                <p className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.16em] text-[#7e3f25] mb-[4px]">
                  Tap for details
                </p>
                <h3 className="font-['Fraunces:Regular',sans-serif] text-[22px] text-[#281e1b]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                  {detail === 'streak' ? t('streak') : t('countries')}
                </h3>
              </div>
              <button onClick={onClose} className="size-[44px] rounded-full bg-[#fff2ed] flex items-center justify-center">
                <X className="size-[20px] text-[#6b6860]" />
              </button>
            </div>

            {detail === 'streak' ? (
              <div className="rounded-[16px] bg-[#fff2ed] px-[16px] py-[15px]">
                <div className="flex items-center gap-[10px] mb-[8px]">
                  <Flame className="size-[22px] text-[#C9633A] fill-[#C9633A]" />
                  <p className="font-['Fraunces:Bold',sans-serif] text-[28px] text-[#c9633a] leading-none">{profile.streak}</p>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] leading-[1.45]">
                  {profile.displayName} has a {profile.streak}-day streak. Answer a daily prompt to keep it alive and build momentum.
                </p>
              </div>
            ) : (
              <div className="rounded-[16px] bg-[#fff2ed] px-[16px] py-[15px]">
                <div className="flex items-center gap-[10px] mb-[10px]">
                  <GlobeIcon className="size-[22px] text-[#1F6B6B]" />
                  <p className="font-['Fraunces:Bold',sans-serif] text-[28px] text-[#1F6B6B] leading-none">{profile.countries}</p>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] leading-[1.45] mb-[12px]">
                  Places with stories this profile has opened or visited.
                </p>
                <div className="flex flex-wrap gap-[8px]">
                  {(regionNames.length ? regionNames : ['Explore the globe to unlock places']).map(region => (
                    <span key={region} className="rounded-full bg-white px-[10px] py-[6px] font-['Inter:Medium',sans-serif] text-[12px] text-[#281e1b]">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
