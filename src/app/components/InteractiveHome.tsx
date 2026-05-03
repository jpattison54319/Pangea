import { useLocation, useNavigate } from 'react-router';
import Globe from 'react-globe.gl';
import { MeshPhongMaterial } from 'three';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from './AppContext';
import { useT } from './i18n';
import { REGIONS, US_STATES, CITIES, COUNTRY_CITIES } from './geo-data';
import { Search, User, Bell, ArrowLeft } from 'lucide-react';

type Zoom = 'globe' | 'country' | 'state';
type Pin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  kind: 'region' | 'state' | 'city';
  isBackground?: boolean;
};
type GlobeReturnState = {
  zoom: Zoom;
  region: string | null;
  stateId: string | null;
};
type CountryFeature = {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
};

const DEFAULT_VIEW = { lat: 18, lng: -40, altitude: 2.55 };
const COUNTRY_ALTITUDE = 1.25;
const STATE_ALTITUDE = 0.72;
const MIN_CAMERA_ALTITUDE = 0.08;
const MAX_CAMERA_ALTITUDE = 3.2;

const oceanMaterial = new MeshPhongMaterial({
  color: '#1F6B6B',
  emissive: '#092f2f',
  shininess: 18,
  opacity: 0.98,
  transparent: true,
});

function viewForGlobeState(zoom: Zoom, region: string | null, stateId: string | null) {
  if (zoom === 'state') {
    const state = US_STATES.find(item => item.id === stateId);
    if (state) return { lat: state.lat, lng: state.lng, altitude: STATE_ALTITUDE };
  }

  if (zoom === 'country') {
    const country = REGIONS.find(item => item.id === region);
    if (country) return { lat: country.lat, lng: country.lng, altitude: COUNTRY_ALTITUDE };
  }

  return DEFAULT_VIEW;
}

function setButtonStyles(el: HTMLElement, pin: Pin, showLabel: boolean, unlocked: boolean) {
  const visualSize = pin.kind === 'city' ? 10 : 14;
  const opacity = pin.isBackground ? 0.42 : 1;

  el.className = 'pangea-globe-marker';
  el.style.width = '44px';
  el.style.minHeight = showLabel ? '58px' : '44px';
  el.style.border = '0';
  el.style.background = 'transparent';
  el.style.padding = '0';
  el.style.cursor = 'pointer';
  el.style.pointerEvents = 'auto';
  el.style.opacity = `${opacity}`;
  el.style.transform = 'translate(-50%, -50%)';

  const dotWrap = document.createElement('span');
  dotWrap.className = 'pangea-globe-marker-dot-wrap';
  dotWrap.style.width = `${visualSize}px`;
  dotWrap.style.height = `${visualSize}px`;

  const pulse = document.createElement('span');
  pulse.className = 'pangea-globe-marker-pulse';

  const dot = document.createElement('span');
  dot.className = 'pangea-globe-marker-dot';
  dot.style.boxShadow = unlocked ? '0 0 0 2px rgba(232,176,75,0.65)' : 'none';

  dotWrap.append(pulse, dot);
  el.appendChild(dotWrap);

  if (showLabel) {
    const label = document.createElement('span');
    label.className = 'pangea-globe-marker-label';
    label.textContent = pin.name;
    el.appendChild(label);
  }
}

export default function InteractiveHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const restoredGlobe = (location.state as { globeReturn?: GlobeReturnState } | null)?.globeReturn;
  const { user, isAuthenticated, unlockedRegions, hasAnsweredToday } = useApp();
  const t = useT();

  const globeRef = useRef<any>(null);
  const globeAreaRef = useRef<HTMLDivElement>(null);
  const cameraAltitudeRef = useRef(DEFAULT_VIEW.altitude);
  const [globeSize, setGlobeSize] = useState(320);
  const [zoom, setZoom] = useState<Zoom>(restoredGlobe?.zoom || 'globe');
  const [region, setRegion] = useState<string | null>(restoredGlobe?.region || null);
  const [stateId, setStateId] = useState<string | null>(restoredGlobe?.stateId || null);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [cameraAltitude, setCameraAltitude] = useState(DEFAULT_VIEW.altitude);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/world.geojson')
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setCountries(data.features || []);
      })
      .catch(() => {
        if (!cancelled) setCountries([]);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const el = globeAreaRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      const next = Math.max(280, Math.min(430, rect.width - 16, rect.height - 16));
      setGlobeSize(next);
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const configureControls = useCallback((autoRotate: boolean) => {
    const controls = globeRef.current?.controls?.();
    if (!controls) return;

    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.55;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 104;
    controls.maxDistance = 620;
  }, []);

  useEffect(() => {
    configureControls(zoom === 'globe');
  }, [configureControls, zoom]);

  const moveCamera = useCallback((lat: number, lng: number, altitude: number, duration = 900) => {
    configureControls(false);
    globeRef.current?.pointOfView({ lat, lng, altitude }, duration);
    cameraAltitudeRef.current = altitude;
    setCameraAltitude(altitude);
  }, [configureControls]);

  const zoomGlobeByWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const globe = globeRef.current;
    const pov = globe?.pointOfView?.();
    const currentAltitude = typeof pov?.altitude === 'number' ? pov.altitude : cameraAltitudeRef.current;
    const zoomRatio = event.deltaY < 0 ? 0.78 : 1.18;
    const nextAltitude = Math.max(MIN_CAMERA_ALTITUDE, Math.min(MAX_CAMERA_ALTITUDE, currentAltitude * zoomRatio));

    configureControls(false);
    if (pov) {
      globe.pointOfView({ ...pov, altitude: nextAltitude }, 120);
    }
    cameraAltitudeRef.current = nextAltitude;
    setCameraAltitude(nextAltitude);
  }, [configureControls]);

  const resetGlobe = useCallback(() => {
    setZoom('globe');
    setRegion(null);
    setStateId(null);
    globeRef.current?.pointOfView(DEFAULT_VIEW, 900);
    cameraAltitudeRef.current = DEFAULT_VIEW.altitude;
    setCameraAltitude(DEFAULT_VIEW.altitude);
    window.setTimeout(() => configureControls(true), 950);
  }, [configureControls]);

  const zoomOut = () => {
    if (zoom === 'state') {
      const r = REGIONS.find(item => item.id === region);
      if (!r) return;
      setZoom('country');
      setStateId(null);
      moveCamera(r.lat, r.lng, COUNTRY_ALTITUDE);
    } else if (zoom === 'country') {
      resetGlobe();
    }
  };

  const onRegionClick = useCallback((id: string) => {
    const r = REGIONS.find(item => item.id === id);
    if (!r) return;
    setZoom('country');
    setRegion(id);
    setStateId(null);
    moveCamera(r.lat, r.lng, COUNTRY_ALTITUDE);
  }, [moveCamera]);

  const onStateClick = useCallback((id: string) => {
    const state = US_STATES.find(item => item.id === id);
    if (!state) return;
    setZoom('state');
    setStateId(id);
    moveCamera(state.lat, state.lng, STATE_ALTITUDE);
  }, [moveCamera]);

  const onCityClick = useCallback((cityId: string) => {
    navigate(`/reel/${cityId}`, {
      state: {
        from: 'globe',
        globeReturn: { zoom, region, stateId },
      },
    });
  }, [navigate, region, stateId, zoom]);

  const visiblePins = useMemo<Pin[]>(() => {
    const globalPins: Pin[] = REGIONS.map(r => ({
      id: r.id,
      name: r.name,
      lat: r.lat,
      lng: r.lng,
      kind: 'region',
      isBackground: zoom !== 'globe',
    }));

    const localPins: Pin[] =
      zoom === 'globe'
        ? []
        : zoom === 'country'
          ? (region === 'usa'
              ? US_STATES.map(s => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng, kind: 'state' as const }))
              : (COUNTRY_CITIES[region || ''] || []).map(c => ({ ...c, kind: 'city' as const })))
          : (CITIES[stateId || ''] || []).map(c => ({ ...c, kind: 'city' as const }));

    return zoom === 'globe' ? globalPins : [...globalPins, ...localPins];
  }, [zoom, region, stateId]);

  const createMarkerElement = useCallback((pin: Pin) => {
    const el = document.createElement('button');
    const showLabel = zoom !== 'globe' && pin.kind !== 'region';
    const unlocked = pin.kind === 'region' && unlockedRegions.has(pin.id);

    setButtonStyles(el, pin, showLabel, unlocked);
    el.setAttribute('aria-label', pin.name);
    el.type = 'button';
    el.onclick = event => {
      event.stopPropagation();
      if (pin.kind === 'region') onRegionClick(pin.id);
      else if (pin.kind === 'state') onStateClick(pin.id);
      else onCityClick(pin.id);
    };
    el.onwheel = zoomGlobeByWheel;
    return el;
  }, [onCityClick, onRegionClick, onStateClick, unlockedRegions, zoom, zoomGlobeByWheel]);

  const zoomFactor = DEFAULT_VIEW.altitude / cameraAltitude;
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

      <div ref={globeAreaRef} className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div
          className="relative rounded-full"
          style={{
            width: globeSize,
            height: globeSize,
            filter: 'drop-shadow(0 24px 36px rgba(31,107,107,0.28))',
          }}
        >
          <Globe
            ref={globeRef}
            width={globeSize}
            height={globeSize}
            backgroundColor="rgba(0,0,0,0)"
            globeMaterial={oceanMaterial}
            showAtmosphere
            atmosphereColor="#9bd3db"
            atmosphereAltitude={0.12}
            showGraticules
            waitForGlobeReady
            animateIn={false}
            polygonsData={countries}
            polygonGeoJsonGeometry="geometry"
            polygonAltitude={0.006}
            polygonCapColor={() => 'rgba(58,122,74,0.9)'}
            polygonSideColor={() => 'rgba(30,76,48,0.9)'}
            polygonStrokeColor={() => 'rgba(255,255,255,0.12)'}
            polygonsTransitionDuration={250}
            htmlElementsData={visiblePins}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.015}
            htmlElement={createMarkerElement}
            htmlTransitionDuration={250}
            onGlobeReady={() => {
              const view = viewForGlobeState(zoom, region, stateId);
              globeRef.current?.pointOfView(view, 0);
              cameraAltitudeRef.current = view.altitude;
              setCameraAltitude(view.altitude);
              configureControls(zoom === 'globe');
            }}
            onZoom={(pov: { altitude?: number }) => {
              if (typeof pov.altitude === 'number') {
                cameraAltitudeRef.current = pov.altitude;
                setCameraAltitude(pov.altitude);
              }
            }}
          />

          {zoomFactor > 1.5 && (
            <div className="absolute top-[8px] right-[8px] bg-black/40 rounded-full px-[8px] py-[3px] pointer-events-none z-10">
              <p className="font-['Inter:Medium',sans-serif] text-[11px] text-white tabular-nums">{zoomFactor.toFixed(1)}x</p>
            </div>
          )}
        </div>
      </div>

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
