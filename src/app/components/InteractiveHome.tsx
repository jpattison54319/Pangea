import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from './AppContext';
import { useT } from './i18n';
import { CONTINENTS } from './continents';
import { REGIONS, US_STATES, CITIES, COUNTRY_CITIES, USA_OUTLINE } from './geo-data';
import { Flame, Search, User, Bell, ArrowLeft } from 'lucide-react';

const GLOBE_SIZE = 300;
const R = GLOBE_SIZE / 2;

function project(lat: number, lng: number, rotY: number, rotX: number) {
  const phi = (lat * Math.PI) / 180;
  const theta = ((lng + rotY) * Math.PI) / 180;
  const rx = (rotX * Math.PI) / 180;
  let x = Math.cos(phi) * Math.sin(theta);
  let y = -Math.sin(phi);
  let z = Math.cos(phi) * Math.cos(theta);
  const y2 = y * Math.cos(rx) - z * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z * Math.cos(rx);
  return { x: x * R, y: y2 * R, z: z2 };
}

type Zoom = 'globe' | 'country' | 'state';

export default function InteractiveHome() {
  const navigate = useNavigate();
  const { user, isAuthenticated, unlockedRegions, hasAnsweredToday } = useApp();
  const t = useT();

  // Target (what we're animating toward) and current (displayed)
  const [cur, setCur] = useState({ rotY: -40, rotX: -10, scale: 1 });
  const tgt = useRef({ rotY: -40, rotX: -10, scale: 1 });
  const curRef = useRef(cur);
  curRef.current = cur;

  const [zoom, setZoom] = useState<Zoom>('globe');
  const [region, setRegion] = useState<string | null>(null); // current drilled country
  const [stateId, setStateId] = useState<string | null>(null);

  const idleRef = useRef(true);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, origY: 0, origX: 0, moved: false });
  const rafRef = useRef<number | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const globeAreaRef = useRef<HTMLDivElement>(null);

  // Single RAF loop: ease cur toward tgt, plus idle spin
  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last; last = now;
      const c = curRef.current;
      const t2 = tgt.current;
      const ease = 1 - Math.exp(-dt / 120);
      const nextY = c.rotY + (t2.rotY - c.rotY) * ease;
      const nextX = c.rotX + (t2.rotX - c.rotX) * ease;
      const nextS = c.scale + (t2.scale - c.scale) * ease;
      if (idleRef.current && zoomRef.current === 'globe') {
        tgt.current.rotY -= dt * 0.006; // spin
      }
      setCur({ rotY: nextY, rotX: nextX, scale: nextS });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const zoomRef = useRef<Zoom>('globe');
  zoomRef.current = zoom;

  // Drag + pinch-to-zoom handling
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (pointersRef.current.has(e.pointerId)) {
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }
      // Pinch zoom: two fingers → scale
      if (pinchRef.current && pointersRef.current.size >= 2) {
        const pts = [...pointersRef.current.values()];
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        tgt.current.scale = Math.max(1, Math.min(30, pinchRef.current.scale * (dist / pinchRef.current.dist)));
        return;
      }
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
      // Slow pan as user zooms in so a small finger move doesn't fling across the world
      const panFactor = 1 / tgt.current.scale;
      tgt.current.rotY = dragRef.current.origY + dx * 0.5 * panFactor;
      tgt.current.rotX = Math.max(-70, Math.min(70, dragRef.current.origX - dy * 0.4 * panFactor));
    };
    const onUp = (e: PointerEvent) => {
      pointersRef.current.delete(e.pointerId);
      if (pointersRef.current.size < 2) pinchRef.current = null;
      if (pointersRef.current.size === 0) {
        dragRef.current.active = false;
        setTimeout(() => { idleRef.current = true; dragRef.current.moved = false; }, 150);
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  // Scroll-wheel zoom (desktop)
  useEffect(() => {
    const el = globeAreaRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      idleRef.current = false;
      const factor = e.deltaY < 0 ? 1.1 : 0.92;
      tgt.current.scale = Math.max(1, Math.min(30, tgt.current.scale * factor));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    idleRef.current = false;
    if (pointersRef.current.size >= 2) {
      // Second finger down — switch to pinch mode
      dragRef.current.active = false;
      dragRef.current.moved = true; // suppress tap on lift
      const pts = [...pointersRef.current.values()];
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      pinchRef.current = { dist, scale: tgt.current.scale };
    } else {
      pinchRef.current = null;
      dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, origY: tgt.current.rotY, origX: tgt.current.rotX, moved: false };
    }
  };

  const zoomTo = (lat: number, lng: number, scale: number) => {
    idleRef.current = false;
    // Center globe on point: rotY = -lng, rotX = -lat
    tgt.current = { rotY: -lng, rotX: -lat, scale };
  };

  const resetGlobe = () => {
    idleRef.current = true;
    tgt.current = { rotY: -40, rotX: -10, scale: 1 };
    setZoom('globe'); setRegion(null); setStateId(null);
  };

  const zoomOut = () => {
    if (zoom === 'state') {
      const r = REGIONS.find(r => r.id === region);
      if (r) { zoomTo(r.lat, r.lng, 2.2); setZoom('country'); setStateId(null); }
    } else if (zoom === 'country') {
      resetGlobe();
    }
  };

  const onRegionClick = (id: string) => {
    if (dragRef.current.moved) return;
    const r = REGIONS.find(r => r.id === id);
    if (!r) return;
    zoomTo(r.lat, r.lng, 2.2);
    setZoom('country');
    setRegion(id);
  };

  const onStateClick = (id: string) => {
    if (dragRef.current.moved) return;
    const s = US_STATES.find(s => s.id === id);
    if (!s) return;
    zoomTo(s.lat, s.lng, 4.5);
    setZoom('state');
    setStateId(id);
  };

  const onCityClick = (cityId: string) => {
    if (dragRef.current.moved) return;
    navigate(`/reel/${cityId}`, { state: { from: 'globe' } });
  };

  // Decide which pins to show
  // Always show regions at any zoom level so users can navigate freely
  type Pin = { id: string; name: string; lat: number; lng: number; kind: 'region' | 'state' | 'city'; isBackground?: boolean };
  const visiblePins = useMemo<Pin[]>(() => {
    const globalPins: Pin[] = REGIONS.map(r => ({ ...r, kind: 'region' as const, isBackground: zoom !== 'globe' }));
    const localPins: Pin[] =
      zoom === 'globe'
        ? []
        : zoom === 'country'
        ? (region === 'usa'
            ? US_STATES.map(s => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng, kind: 'state' as const }))
            : (COUNTRY_CITIES[region!] || []).map(c => ({ ...c, kind: 'city' as const })))
        : (CITIES[stateId!] || []).map(c => ({ ...c, kind: 'city' as const }));
    return zoom === 'globe' ? globalPins : [...globalPins, ...localPins];
  }, [zoom, region, stateId]);

  const scale = cur.scale;

  // Stable per-pin screen-space offsets: computed ONCE per zoom-level change using
  // the "canonical" view (camera centered on the zoom target). Applying a fixed
  // offset on top of the live projection means pins follow the globe naturally
  // without bouncing as the user rotates or scales.
  const pinOffsets = useMemo<Record<string, { dx: number; dy: number }>>(() => {
    const offsets: Record<string, { dx: number; dy: number }> = {};
    if (zoom === 'globe') return offsets;

    let centerLat = 0, centerLng = 0, targetScale = 2.2;
    if (zoom === 'state') {
      const s = US_STATES.find(s => s.id === stateId);
      if (s) { centerLat = s.lat; centerLng = s.lng; targetScale = 4.5; }
    } else if (zoom === 'country') {
      const r = REGIONS.find(r => r.id === region);
      if (r) { centerLat = r.lat; centerLng = r.lng; targetScale = 2.2; }
    }
    const canonRotY = -centerLng;
    const canonRotX = -centerLat;
    // Only push pins apart when their VISIBLE dots are about to collide (not the
    // full 44px tap target). This keeps every pin anchored at its real lat/lng
    // unless two are genuinely on top of each other; the user can pinch-zoom in
    // to separate dense clusters and tap precisely.
    const UNSCALED_THRESHOLD = 14 / targetScale;

    const priority = (k: Pin['kind']) => (k === 'region' ? 0 : k === 'state' ? 1 : 2);
    const sorted = [...visiblePins].sort((a, b) => priority(a.kind) - priority(b.kind));
    const placed: { id: string; x: number; y: number }[] = [];

    for (const pin of sorted) {
      // Background region pins (shown faintly when zoomed into a country) are
      // decoration only — they shouldn't push city pins around or get displaced
      // themselves. Skipping them here keeps every city anchored at its true
      // lat/lng even when a region pin happens to project nearby on screen.
      if (pin.isBackground) continue;

      const proj = project(pin.lat, pin.lng, canonRotY, canonRotX);
      if (proj.z <= 0) continue;
      let x = proj.x, y = proj.y;
      for (let iter = 0; iter < 6; iter++) {
        let moved = false;
        for (const o of placed) {
          const dx = x - o.x, dy = y - o.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.01) { x += 1; y += 1; moved = true; }
          else if (dist < UNSCALED_THRESHOLD) {
            const push = UNSCALED_THRESHOLD - dist;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
            moved = true;
          }
        }
        if (!moved) break;
      }
      offsets[pin.id] = { dx: x - proj.x, dy: y - proj.y };
      placed.push({ id: pin.id, x, y });
    }

    return offsets;
  }, [zoom, region, stateId, visiblePins]);

  const answeredToday = isAuthenticated && hasAnsweredToday;

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden">

      <div className="px-[20px] pb-[4px] safe-top shrink-0 flex items-center gap-[8px]">
        {zoom !== 'globe' && (
          <button onClick={zoomOut} className="size-[32px] rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
            <ArrowLeft className="size-[16px] text-[#281e1b]" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-['Fraunces:Regular',sans-serif] text-[24px] text-[#c9633a] leading-[1.1]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            {zoom === 'globe' ? 'Pangea' : zoom === 'country' ? (REGIONS.find(r => r.id === region)?.name || '') : (US_STATES.find(s => s.id === stateId)?.name || '')}
          </h1>
          <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860]">
            {zoom === 'globe' ? t('drag_globe') : zoom === 'country' ? (region === 'usa' ? t('select_state') : t('select_city')) : t('select_city')}
          </p>
        </div>
        {isAuthenticated && zoom === 'globe' && (() => {
          const streak = user?.streak || 0;
          const onFire = streak > 1;
          return (
            <div className={`flex items-center gap-[5px] rounded-full px-[10px] py-[5px] shrink-0 ${onFire ? 'bg-[#C9633A]' : 'bg-[#cfe3ea]'}`}>
              <p className="text-[14px] leading-none">{onFire ? '🔥' : '🧊'}</p>
              <p className={`font-['Fraunces:Bold',sans-serif] text-[13px] leading-none ${onFire ? 'text-white' : 'text-[#1F6B6B]'}`}>
                {streak}
              </p>
            </div>
          );
        })()}
        {isAuthenticated && zoom === 'globe' && (
          <button onClick={() => navigate('/notifications')} className="ml-[10px] shrink-0">
            <Bell className="size-[20px] text-[#281e1b]" />
          </button>
        )}
      </div>

      {/* Globe */}
      <div ref={globeAreaRef} className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div
          className="relative touch-none select-none cursor-grab active:cursor-grabbing"
          style={{ width: GLOBE_SIZE, height: GLOBE_SIZE, transform: `scale(${scale})`, transition: 'none' }}
          onPointerDown={onPointerDown}
        >
          {/* Ocean sphere */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #4aa8b8 0%, #1F6B6B 55%, #0a3535 100%)',
              boxShadow: '0 20px 60px -20px rgba(31,107,107,0.5)',
            }}
          />

          <svg className="absolute inset-0 pointer-events-none" width={GLOBE_SIZE} height={GLOBE_SIZE} viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}>
            <defs>
              <clipPath id="sphereClip"><circle cx={R} cy={R} r={R - 1} /></clipPath>
              <radialGradient id="shade" cx="30%" cy="30%" r="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
              </radialGradient>
            </defs>
            <g clipPath="url(#sphereClip)">
              {/* Continents */}
              {CONTINENTS.map(cont =>
                cont.polys.map((poly, pi) => {
                  const pts = poly.map(([lat, lng]) => project(lat, lng, cur.rotY, cur.rotX));
                  const front = pts.filter(p => p.z > 0);
                  if (front.length < pts.length * 0.5 || front.length < 3) return null;
                  let started = false; let d = '';
                  pts.forEach(p => {
                    if (p.z > 0) { d += `${started ? 'L' : 'M'}${(R + p.x).toFixed(1)},${(R + p.y).toFixed(1)} `; started = true; }
                  });
                  if (!d) return null;
                  return <path key={`${cont.id}-${pi}`} d={d + 'Z'} fill="#3a7a4a" opacity={0.85} />;
                })
              )}

              {/* USA outline + state borders when zoomed to USA */}
              {zoom !== 'globe' && region === 'usa' && (
                <>
                  <polygon
                    points={USA_OUTLINE.map(([lat, lng]) => {
                      const p = project(lat, lng, cur.rotY, cur.rotX);
                      return p.z > 0 ? `${(R + p.x).toFixed(1)},${(R + p.y).toFixed(1)}` : '';
                    }).filter(Boolean).join(' ')}
                    fill="rgba(232,176,75,0.15)" stroke="#E8B04B" strokeWidth={0.8 / scale}
                  />
                  {US_STATES.map(s => {
                    const pts = s.bounds.map(([lat, lng]) => project(lat, lng, cur.rotY, cur.rotX));
                    if (pts.some(p => p.z < 0)) return null;
                    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(R + p.x).toFixed(1)},${(R + p.y).toFixed(1)}`).join(' ') + ' Z';
                    const highlight = s.id === stateId;
                    return <path key={s.id} d={d} fill={highlight ? 'rgba(201,99,58,0.45)' : 'rgba(255,255,255,0.08)'} stroke="#fff" strokeWidth={0.6 / scale} opacity={0.9} />;
                  })}
                </>
              )}

              {/* Grid */}
              {[-60, -30, 0, 30, 60].map(lat => {
                const pts: string[] = [];
                for (let lng = -180; lng <= 180; lng += 10) {
                  const p = project(lat, lng, cur.rotY, cur.rotX);
                  if (p.z > 0) pts.push(`${(R + p.x).toFixed(1)},${(R + p.y).toFixed(1)}`);
                }
                return pts.length > 1 ? <polyline key={`lat${lat}`} points={pts.join(' ')} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5 / scale} /> : null;
              })}
            </g>
            <circle cx={R} cy={R} r={R - 1} fill="url(#shade)" pointerEvents="none" />
          </svg>

          {/* Zoom indicator — shown when user has manually zoomed beyond drill-in scale */}
          {scale > 1.5 && (
            <div className="absolute top-[8px] right-[8px] bg-black/40 rounded-full px-[8px] py-[3px] pointer-events-none z-10"
              style={{ transform: `scale(${1 / scale})`, transformOrigin: 'top right' }}
            >
              <p className="font-['Inter:Medium',sans-serif] text-[11px] text-white tabular-nums">{scale.toFixed(1)}×</p>
            </div>
          )}

          {/* Pins */}
          {visiblePins.map(pin => {
            const proj = project(pin.lat, pin.lng, cur.rotY, cur.rotX);
            if (proj.z <= 0) return null;
            const off = pinOffsets[pin.id];
            const px = proj.x + (off?.dx ?? 0);
            const py = proj.y + (off?.dy ?? 0);
            const pz = proj.z;
            const pinScale = (0.8 + pz * 0.4) / scale;
            let opacity = Math.min(1, pz * 1.5);
            // Dim background region pins when zoomed into a country/state
            if ('isBackground' in pin && pin.isBackground) opacity *= 0.4;
            const unlocked = pin.kind === 'region' && unlockedRegions.has(pin.id);
            const visualSize = pin.kind === 'city' ? 10 : 14;
            // Button lives inside the scaled globe div, so divide by scale to keep its
            // on-screen size at ~44px no matter how far the user has zoomed in
            const HIT = 44 / scale;
            const showLabel = zoom !== 'globe' && pin.kind !== 'region';
            // Don't let pin visual shrink to nothing when user zooms in deep
            const groupScale = Math.max(0.55, pinScale);
            return (
              <button
                key={pin.id}
                onClick={() => {
                  if (pin.kind === 'region') onRegionClick(pin.id);
                  else if (pin.kind === 'state') onStateClick(pin.id);
                  else onCityClick(pin.id);
                }}
                className="absolute group"
                style={{ left: R + px - HIT / 2, top: R + py - HIT / 2, opacity, width: HIT, height: HIT }}
              >
                {/* Dot + label group — centered on lat/lng, scales together */}
                <div
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  style={{
                    width: visualSize,
                    height: visualSize,
                    transform: `translate(-50%, -50%) scale(${groupScale})`,
                  }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#E8B04B]"
                    animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div
                    className="absolute inset-[2px] rounded-full border border-white"
                    style={{ background: '#E8B04B', boxShadow: unlocked ? '0 0 0 1.5px rgba(232,176,75,0.6)' : 'none' }}
                  />
                  {/* Label — directly under the dot, in the same scaled coordinate space */}
                  {showLabel && (
                    <p
                      className="absolute left-1/2 -translate-x-1/2 font-['Inter:Medium',sans-serif] text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.95)] whitespace-nowrap"
                      style={{
                        top: visualSize + 1,
                        fontSize: pin.kind === 'city' ? 6 : 7,
                        lineHeight: 1,
                        letterSpacing: 0,
                      }}
                    >
                      {pin.name}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="px-[20px] pb-[12px] shrink-0 flex items-center gap-[10px]">
        <button
          onClick={() => navigate(isAuthenticated ? '/daily-question' : '/sign-in')}
          className="flex-1 bg-[#7e3f25] rounded-full px-[16px] py-[10px] shadow-[0px_4px_12px_-2px_rgba(126,63,37,0.4)]"
        >
          <p className="font-['Domine:Regular',sans-serif] text-[13px] text-white text-center">
            {answeredToday ? t('answer_more_cta') : t('answer_question')}
          </p>
        </button>
      </div>

      <div className="h-[60px] bg-white shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.08)] flex items-center justify-around shrink-0">
        <button onClick={resetGlobe} className="flex flex-col items-center gap-[2px]">
          <div className="size-[22px] flex items-center justify-center text-[18px]">🌍</div>
          <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[#7e3f25]">{t('globe')}</p>
        </button>
        <button onClick={() => navigate('/search')} className="flex flex-col items-center gap-[2px]">
          <Search className="size-[22px] text-[rgba(0,0,0,0.5)]" />
          <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">{t('search')}</p>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-[2px]">
          <User className="size-[22px] text-[rgba(0,0,0,0.5)]" />
          <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]">{t('profile')}</p>
        </button>
      </div>
    </div>
  );
}