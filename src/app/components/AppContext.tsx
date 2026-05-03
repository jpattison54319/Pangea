import { createContext, useContext, useState, useRef, ReactNode } from 'react';

export type Lang = 'en' | 'es' | 'kj';
export type HomeCountry = 'namibia' | 'guatemala' | 'usa' | 'other';

interface User {
  id: string;
  handle: string;
  displayName: string;
  homeRegion: string;
  streak: number;
  countriesUnlocked: number;
  language: Lang;
  homeCountry: HomeCountry;
}

const SAVED_USER_KEY = 'pangea-current-user-v1';

function loadSavedUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(SAVED_USER_KEY);
    return saved ? JSON.parse(saved) as User : null;
  } catch {
    return null;
  }
}

function saveUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    window.localStorage.setItem(SAVED_USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(SAVED_USER_KEY);
  }
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  time: string;
}

export interface Trophy {
  id: string;
  name: string;
  description: string;
  earnedDescription: string;
  icon: string;
  xpReward: number;
}

export const TROPHIES: Trophy[] = [
  {
    id: 'first-answer',
    name: 'First Words',
    description: 'Answer your first daily question',
    earnedDescription: 'Answered your first daily question',
    icon: '🎤',
    xpReward: 100,
  },
  {
    id: 'on-a-roll',
    name: 'On a Roll',
    description: 'Answer 3 daily questions',
    earnedDescription: 'Answered 3 daily questions',
    icon: '🎲',
    xpReward: 200,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Complete all weekly missions',
    earnedDescription: 'Completed all weekly missions',
    icon: '⚔️',
    xpReward: 500,
  },
  {
    id: 'world-explorer',
    name: 'World Explorer',
    description: 'Unlock 5 countries on the globe',
    earnedDescription: 'Unlocked 5 countries on the globe',
    icon: '🌍',
    xpReward: 300,
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Like 10 posts',
    earnedDescription: 'Liked 10 posts from around the world',
    icon: '🦋',
    xpReward: 150,
  },
  {
    id: 'community-voice',
    name: 'Community Voice',
    description: 'Leave 5 comments',
    earnedDescription: 'Left 5 comments in the community',
    icon: '💬',
    xpReward: 200,
  },
];

export interface WeeklyMission {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  goal: number;
}

export const WEEKLY_MISSIONS: WeeklyMission[] = [
  {
    id: 'answer-questions',
    title: 'Daily Voices',
    description: 'Answer 5 daily questions this week',
    icon: '🎤',
    xpReward: 250,
    goal: 5,
  },
  {
    id: 'like-posts',
    title: 'Show Some Love',
    description: 'Like 10 posts',
    icon: '❤️',
    xpReward: 100,
    goal: 10,
  },
  {
    id: 'comment-posts',
    title: 'Join the Conversation',
    description: 'Leave 3 comments',
    icon: '💬',
    xpReward: 60,
    goal: 3,
  },
  {
    id: 'unlock-countries',
    title: 'Globe Trotter',
    description: 'Unlock 2 new countries',
    icon: '🌍',
    xpReward: 200,
    goal: 2,
  },
];

export const XP_PER_LEVEL = 500;
export const calcLevel = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const xpInCurrentLevel = (xp: number) => xp % XP_PER_LEVEL;

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  language: Lang;
  setLanguage: (l: Lang) => void;
  login: (u: User) => void;
  signIn: (email: string, homeCountry?: HomeCountry) => void;
  logout: () => void;
  hasAnsweredToday: boolean;
  setHasAnsweredToday: (v: boolean) => void;
  bumpStreak: () => void;
  likedVideos: Set<string>;
  toggleLike: (id: string) => void;
  savedVideos: Set<string>;
  toggleSave: (id: string) => void;
  commentsByVideo: Record<string, Comment[]>;
  addComment: (videoId: string, text: string) => void;
  unlockedRegions: Set<string>;
  unlockRegion: (r: string) => void;
  visitedRegions: Set<string>;
  markRegionVisited: (r: string) => void;
  reportedVideos: Set<string>;
  reportVideo: (id: string) => void;
  toast: string | null;
  showToast: (m: string) => void;
  // XP & trophy system
  xp: number;
  level: number;
  earnedTrophies: Set<string>;
  questionsAnsweredTotal: number;
  userCommentsTotal: number;
  addXP: (n: number) => void;
  earnTrophy: (id: string) => void;
  incrementQuestionsAnswered: () => void;
  pendingTrophy: string | null;
  clearPendingTrophy: () => void;
  pendingLevelUp: number | null;
  clearPendingLevelUp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadSavedUser());
  const [language, setLanguageState] = useState<Lang>(() => loadSavedUser()?.language ?? 'en');
  const [hasAnsweredToday, setHasAnsweredToday] = useState(false);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [commentsByVideo, setCommentsByVideo] = useState<Record<string, Comment[]>>({
    v1: [{ id: 'c1', user: '@kenji.tyo', text: 'Adding this to my KC list!', time: '1h' }],
    v2: [{ id: 'c2', user: '@maya.kc', text: 'Thank you for sharing this 🙏', time: '3h' }],
    v3: [],
  });
  const [unlockedRegions, setUnlockedRegions] = useState<Set<string>>(new Set());
  const [visitedRegions, setVisitedRegions] = useState<Set<string>>(new Set());
  const visitedRegionsRef = useRef(new Set<string>());
  const [reportedVideos, setReportedVideos] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  // XP & trophy system
  const [xp, setXp] = useState(0);
  const [earnedTrophies, setEarnedTrophies] = useState<Set<string>>(new Set());
  const [questionsAnsweredTotal, setQuestionsAnsweredTotal] = useState(0);
  const [userCommentsTotal, setUserCommentsTotal] = useState(0);
  const [pendingTrophy, setPendingTrophy] = useState<string | null>(null);
  const [pendingLevelUp, setPendingLevelUp] = useState<number | null>(null);

  // Refs to avoid stale closures in callbacks
  const xpRef = useRef(0);
  const earnedTrophiesRef = useRef(new Set<string>());
  const questionsAnsweredRef = useRef(0);
  const userCommentsRef = useRef(0);
  const likedVideosRef = useRef(new Set<string>());
  const unlockedRegionsRef = useRef(new Set<string>());

  const login = (u: User) => { setUser(u); saveUser(u); setLanguage(u.language); };
  const SIGNIN_PERSONA: Record<HomeCountry, { displayName: string; handle: string; homeRegion: string }> = {
    usa:       { displayName: 'Jack Lalanne',    handle: 'jack.lalanne',    homeRegion: 'Kansas City, MO, USA' },
    guatemala: { displayName: 'Oscar Isaac',     handle: 'oscar.isaac',     homeRegion: 'Guatemala City, Guatemala' },
    namibia:   { displayName: 'Michelle McLean', handle: 'michelle.mclean', homeRegion: 'Windhoek, Namibia' },
    other:     { displayName: 'Maya',            handle: 'maya.user',       homeRegion: 'Somewhere in the world' },
  };
  const signIn = (email: string, homeCountry: HomeCountry = 'usa') => {
    const p = SIGNIN_PERSONA[homeCountry];
    const signedInUser = {
      id: p.handle, handle: p.handle, displayName: p.displayName,
      homeRegion: p.homeRegion, streak: 7, countriesUnlocked: 3, language,
      homeCountry,
    };
    setUser(signedInUser);
    saveUser(signedInUser);
  };
  const logout = () => { setUser(null); saveUser(null); setHasAnsweredToday(false); };
  const bumpStreak = () => setUser(u => {
    if (!u) return u;
    const next = { ...u, streak: u.streak + 1 };
    saveUser(next);
    return next;
  });

  const addXP = (n: number) => {
    const oldLevel = calcLevel(xpRef.current);
    xpRef.current += n;
    setXp(xpRef.current);
    const newLevel = calcLevel(xpRef.current);
    if (newLevel > oldLevel) {
      setTimeout(() => setPendingLevelUp(newLevel), 100);
    }
  };

  const earnTrophy = (id: string) => {
    if (earnedTrophiesRef.current.has(id)) return;
    const trophy = TROPHIES.find(t => t.id === id);
    if (!trophy) return;
    earnedTrophiesRef.current = new Set([...earnedTrophiesRef.current, id]);
    setEarnedTrophies(new Set(earnedTrophiesRef.current));
    setPendingTrophy(id);
    // Award trophy XP after the trophy notification has been visible
    setTimeout(() => addXP(trophy.xpReward), 2800);
  };

  const incrementQuestionsAnswered = () => {
    questionsAnsweredRef.current += 1;
    setQuestionsAnsweredTotal(questionsAnsweredRef.current);
    if (questionsAnsweredRef.current === 1) earnTrophy('first-answer');
    if (questionsAnsweredRef.current === 3) earnTrophy('on-a-roll');
  };

  const toggleLike = (id: string) => {
    const s = new Set(likedVideosRef.current);
    if (s.has(id)) {
      s.delete(id);
    } else {
      s.add(id);
      addXP(10);
      if (s.size >= 10) earnTrophy('social-butterfly');
    }
    likedVideosRef.current = s;
    setLikedVideos(new Set(s));
  };

  const toggleSave = (id: string) => setSavedVideos(p => {
    const s = new Set(p);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });

  const addComment = (vid: string, text: string) => {
    const c: Comment = { id: `c${Date.now()}`, user: user ? `@${user.handle}` : '@you', text, time: 'now' };
    setCommentsByVideo(prev => ({ ...prev, [vid]: [c, ...(prev[vid] || [])] }));
    userCommentsRef.current += 1;
    setUserCommentsTotal(userCommentsRef.current);
    if (userCommentsRef.current >= 5) earnTrophy('community-voice');
  };

  const markRegionVisited = (r: string) => {
    if (visitedRegionsRef.current.has(r)) return;
    visitedRegionsRef.current = new Set([...visitedRegionsRef.current, r]);
    setVisitedRegions(new Set(visitedRegionsRef.current));
  };

  const reportVideo = (id: string) => {
    setReportedVideos(prev => {
      const s = new Set(prev);
      s.add(id);
      return s;
    });
  };

  const unlockRegion = (r: string) => {
    const s = new Set(unlockedRegionsRef.current);
    s.add(r);
    unlockedRegionsRef.current = s;
    setUnlockedRegions(new Set(s));
    if (s.size >= 5) earnTrophy('world-explorer');
  };

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2000); };
  const clearPendingTrophy = () => setPendingTrophy(null);
  const clearPendingLevelUp = () => setPendingLevelUp(null);

  const level = calcLevel(xp);
  const setLanguage = (l: Lang) => {
    setLanguageState(l);
    setUser(u => {
      if (!u) return u;
      const next = { ...u, language: l };
      saveUser(next);
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      user, isAuthenticated: !!user, language, setLanguage,
      login, signIn, logout, hasAnsweredToday, setHasAnsweredToday, bumpStreak,
      likedVideos, toggleLike, savedVideos, toggleSave,
      commentsByVideo, addComment, unlockedRegions, unlockRegion,
      visitedRegions, markRegionVisited,
      reportedVideos, reportVideo,
      toast, showToast,
      xp, level, earnedTrophies, questionsAnsweredTotal, userCommentsTotal,
      addXP, earnTrophy, incrementQuestionsAnswered,
      pendingTrophy, clearPendingTrophy,
      pendingLevelUp, clearPendingLevelUp,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const c = useContext(AppContext);
  if (!c) throw new Error('useApp must be in AppProvider');
  return c;
}
