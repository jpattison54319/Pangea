import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useApp } from './AppContext';
import { useT, getQuestions, getNudgePrompts } from './i18n';
import { X, Send, Plus, Video, Camera, Image as ImageIcon, Play, RotateCcw, Check, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


// ── Gallery mock data ──────────────────────────────────────────────────────────
type GalleryItem =
  | { id: string; type: 'photo'; src: string }
  | { id: string; type: 'video'; src: string; duration: string };

const GALLERY: GalleryItem[] = [
  { id: 'g1',  type: 'photo', src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'g2',  type: 'video', src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', duration: '0:23' },
  { id: 'g3',  type: 'photo', src: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400' },
  { id: 'g4',  type: 'video', src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400', duration: '1:04' },
  { id: 'g5',  type: 'photo', src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400' },
  { id: 'g6',  type: 'photo', src: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400' },
  { id: 'g7',  type: 'video', src: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=400', duration: '0:45' },
  { id: 'g8',  type: 'photo', src: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400' },
  { id: 'g9',  type: 'photo', src: 'https://images.unsplash.com/photo-1545419913-775e3e82c7db?w=400' },
  { id: 'g10', type: 'video', src: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400', duration: '2:11' },
  { id: 'g11', type: 'photo', src: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=400' },
  { id: 'g12', type: 'photo', src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
];

// Simulated capture thumbnails (what "taking" a photo/video produces)
const CAPTURED: Record<'video' | 'photo', string> = {
  video: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  photo: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
};

interface AttachedMedia {
  type: 'photo' | 'video';
  thumb: string;
  duration?: string;
}

// ── Popover actions ────────────────────────────────────────────────────────────
const POPOVER_ACTIONS = [
  { icon: Video,     tKey: 'take_video',      color: '#C9633A', key: 'take-video' as const },
  { icon: Camera,    tKey: 'take_photo',      color: '#7e3f25', key: 'take-photo' as const },
  { icon: ImageIcon, tKey: 'upload_gallery',  color: '#1F6B6B', key: 'gallery'    as const },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function EnhancedDailyQuestion() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    isAuthenticated, setHasAnsweredToday, bumpStreak,
    showToast, language, addXP, incrementQuestionsAnswered,
  } = useApp();
  const t = useT();
  const questions = getQuestions(language);
  const NUDGES = getNudgePrompts(language);

  // Allow the reel to deep-link a specific question via ?q=<index>
  const initialQIdx = (() => {
    const raw = searchParams.get('q');
    if (raw === null) return 0;
    const i = parseInt(raw, 10);
    return !isNaN(i) && i >= 0 && i < questions.length ? i : 0;
  })();
  const [qIdx, setQIdx]                 = useState(initialQIdx);
  const [text, setText]                 = useState('');
  const [attached, setAttached]         = useState<AttachedMedia | null>(null);
  const [showMore, setShowMore]         = useState(false);

  // nudge prompts
  const [nudgeOpen, setNudgeOpen]       = useState(false);

  // + popover
  const [popoverOpen, setPopoverOpen]   = useState(false);

  // Camera overlay state
  const [camMode, setCamMode]           = useState<'video' | 'photo' | null>(null);
  const [camState, setCamState]         = useState<'idle' | 'recording' | 'preview'>('idle');
  const [recTime, setRecTime]           = useState(0);
  const timerRef                        = useRef<number | null>(null);

  // Gallery overlay state
  const [galleryOpen, setGalleryOpen]   = useState(false);
  const [selected, setSelected]         = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/sign-in', { replace: true });
  }, [isAuthenticated]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  if (!isAuthenticated) return null;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const send = () => {
    setHasAnsweredToday(true);
    bumpStreak();
    addXP(50);
    incrementQuestionsAnswered();
    showToast(t('posted'));
    setShowMore(true);
  };

  const answerMore = () => {
    setQIdx(i => (i + 1) % questions.length);
    setText('');
    setAttached(null);
    setShowMore(false);
  };

  // Popover actions
  const openCamera = (mode: 'video' | 'photo') => {
    setPopoverOpen(false);
    setCamMode(mode);
    setCamState('idle');
    setRecTime(0);
  };

  const openGallery = () => {
    setPopoverOpen(false);
    setSelected(null);
    setGalleryOpen(true);
  };

  // Camera actions
  const closeCamera = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCamMode(null);
    setCamState('idle');
    setRecTime(0);
  };

  const toggleRecord = () => {
    if (camState === 'idle') {
      setCamState('recording');
      setRecTime(0);
      timerRef.current = window.setInterval(() => {
        setRecTime(s => {
          if (s >= 60) { clearInterval(timerRef.current!); setCamState('preview'); return 60; }
          return s + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
      setCamState('preview');
    }
  };

  const useCapture = () => {
    setAttached({
      type: camMode!,
      thumb: CAPTURED[camMode!],
      duration: camMode === 'video' ? `0:${recTime.toString().padStart(2, '0')}` : undefined,
    });
    closeCamera();
  };

  // Gallery actions
  const confirmGallery = () => {
    const item = GALLERY.find(g => g.id === selected);
    if (!item) return;
    setAttached({
      type: item.type,
      thumb: item.src,
      duration: item.type === 'video' ? item.duration : undefined,
    });
    setGalleryOpen(false);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">

      {/* Header */}
      <div className="h-[36px] flex items-center justify-between px-[20px] shrink-0">
        <button onClick={() => navigate(-1)}>
          <X className="size-[20px] text-[#281e1b]" />
        </button>
        <button onClick={() => navigate('/home')}>
          <p className="font-['Inter:Medium',sans-serif] text-[14px] text-[#6b6860]">{t('skip')}</p>
        </button>
      </div>

      {/* Question */}
      <div className="px-[20px] pt-[6px] shrink-0">
        <p className="font-['Inter:Medium',sans-serif] text-[11px] text-[#C9633A] uppercase tracking-wide mb-[8px]">
          {t('todays_q')}
        </p>
        <h1
          className="font-['Fraunces:Regular',sans-serif] text-[22px] text-[#281e1b] leading-[1.25]"
          style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        >
          {questions[qIdx]}
        </h1>
      </div>

      {/* Shy-user nudge section */}
      <div className="px-[20px] pt-[10px] shrink-0">
        <button
          onClick={() => setNudgeOpen(o => !o)}
          className="flex items-center gap-[6px] rounded-full px-[12px] py-[6px] transition-colors"
          style={{ background: nudgeOpen ? 'rgba(201,99,58,0.14)' : 'rgba(201,99,58,0.08)' }}
        >
          <Sparkles className="size-[13px]" style={{ color: '#C9633A' }} />
          <p className="font-['Inter:Medium',sans-serif] text-[12px]" style={{ color: '#C9633A' }}>
            {t('need_nudge')}
          </p>
          <motion.div animate={{ rotate: nudgeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="size-[12px]" style={{ color: '#C9633A' }} />
          </motion.div>
        </button>

        <AnimatePresence>
          {nudgeOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-[10px] flex flex-wrap gap-[6px]">
                {NUDGES.map((nudge, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      setText(nudge);
                      setNudgeOpen(false);
                    }}
                    className="rounded-full px-[11px] py-[6px] text-left"
                    style={{
                      background: '#fff2ed',
                      border: '1px solid rgba(201,99,58,0.22)',
                      boxShadow: '0 1px 4px rgba(126,63,37,0.08)',
                    }}
                  >
                    <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#281e1b] leading-snug">
                      {nudge}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content area */}
      <div className="flex-1 px-[16px] pt-[14px] pb-[4px] flex flex-col min-h-0 gap-[10px]">

        {/* Attached media preview */}
        <AnimatePresence>
          {attached && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="relative shrink-0 rounded-[16px] overflow-hidden"
              style={{ height: 154 }}
            >
              <img src={attached.thumb} alt="attached media" className="w-full h-full object-cover" />

              {/* Dim + play button for video */}
              {attached.type === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="size-[48px] rounded-full bg-black/50 flex items-center justify-center">
                    <Play className="size-[22px] text-white fill-white ml-[2px]" />
                  </div>
                  {attached.duration && (
                    <div className="absolute bottom-[8px] right-[10px] bg-black/60 rounded-full px-[8px] py-[2px]">
                      <p className="font-['Inter:Medium',sans-serif] text-[11px] text-white">{attached.duration}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Type label */}
              <div className="absolute top-[8px] left-[10px] rounded-full px-[8px] py-[3px] flex items-center gap-[4px]"
                style={{ background: 'rgba(0,0,0,0.52)' }}>
                <span className="text-[10px]">{attached.type === 'video' ? '🎬' : '📷'}</span>
                <p className="font-['Inter:Medium',sans-serif] text-[10px] text-white capitalize">
                  {attached.type} attached
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => setAttached(null)}
                className="absolute top-[8px] right-[8px] size-[26px] rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.60)' }}
              >
                <X className="size-[13px] text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caption textarea */}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={t('add_caption')}
          className="bg-white rounded-[14px] px-[14px] py-[12px] text-[14px] text-[#281e1b] outline-none resize-none flex-1 min-h-[80px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {/* Bottom bar */}
      <div className="px-[16px] pt-[10px] pb-[22px] shrink-0 flex items-center gap-[10px] relative">

        {/* + button + popover */}
        <div className="relative shrink-0">

          {/* Popover */}
          <AnimatePresence>
            {popoverOpen && (
              <>
                <div className="absolute inset-0 fixed z-10" onClick={() => setPopoverOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 380 }}
                  className="absolute bottom-[54px] left-0 z-20 w-[200px] rounded-[18px] overflow-hidden"
                  style={{
                    background: '#fff2ed',
                    boxShadow: '0 10px 36px -4px rgba(126,63,37,0.28), 0 2px 10px -2px rgba(126,63,37,0.14)',
                    border: '1px solid rgba(201,99,58,0.2)',
                  }}
                >
                  {/* Top terracotta stripe */}
                  <div className="h-[2.5px]" style={{ background: 'linear-gradient(90deg, #C9633A, #E8B04B)' }} />

                  {POPOVER_ACTIONS.map(({ icon: Icon, tKey, color, key }, i) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (key === 'take-video') openCamera('video');
                        else if (key === 'take-photo') openCamera('photo');
                        else openGallery();
                      }}
                      className="w-full flex items-center gap-[12px] px-[14px] py-[13px] active:bg-black/5"
                      style={{
                        borderBottom: i < POPOVER_ACTIONS.length - 1
                          ? '1px solid rgba(201,99,58,0.1)'
                          : 'none',
                      }}
                    >
                      <div
                        className="size-[34px] rounded-[10px] flex items-center justify-center shrink-0"
                        style={{ background: `${color}1a` }}
                      >
                        <Icon className="size-[16px]" style={{ color }} />
                      </div>
                      <p className="font-['Inter:Medium',sans-serif] text-[13px] text-[#281e1b]">{t(tKey)}</p>
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* The + button itself */}
          <motion.button
            onClick={() => setPopoverOpen(o => !o)}
            whileTap={{ scale: 0.88 }}
            className="size-[46px] rounded-full flex items-center justify-center shadow-lg"
            style={{ background: popoverOpen ? '#7e3f25' : '#C9633A' }}
          >
            <motion.div animate={{ rotate: popoverOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              <Plus className="size-[21px] text-white" />
            </motion.div>
          </motion.button>
        </div>

        {/* Post button */}
        <button
          onClick={send}
          disabled={!attached && !text.trim()}
          className="flex-1 rounded-[48px] py-[14px] flex items-center justify-center gap-[8px] disabled:opacity-35 transition-opacity"
          style={{ background: '#7e3f25' }}
        >
          <p className="font-['Domine:Regular',sans-serif] text-[15px] text-white">{t('post_answer')}</p>
          <Send className="size-[16px] text-white" />
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          Camera overlay (slides up from bottom)
      ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {camMode && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-0 z-40 flex flex-col overflow-hidden bg-black"
          >

            {/* Camera nav bar */}
            <div className="h-[40px] flex items-center justify-between px-[20px] shrink-0">
              <button onClick={closeCamera}>
                <X className="size-[22px] text-white" />
              </button>
              <p className="font-['Inter:Medium',sans-serif] text-[14px] text-white">
                {camState === 'preview'
                  ? 'Preview'
                  : camMode === 'video' ? 'Record Video' : 'Take Photo'}
              </p>
              {camState === 'recording' ? (
                <div className="flex items-center gap-[5px] rounded-full px-[8px] py-[3px] bg-red-500">
                  <div className="size-[5px] rounded-full bg-white animate-pulse" />
                  <p className="font-['Inter:Medium',sans-serif] text-[11px] text-white tabular-nums">
                    0:{recTime.toString().padStart(2, '0')}
                  </p>
                </div>
              ) : (
                <div className="w-[40px]" />
              )}
            </div>

            {camState === 'preview' ? (
              /* ── Preview ── */
              <>
                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={CAPTURED[camMode]}
                    alt="captured preview"
                    className="w-full h-full object-cover"
                  />
                  {camMode === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="size-[64px] rounded-full bg-black/40 flex items-center justify-center">
                        <Play className="size-[28px] text-white fill-white ml-[3px]" />
                      </div>
                    </div>
                  )}
                  {/* Duration badge for video */}
                  {camMode === 'video' && (
                    <div className="absolute bottom-[12px] right-[14px] bg-black/60 rounded-full px-[10px] py-[4px]">
                      <p className="font-['Inter:Medium',sans-serif] text-[12px] text-white">
                        0:{recTime.toString().padStart(2, '0')}
                      </p>
                    </div>
                  )}
                </div>
                <div className="px-[20px] py-[20px] flex items-center justify-between shrink-0">
                  <button
                    onClick={() => { setCamState('idle'); setRecTime(0); }}
                    className="flex items-center gap-[7px] px-[20px] py-[11px] rounded-full"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  >
                    <RotateCcw className="size-[15px] text-white" />
                    <p className="font-['Inter:Medium',sans-serif] text-[14px] text-white">Retake</p>
                  </button>
                  <button
                    onClick={useCapture}
                    className="flex items-center gap-[7px] px-[26px] py-[11px] rounded-full"
                    style={{ background: '#C9633A' }}
                  >
                    <Check className="size-[15px] text-white" />
                    <p className="font-['Domine:Regular',sans-serif] text-[14px] text-white">
                      Use {camMode === 'video' ? 'video' : 'photo'}
                    </p>
                  </button>
                </div>
              </>
            ) : (
              /* ── Viewfinder ── */
              <>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[#282828] to-[#0e0e0e] relative overflow-hidden">
                  <div className="text-center">
                    <p className="text-[52px] mb-[8px]">{camMode === 'video' ? '🎬' : '📷'}</p>
                    <p className="font-['Inter:Medium',sans-serif] text-[13px] text-white/50">
                      {camState === 'recording'
                        ? 'Recording…'
                        : camMode === 'video' ? 'Tap button to record' : 'Tap button to capture'}
                    </p>
                  </div>

                  {/* Photo framing corners */}
                  {camMode === 'photo' && (
                    <div className="absolute inset-[28px] pointer-events-none">
                      {(['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2',
                        'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'] as const
                      ).map((cls, i) => (
                        <div key={i} className={`absolute size-[22px] border-white/40 rounded-sm ${cls}`} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Shutter / record button row */}
                <div className="h-[120px] flex items-center justify-center shrink-0">
                  {camMode === 'video' ? (
                    <button
                      onClick={toggleRecord}
                      className={`size-[72px] rounded-full flex items-center justify-center transition-all duration-200 ${
                        camState === 'recording' ? 'bg-white' : 'border-4 border-white bg-white/20'
                      }`}
                    >
                      <div
                        className={`transition-all duration-200 bg-red-500 ${
                          camState === 'recording' ? 'size-[26px] rounded-[7px]' : 'size-[52px] rounded-full'
                        }`}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => setCamState('preview')}
                      className="size-[72px] rounded-full border-4 border-white bg-white/20 flex items-center justify-center"
                    >
                      <div className="size-[52px] rounded-full bg-white" />
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════════
          Gallery picker (slides up from bottom)
      ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-0 z-40 flex flex-col overflow-hidden"
            style={{ background: '#1a1410' }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-[12px] pb-[4px] shrink-0">
              <div className="w-[36px] h-[4px] rounded-full bg-white/20" />
            </div>

            {/* Gallery header */}
            <div className="flex items-center justify-between px-[16px] py-[12px] shrink-0">
              <button onClick={() => setGalleryOpen(false)}>
                <X className="size-[21px] text-white" />
              </button>
              <h2
                className="font-['Fraunces:Regular',sans-serif] text-[18px] text-white"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                Camera Roll
              </h2>
              <motion.button
                onClick={confirmGallery}
                disabled={!selected}
                whileTap={{ scale: 0.92 }}
                className="rounded-full px-[16px] py-[7px] disabled:opacity-35"
                style={{ background: '#C9633A' }}
              >
                <p className="font-['Inter:Medium',sans-serif] text-[13px] text-white">Add</p>
              </motion.button>
            </div>

            <p className="font-['Inter:Regular',sans-serif] text-[11px] px-[16px] pb-[10px] shrink-0"
              style={{ color: 'rgba(255,255,255,0.38)' }}>
              Select 1 photo or video
            </p>

            {/* Photo grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-[2px]">
                {GALLERY.map(item => {
                  const isSelected = selected === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelected(isSelected ? null : item.id)}
                      className="aspect-square relative overflow-hidden"
                    >
                      <img src={item.src} alt="" className="w-full h-full object-cover" />

                      {/* Video badge */}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-end justify-between px-[6px] pb-[5px]"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }}>
                          <Play className="size-[11px] text-white fill-white" />
                          <p className="font-['Inter:Medium',sans-serif] text-[10px] text-white">
                            {item.duration}
                          </p>
                        </div>
                      )}

                      {/* Selection state */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: 'rgba(201,99,58,0.38)' }}
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: 'spring', damping: 14, stiffness: 300 }}
                              className="size-[30px] rounded-full flex items-center justify-center"
                              style={{ background: '#C9633A' }}
                            >
                              <Check className="size-[15px] text-white" />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Dimmed border when another item is selected */}
                      {selected && !isSelected && (
                        <div className="absolute inset-0 bg-black/30" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════════
          Posted success sheet
      ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-end z-20"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="bg-[#fff2ed] rounded-t-[24px] w-full p-[24px]"
            >
              <div className="size-[64px] rounded-full bg-[#E8B04B]/30 flex items-center justify-center mb-[12px] mx-auto">
                <p className="text-[32px]">🎉</p>
              </div>
              <h3
                className="font-['Fraunces:Regular',sans-serif] text-[22px] text-[#281e1b] text-center mb-[6px]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                {t('answer_more_title')}
              </h3>
              <p className="text-[13px] text-[#6b6860] text-center mb-[20px]">{t('answer_more_body')}</p>
              <button onClick={answerMore} className="bg-[#7e3f25] rounded-[48px] w-full py-[14px] mb-[8px]">
                <p className="font-['Domine:Regular',sans-serif] text-[15px] text-white text-center">{t('yes_more')}</p>
              </button>
              <button onClick={() => navigate('/home')} className="rounded-[48px] w-full py-[14px]" style={{ background: 'rgba(126,63,37,0.09)' }}>
                <p className="font-['Domine:Regular',sans-serif] text-[15px] text-[#7e3f25] text-center">{t('done_home')}</p>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}