import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, TROPHIES, xpInCurrentLevel, XP_PER_LEVEL } from './AppContext';
import { useT } from './i18n';

export default function TrophyOverlay() {
  const {
    pendingTrophy, clearPendingTrophy,
    pendingLevelUp, clearPendingLevelUp,
    xp,
  } = useApp();
  const t = useT();

  const trophy = pendingTrophy ? TROPHIES.find(tr => tr.id === pendingTrophy) : null;

  useEffect(() => {
    if (!pendingTrophy) return;
    const timer = setTimeout(clearPendingTrophy, 4000);
    return () => clearTimeout(timer);
  }, [pendingTrophy]);

  useEffect(() => {
    if (!pendingLevelUp) return;
    const timer = setTimeout(clearPendingLevelUp, 3400);
    return () => clearTimeout(timer);
  }, [pendingLevelUp]);

  return (
    <>
      {/* ── Trophy unlock — top-right floating card ── */}
      <AnimatePresence>
        {trophy && !pendingLevelUp && (
          <motion.div
            key={pendingTrophy}
            initial={{ x: 80, opacity: 0, scale: 0.88 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 80, opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', damping: 24, stiffness: 340 }}
            className="absolute top-[52px] right-[14px] z-50 w-[220px] pointer-events-auto"
            onClick={clearPendingTrophy}
          >
            {/* Card */}
            <div
              className="relative rounded-[18px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fff2ed 0%, #fce8dc 100%)',
                boxShadow: '0 8px 32px -4px rgba(126,63,37,0.28), 0 2px 8px -2px rgba(126,63,37,0.16)',
                border: '1px solid rgba(201,99,58,0.22)',
              }}
            >
              {/* Terracotta top bar */}
              <div
                className="h-[3px] w-full"
                style={{ background: 'linear-gradient(90deg, #C9633A 0%, #E8B04B 100%)' }}
              />

              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.1, delay: 0.2, ease: 'easeInOut' }}
              />

              <div className="p-[14px]">
                {/* Label row */}
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="flex items-center gap-[5px] mb-[10px]"
                >
                  <div
                    className="size-[16px] rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,99,58,0.15)' }}
                  >
                    <span className="text-[9px] leading-none">🏆</span>
                  </div>
                  <p
                    className="font-['Inter:Medium',sans-serif] text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: '#C9633A' }}
                  >
                    {t('trophy_unlocked')}
                  </p>
                </motion.div>

                {/* Icon + name row */}
                <div className="flex items-center gap-[12px]">
                  {/* Icon bubble */}
                  <div className="relative shrink-0">
                    <motion.div
                      className="size-[48px] rounded-[14px] flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(201,99,58,0.18) 0%, rgba(232,176,75,0.14) 100%)', border: '1px solid rgba(201,99,58,0.25)' }}
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(201,99,58,0.35)',
                          '0 0 0 10px rgba(201,99,58,0)',
                          '0 0 0 0 rgba(201,99,58,0)',
                        ],
                      }}
                      transition={{ duration: 1.4, repeat: 2, ease: 'easeOut' }}
                    >
                      <motion.span
                        className="text-[26px]"
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 9, stiffness: 220, delay: 0.12 }}
                      >
                        {trophy.icon}
                      </motion.span>
                    </motion.div>

                    {/* Corner sparkles */}
                    {[[-8, -8], [56, -8], [-8, 56], [56, 56]].map(([cx, cy], i) => (
                      <motion.div
                        key={i}
                        className="absolute size-[4px] rounded-full"
                        style={{ left: cx, top: cy, background: i % 2 === 0 ? '#C9633A' : '#E8B04B' }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
                        transition={{ duration: 0.6, delay: 0.18 + i * 0.07 }}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="font-['Fraunces:Regular',sans-serif] text-[16px] leading-tight"
                      style={{ color: '#281e1b', fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                    >
                      {trophy.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.22 }}
                      className="font-['Inter:Regular',sans-serif] text-[10px] leading-snug mt-[2px]"
                      style={{ color: '#6b6860' }}
                    >
                      {trophy.earnedDescription}
                    </motion.p>
                  </div>
                </div>

                {/* XP chip */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: 'spring', damping: 14 }}
                  className="mt-[10px] flex items-center justify-between"
                >
                  <div
                    className="flex items-center gap-[5px] rounded-full px-[10px] py-[4px]"
                    style={{ background: 'linear-gradient(90deg, rgba(201,99,58,0.14) 0%, rgba(232,176,75,0.14) 100%)', border: '1px solid rgba(201,99,58,0.2)' }}
                  >
                    <span className="text-[11px]">⭐</span>
                    <p className="font-['Inter:Bold',sans-serif] text-[11px]" style={{ color: '#7e3f25' }}>
                      +{trophy.xpReward} XP
                    </p>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] text-[9px]" style={{ color: '#C9633A', opacity: 0.7 }}>
                    {t('tap_to_dismiss')}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Level up fullscreen overlay ── */}
      <AnimatePresence>
        {pendingLevelUp && (
          <motion.div
            key={`level-${pendingLevelUp}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-auto"
            onClick={clearPendingLevelUp}
          >
            {/* Warm dark bg */}
            <div className="absolute inset-0" style={{ background: 'rgba(40,30,27,0.93)' }} />

            {/* Radial warm glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(201,99,58,0.22) 0%, transparent 68%)' }}
              animate={{ scale: [0.7, 1.15, 1], opacity: [0, 1, 0.65] }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />

            {/* Burst rays — terracotta tones */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 2.5,
                  height: 72,
                  top: '50%',
                  left: '50%',
                  originX: '50%',
                  originY: '100%',
                  rotate: i * 36,
                  marginTop: -72,
                  marginLeft: -1.25,
                  background: i % 2 === 0 ? 'rgba(201,99,58,0.5)' : 'rgba(232,176,75,0.35)',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.6, 1], opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.9, delay: 0.18, ease: 'easeOut' }}
              />
            ))}

            <div className="relative text-center z-10 px-[40px]">
              {/* Terracotta badge */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 9, stiffness: 170, delay: 0.08 }}
                className="inline-flex items-center justify-center size-[72px] rounded-[22px] mb-[12px]"
                style={{
                  background: 'linear-gradient(135deg, #C9633A 0%, #7e3f25 100%)',
                  boxShadow: '0 12px 40px -8px rgba(201,99,58,0.6)',
                }}
              >
                <span className="text-[36px]">⭐</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="font-['Inter:Medium',sans-serif] text-[12px] uppercase tracking-[0.22em] mb-[4px]"
                style={{ color: '#C9633A' }}
              >
                {t('level_up')}
              </motion.p>

              <motion.p
                initial={{ scale: 0.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', damping: 7, stiffness: 170 }}
                className="font-['Fraunces:Regular',sans-serif] leading-none"
                style={{ fontSize: 96, color: '#fff2ed', fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                {pendingLevelUp}
              </motion.p>

              {/* XP bar */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58 }}
                className="mt-[18px]"
              >
                <div
                  className="h-[6px] rounded-full overflow-hidden w-[180px] mx-auto"
                  style={{ background: 'rgba(255,242,237,0.12)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #C9633A 0%, #E8B04B 100%)' }}
                    initial={{ width: '100%' }}
                    animate={{ width: `${(xpInCurrentLevel(xp) / XP_PER_LEVEL) * 100}%` }}
                    transition={{ duration: 0.85, delay: 0.85 }}
                  />
                </div>
                <p
                  className="font-['Inter:Regular',sans-serif] text-[11px] mt-[8px]"
                  style={{ color: 'rgba(255,242,237,0.45)' }}
                >
                  {xpInCurrentLevel(xp)} / {XP_PER_LEVEL} XP · Level {pendingLevelUp + 1} next
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="font-['Inter:Regular',sans-serif] text-[11px] mt-[22px]"
                style={{ color: 'rgba(255,242,237,0.3)' }}
              >
                {t('tap_to_continue')}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}