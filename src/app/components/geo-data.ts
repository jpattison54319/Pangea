// Simplified lat/lng geo data for drill-down globe.

export type Point = { id: string; name: string; lat: number; lng: number };
export type Area = Point & { bounds: [number, number][] }; // polygon in lat,lng

// World regions (reachable from globe level)
export const REGIONS: (Point & { country?: string })[] = [
  { id: 'usa', name: 'United States', lat: 39, lng: -98, country: 'usa' },
  { id: 'guatemala', name: 'Guatemala', lat: 14, lng: -90 },
  { id: 'brazil', name: 'Brazil', lat: -15, lng: -55 },
  { id: 'iceland', name: 'Iceland', lat: 64, lng: -19 },
  { id: 'portugal', name: 'Portugal', lat: 38.7, lng: -9.1 },
  { id: 'namibia', name: 'Namibia', lat: -22, lng: 17 },
  { id: 'india', name: 'India', lat: 22, lng: 78 },
  { id: 'japan', name: 'Japan', lat: 36, lng: 138 },
  { id: 'egypt', name: 'Egypt', lat: 26.8, lng: 30.8 },
  { id: 'kazakhstan', name: 'Kazakhstan', lat: 48.0, lng: 66.9 },
  { id: 'mexico', name: 'Mexico', lat: 23.63, lng: -102.55 },
];

// US states — simplified bounding polygons for drawing + center points for pins
export const US_STATES: Area[] = [
  { id: 'ohio', name: 'Ohio', lat: 40.3, lng: -82.7, bounds: [[38.4,-84.8],[41.9,-84.8],[41.9,-80.5],[38.4,-80.5]] },
  { id: 'iowa', name: 'Iowa', lat: 42.0, lng: -93.5, bounds: [[40.4,-96.6],[43.5,-96.6],[43.5,-90.1],[40.4,-90.1]] },
  { id: 'california', name: 'California', lat: 37, lng: -119, bounds: [[32.5,-124.4],[42,-124.4],[42,-114.1],[32.5,-114.1]] },
  { id: 'new-york', name: 'New York', lat: 42.9, lng: -75.5, bounds: [[40.5,-79.8],[45,-79.8],[45,-71.9],[40.5,-71.9]] },
  { id: 'missouri', name: 'Missouri', lat: 38.3, lng: -92.4, bounds: [[36,-95.8],[40.6,-95.8],[40.6,-89.1],[36,-89.1]] },
  { id: 'illinois', name: 'Illinois', lat: 40.6, lng: -89.4, bounds: [[37,-91.5],[42.5,-91.5],[42.5,-87.5],[37,-87.5]] },
];

// Cities per state (final drill level)
export const CITIES: Record<string, Point[]> = {
  ohio: [
    { id: 'columbus', name: 'Columbus', lat: 39.96, lng: -82.99 },
    { id: 'cleveland', name: 'Cleveland', lat: 41.5, lng: -81.7 },
    { id: 'cincinnati', name: 'Cincinnati', lat: 39.1, lng: -84.5 },
  ],
  iowa: [
    { id: 'des-moines', name: 'Des Moines', lat: 41.59, lng: -93.62 },
    { id: 'iowa-city', name: 'Iowa City', lat: 41.66, lng: -91.53 },
  ],
  california: [
    { id: 'sf', name: 'San Francisco', lat: 37.77, lng: -122.42 },
  ],
  'new-york': [
    { id: 'nyc', name: 'New York City', lat: 40.71, lng: -74.01 },
  ],
  missouri: [
    { id: 'kansas-city', name: 'Kansas City', lat: 39.1, lng: -94.58 },
  ],
  illinois: [
    { id: 'chicago', name: 'Chicago', lat: 41.87, lng: -87.62 },
  ],
};

// For non-US regions: direct cities at country zoom
export const COUNTRY_CITIES: Record<string, Point[]> = {
  guatemala: [
    { id: 'guatemala-city', name: 'Guatemala City', lat: 14.63, lng: -90.51 },
    { id: 'antigua', name: 'Antigua', lat: 14.56, lng: -90.73 },
    { id: 'tikal', name: 'Tikal', lat: 17.22, lng: -89.61 },
    { id: 'atitlan', name: 'Lake Atitlán', lat: 14.69, lng: -91.20 },
    { id: 'semuc', name: 'Semuc Champey', lat: 15.55, lng: -89.95 },
    { id: 'huehue', name: 'Huehuetenango', lat: 15.32, lng: -91.47 }
  ],
  brazil: [{ id: 'rio', name: 'Rio de Janeiro', lat: -22.91, lng: -43.17 }],
  iceland: [{ id: 'reykjavik', name: 'Reykjavik', lat: 64.15, lng: -21.94 }, { id: 'akureyri', name: 'Akureyri', lat: 65.68, lng: -18.09 }],
  portugal: [{ id: 'lisbon', name: 'Lisbon', lat: 38.72, lng: -9.14 }, { id: 'porto', name: 'Porto', lat: 41.15, lng: -8.61 }],
  namibia: [
    { id: 'windhoek', name: 'Windhoek', lat: -22.56, lng: 17.08 },
    { id: 'swakopmund', name: 'Swakopmund', lat: -22.68, lng: 14.53 },
    { id: 'luderitz', name: 'Lüderitz', lat: -26.64, lng: 15.15 }, // For Diaz Point
    { id: 'tsumeb', name: 'Tsumeb Area', lat: -19.23, lng: 17.71 }, // For the Lake & Meteorite
    { id: 'oshakati', name: 'Oshakati', lat: -17.78, lng: 15.70 },
  ],
  india: [{ id: 'jaipur', name: 'Jaipur', lat: 26.92, lng: 75.78 }, { id: 'mumbai', name: 'Mumbai', lat: 19.08, lng: 72.88 }, { id: 'kolkata', name: 'Kolkata', lat: 22.57, lng: 88.36 }],
  japan: [{ id: 'tokyo', name: 'Tokyo', lat: 35.68, lng: 139.69 }],
  egypt: [{ id: 'cairo', name: 'Cairo', lat: 30.0444, lng: 31.2357 }, { id: 'luxor', name: 'Luxor', lat: 25.6872, lng: 32.6396 }],
  kazakhstan: [{ id: 'astana', name: 'Astana', lat: 51.16, lng: 71.47 }],
  mexico: [{ id: 'guadalajara', name: 'Guadalajara', lat: 20.65, lng: -103.34 }],
};

// Country outlines — simplified for drawing when zoomed in (used for USA)
export const USA_OUTLINE: [number, number][] = [
  [49, -125], [49, -95], [49, -83], [45, -83], [45, -75], [47, -68], [44, -67], [41, -72], [40, -74],
  [37, -76], [35, -76], [32, -81], [25, -80], [25, -82], [30, -88], [29, -94], [26, -97], [28, -103],
  [32, -107], [32, -117], [34, -121], [41, -124], [49, -125],
];