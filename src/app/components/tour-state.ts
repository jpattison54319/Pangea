export const TOUR_OFFERED_KEY = 'pangea-tour-offered-v1';

export function hasSeenTourOffer() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(TOUR_OFFERED_KEY) === '1';
}

export function markTourOffered() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TOUR_OFFERED_KEY, '1');
}
