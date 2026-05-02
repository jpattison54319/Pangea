export type Kind = 'video' | 'photo' | 'text';
export type Vid = {
  id: string; region: string; category: string; questionKey: number;
  username: string; location: string; likes: number; captionKey: number;
  gradient: string; kind: Kind; media?: string;
  country: string; state?: string; city: string;
};

// Alias groups: any member expands to all siblings for matching
const ALIASES: string[][] = [
  ['usa', 'united states', 'united states of america', 'us', 'u.s.', 'u.s.a.', 'america'],
  ['uk', 'united kingdom', 'britain', 'great britain'],
  ['japan', 'nippon', '日本'],
  ['brazil', 'brasil'],
];

const norm = (s: string) => s.toLowerCase().replace(/[.,]/g, '').trim();

export function expandQuery(q: string): string[] {
  const n = norm(q);
  if (!n) return [];
  const out = new Set<string>([n]);
  for (const group of ALIASES) {
    if (group.some(g => norm(g) === n)) group.forEach(g => out.add(norm(g)));
  }
  return [...out];
}

export const MOCK: Vid[] = [
  { id: 'v1', region: 'kansas-city', category: 'food', questionKey: 0, username: '@maya.kc', location: 'Kansas City, MO, USA', likes: 1234, captionKey: 10, gradient: 'from-[#C9633A] to-[#7e3f25]', kind: 'video', media: 'https://images.unsplash.com/photo-1671082270813-674362924202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'USA', state: 'Missouri', city: 'Kansas City' },
  { id: 'v2', region: 'windhoek', category: 'traditions', questionKey: 1, username: '@tuahepa.wnb', location: 'Windhoek, Namibia', likes: 892, captionKey: 1, gradient: 'from-[#E8B04B] to-[#C9633A]', kind: 'photo', media: 'https://images.unsplash.com/photo-1740057419431-b0a488f7503c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'Namibia', city: 'Windhoek' },
  { id: 'v3', region: 'antigua', category: 'food', questionKey: 0, username: '@isabela.ant', location: 'Antigua, Guatemala', likes: 2156, captionKey: 2, gradient: 'from-[#1F6B6B] to-[#0d4545]', kind: 'text', country: 'Guatemala', city: 'Antigua' },
  { id: 'v4', region: 'tokyo', category: 'daily-life', questionKey: 2, username: '@kenji.tyo', location: 'Tokyo, Japan', likes: 3421, captionKey: 3, gradient: 'from-[#1F6B6B] to-[#281e1b]', kind: 'video', media: 'https://images.unsplash.com/photo-1629020770453-d3d15182474c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'Japan', city: 'Tokyo' },
  { id: 'v5', region: 'reykjavik', category: 'music', questionKey: 4, username: '@jon.rvk', location: 'Reykjavik, Iceland', likes: 567, captionKey: 4, gradient: 'from-[#3a9b9b] to-[#1F6B6B]', kind: 'photo', media: 'https://images.unsplash.com/photo-1708381487712-2d9343cc2164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'Iceland', city: 'Reykjavik' },
  { id: 'v6', region: 'swakopmund', category: 'nature', questionKey: 1, username: '@ananias.swk', location: 'Swakopmund, Namibia', likes: 4120, captionKey: 5, gradient: 'from-[#C9633A] to-[#7e3f25]', kind: 'photo', media: 'https://images.unsplash.com/photo-1478937988996-b18edf18f5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'Namibia', city: 'Swakopmund' },
  { id: 'v7', region: 'rio', category: 'music', questionKey: 4, username: '@joao.rio', location: 'Rio de Janeiro, Brazil', likes: 1987, captionKey: 6, gradient: 'from-[#1F6B6B] to-[#281e1b]', kind: 'video', media: 'https://images.unsplash.com/photo-1678044865436-29d7fcca4ffe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'Brazil', city: 'Rio de Janeiro' },
  { id: 'v8', region: 'guatemala-city', category: 'food', questionKey: 0, username: '@camila.gt', location: 'Guatemala City, Guatemala', likes: 834, captionKey: 7, gradient: 'from-[#7e3f25] to-[#281e1b]', kind: 'text', country: 'Guatemala', city: 'Guatemala City' },
  { id: 'v9', region: 'lisbon', category: 'daily-life', questionKey: 2, username: '@ana.lis', location: 'Lisbon, Portugal', likes: 1556, captionKey: 8, gradient: 'from-[#E8B04B] to-[#C9633A]', kind: 'photo', media: 'https://images.unsplash.com/photo-1655208511974-6b462a6f9c98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'Portugal', city: 'Lisbon' },
  { id: 'v10', region: 'jaipur', category: 'traditions', questionKey: 1, username: '@priya.jpr', location: 'Jaipur, India', likes: 5201, captionKey: 9, gradient: 'from-[#C9633A] to-[#7e3f25]', kind: 'video', media: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'India', state: 'Rajasthan', city: 'Jaipur' },
  { id: 'v11', region: 'columbus', category: 'daily-life', questionKey: 2, username: '@derek.cbus', location: 'Columbus, OH, USA', likes: 612, captionKey: 11, gradient: 'from-[#C9633A] to-[#7e3f25]', kind: 'photo', media: 'https://images.unsplash.com/photo-1575338334737-700ca00d959e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'USA', state: 'Ohio', city: 'Columbus' },
  { id: 'v12', region: 'cleveland', category: 'music', questionKey: 4, username: '@rae.cle', location: 'Cleveland, OH, USA', likes: 741, captionKey: 12, gradient: 'from-[#1F6B6B] to-[#281e1b]', kind: 'video', media: 'https://images.unsplash.com/photo-1772224125771-ab1f3b6742c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'USA', state: 'Ohio', city: 'Cleveland' },
  { id: 'v13', region: 'nyc', category: 'food', questionKey: 0, username: '@sam.nyc', location: 'New York City, NY, USA', likes: 9812, captionKey: 13, gradient: 'from-[#E8B04B] to-[#C9633A]', kind: 'video', media: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', country: 'USA', state: 'New York', city: 'New York City' },
  { id: 'v14', region: 'des-moines', category: 'food', questionKey: 0, username: '@claire.dsm', location: 'Des Moines, IA, USA', likes: 438, captionKey: 14, gradient: 'from-[#C9633A] to-[#7e3f25]', kind: 'photo', media: 'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', country: 'USA', state: 'Iowa', city: 'Des Moines' },
  { id: 'v15', region: 'iowa-city', category: 'daily-life', questionKey: 2, username: '@jess.ic', location: 'Iowa City, IA, USA', likes: 312, captionKey: 19, gradient: 'from-[#1F6B6B] to-[#0d4545]', kind: 'photo', media: 'https://images.unsplash.com/photo-1734369341627-767aedf501c0?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', country: 'USA', state: 'Iowa', city: 'Iowa City' },
  { id: 'v16', region: 'des-moines', category: 'traditions', questionKey: 1, username: '@marcus.dsm', location: 'Des Moines, IA, USA', likes: 892, captionKey: 15, gradient: 'from-[#E8B04B] to-[#C9633A]', kind: 'video', media: 'https://images.unsplash.com/photo-1538627582899-e94f9a0d4c6a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', country: 'USA', state: 'Iowa', city: 'Des Moines' },
  { id: 'v17', region: 'des-moines', category: 'music', questionKey: 4, username: '@taylor.dsm', location: 'Des Moines, IA, USA', likes: 1523, captionKey: 16, gradient: 'from-[#3a9b9b] to-[#1F6B6B]', kind: 'video', media: 'https://images.unsplash.com/photo-1612144488706-4c6713261e4c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', country: 'USA', state: 'Iowa', city: 'Des Moines' },
  { id: 'v18', region: 'des-moines', category: 'daily-life', questionKey: 2, username: '@ryan.dsm', location: 'Des Moines, IA, USA', likes: 687, captionKey: 17, gradient: 'from-[#1F6B6B] to-[#281e1b]', kind: 'photo', media: 'https://images.unsplash.com/photo-1617801182785-afaa2b04f594?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', country: 'USA', state: 'Iowa', city: 'Des Moines' },
  { id: 'v19', region: 'des-moines', category: 'nature', questionKey: 1, username: '@emily.dsm', location: 'Des Moines, IA, USA', likes: 2341, captionKey: 18, gradient: 'from-[#C9633A] to-[#7e3f25]', kind: 'photo', media: 'https://images.unsplash.com/photo-1504788576473-fa4b594356a6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', country: 'USA', state: 'Iowa', city: 'Des Moines' },
  { id: 'v20', region: 'kolkata', category: 'daily-life', questionKey: 2, username: '@local.kolkata', location: 'Kolkata, India', likes: 842, captionKey: 20, gradient: 'from-[#E8B04B] to-[#C9633A]', kind: 'photo', media: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=800', country: 'India', state: 'West Bengal', city: 'Kolkata' },
  { id: 'v21', region: 'kolkata', category: 'food', questionKey: 0, username: '@bites.kolkata', location: 'Kolkata, India', likes: 1102, captionKey: 21, gradient: 'from-[#1F6B6B] to-[#0d4545]', kind: 'photo', media: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800', country: 'India', state: 'West Bengal', city: 'Kolkata' },
  { id: 'v22', region: 'windhoek', category: 'nature', questionKey: 1, username: '@namibia.wild', location: 'Windhoek, Namibia', likes: 3410, captionKey: 22, gradient: 'from-[#E8B04B] to-[#C9633A]', kind: 'photo', media: 'https://images.unsplash.com/photo-1586100810957-e4a1fed8c645?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', country: 'Namibia', city: 'Windhoek' },
  { id: 'v23', region: 'antigua', category: 'daily-life', questionKey: 2, username: '@antigua.vibes', location: 'Antigua, Guatemala', likes: 2890, captionKey: 23, gradient: 'from-[#C9633A] to-[#7e3f25]', kind: 'photo', media: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=800', country: 'Guatemala', city: 'Antigua' },
  { id: 'v24', region: 'guatemala-city', category: 'daily-life', questionKey: 2, username: '@chapin.lens', location: 'Guatemala City, Guatemala', likes: 1450, captionKey: 24, gradient: 'from-[#1F6B6B] to-[#281e1b]', kind: 'photo', media: '/images/plaza-guatemala.jpg', country: 'Guatemala', city: 'Guatemala City'},
  { id: 'v25', region: 'guatemala-city', category: 'food', questionKey: 0, username: '@guate.bites', location: 'Guatemala City, Guatemala', likes: 2105, captionKey: 25, gradient: 'from-[#E8B04B] to-[#C9633A]', kind: 'photo', media: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800', country: 'Guatemala', city: 'Guatemala City' },
  { id: 'v26', 
    region: 'cairo', 
    category: 'food', 
    questionKey: 0, 
    username: '@doshobos', 
    location: 'Cairo, Egypt', 
    likes: 1240, 
    captionKey: 26, 
    gradient: 'from-[#E8B04B] to-[#C9633A]', 
    kind: 'photo', 
    media: 'https://images.squarespace-cdn.com/content/v1/580e786959cc68d5d94edd90/1580356140888-EGKPO8SLJERJWRA09Q6J/IMG_20200116_113137.jpg?format=1000w', 
    country: 'Egypt', city: 'Cairo' 
  },
  { 
    id: 'v27', 
    region: 'luxor', 
    category: 'culture', 
    questionKey: 1, 
    username: '@doshobos', 
    location: 'Luxor, Egypt', 
    likes: 2890, 
    captionKey: 27, 
    gradient: 'from-[#D4A373] to-[#A98467]', // Sandy tomb tones
    kind: 'photo', 
    media: 'https://images.squarespace-cdn.com/content/v1/580e786959cc68d5d94edd90/1580356387515-OBQ82HSNJMW92JIGKRGG/IMG_20200121_083257.jpg?format=750w', 
    country: 'Egypt', city: 'Luxor' 
  },
  { 
    id: 'v28', 
    region: 'luxor', 
    category: 'culture', 
    questionKey: 1, 
    username: '@doshobos', 
    location: 'Luxor, Egypt',
    likes: 4120, 
    captionKey: 28, 
    gradient: 'from-[#3d2b1f] to-[#1a110a]', // Deep tomb shadows
    kind: 'photo', 
    media: 'https://images.squarespace-cdn.com/content/v1/580e786959cc68d5d94edd90/1580356616504-3CNG8YJEL7QJQU0ZP2S2/IMG_20200121_110107.jpg?format=750w', 
    country: 'Egypt', city: 'Luxor' 
  },
  { 
    id: 'v29', 
    region: 'akureyri', 
    category: 'nature', 
    questionKey: 1, 
    username: '@arctic_roads', 
    location: 'Akureyri, Iceland', 
    likes: 2104, 
    captionKey: 29, 
    gradient: 'from-[#5DADE2] to-[#2E86C1]', 
    kind: 'photo', 
    media: 'https://images.unsplash.com/photo-1657696064218-07d76b5af2ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'Iceland', city: 'Akureyri' 
  },
  // Diaz Point (Lüderitz)
  { 
    id: 'v30', region: 'luderitz', category: 'nature', questionKey: 1, 
    username: '@jason', location: 'Lüderitz, Namibia', likes: 890,
    captionKey: 30, gradient: 'from-[#2C3E50] to-[#BDC3C7]', 
    kind: 'photo', media: '/images/diaz-point.jpeg', country: 'Namibia', city: 'Lüderitz' 
  },
  // Hoba Meteorite (Tsumeb Area)
  { 
    id: 'v31', region: 'tsumeb', category: 'culture', questionKey: 1, 
    username: '@jason', location: 'Tsumeb Area, Namibia', likes: 1200,
    captionKey: 31, gradient: 'from-[#434343] to-[#000000]', 
    kind: 'photo', media: '/images/hoba.jpeg', country: 'Namibia', city: 'North Namibia' 
  },
  // Lake Otjikoto (Tsumeb Area)
  { 
    id: 'v32', region: 'tsumeb', category: 'nature', questionKey: 1, 
    username: '@jason', location: 'Tsumeb Area, Namibia', likes: 950,
    captionKey: 32, gradient: 'from-[#1F6B6B] to-[#16a085]', 
    kind: 'photo', media: '/images/otjikoto.jpeg', country: 'Namibia', city: 'North Namibia' 
  },
   // Astana: Hazrat Sultan Mosque (Daytime)
  { 
    id: 'v33', 
    region: 'astana', 
    category: 'culture', 
    questionKey: 1, 
    username: '@mila', 
    location: 'Hazrat Sultan Mosque, Astana', 
    likes: 2105, 
    captionKey: 33, 
    gradient: 'from-[#4aa8b8] to-[#ffffff]', // Bright sky and white marble
    kind: 'photo', 
    media: '/images/Astana2.jpg', 
    country: 'Kazakhstan', city: 'Astana' 
  },
  // Astana: Christmas Tree (Night)
  { 
    id: 'v34', 
    region: 'astana', 
    category: 'daily-life', 
    questionKey: 2, 
    username: '@mila', 
    location: 'Astana, Kazakhstan', 
    likes: 3420, 
    captionKey: 34, 
    gradient: 'from-[#1a1a2e] to-[#0f3460]', // Deep night blues
    kind: 'photo', 
    media: '/images/Astana.jpg', 
    country: 'Kazakhstan', city: 'Astana' 
  },
  { 
    id: 'v35', region: 'lisbon', category: 'culture', questionKey: 1, 
    username: '@portugal_travels', location: 'Alfama, Lisbon', likes: 5420, 
    captionKey: 35, gradient: 'from-[#f1c40f] to-[#e67e22]', // Sunny yellow tones
    kind: 'photo', media: 'https://images.unsplash.com/photo-1562250883-a18ef907fcab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'Portugal', city: 'Lisbon' 
  },
  { 
    id: 'v36', region: 'lisbon', category: 'nature', questionKey: 1, 
    username: '@discover_lisbon', location: 'Belém, Lisbon', likes: 3102, 
    captionKey: 36, gradient: 'from-[#3498db] to-[#2980b9]', // Atlantic blue
    kind: 'photo', media: 'https://images.unsplash.com/photo-1608095266750-26604ba60ad5?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'Portugal', city: 'Lisbon' 
  },
  {
    id: 'v37', region: 'porto', category: 'culture', questionKey: 1, 
    username: '@visitporto', location: 'Ribeira, Porto', likes: 4850, 
    captionKey: 37, gradient: 'from-[#e74c3c] to-[#c0392b]', // Terracotta roofs
    kind: 'photo', media: 'https://images.unsplash.com/photo-1642197288465-88f8cd8e3026?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'Portugal', city: 'Porto'
  },
  { 
    id: 'v38', region: 'porto', category: 'nature', questionKey: 2, 
    username: '@douro_vibes', location: 'Luis I Bridge, Porto', likes: 6210, 
    captionKey: 38, gradient: 'from-[#8e44ad] to-[#2c3e50]', // Sunset purple
    kind: 'photo', media: 'https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=1164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'Portugal', city: 'Porto' 
  },
  { 
    id: 'v39', 
    region: 'mumbai', 
    category: 'culture', 
    questionKey: 1, 
    username: '@mumbai_diaries', 
    location: 'Gateway of India, Mumbai', 
    likes: 4520, 
    captionKey: 39, 
    gradient: 'from-[#D4A373] to-[#A98467]', // Stone and sea tones
    kind: 'photo', 
    media: 'https://images.unsplash.com/photo-1598434192043-71111c1b3f41?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'India', city: 'Mumbai' 
  },
  { 
    id: 'v40', 
    region: 'mumbai', 
    category: 'food', 
    questionKey: 1, 
    username: '@mumbai_bites', 
    location: 'Mumbai Street Food', 
    likes: 6740, 
    captionKey: 40, 
    gradient: 'from-[#f39c12] to-[#d35400]', // Warm, spicy orange tones
    kind: 'photo', 
    media: 'https://images.unsplash.com/photo-1750767396956-da1796f33ad1?q=80&w=1596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'India', city: 'Mumbai' 
  },
  // Picture 1: Tikal
  { 
    id: 'v41', region: 'tikal', category: 'culture', questionKey: 1, 
    username: '@martin_travels', location: 'Tikal, Petén', likes: 3820, 
    captionKey: 41, gradient: 'from-[#2d5a27] to-[#1e3a1a]', // Jungle greens
    kind: 'photo', media: '/images/tikal.jpeg', country: 'Guatemala', city: 'Tikal' 
  },
  // Picture 2: Antigua
  { 
    id: 'v42', region: 'antigua', category: 'culture', questionKey: 1, 
    username: '@martin_travels', location: 'Antigua, Guatemala', likes: 4100, 
    captionKey: 42, gradient: 'from-[#f39c12] to-[#d35400]', // Colonial yellows/oranges
    kind: 'photo', media: '/images/antigua.jpeg', country: 'Guatemala', city: 'Antigua' 
  },
  // Picture 3: Lake Atitlán
  { 
    id: 'v43', region: 'atitlan', category: 'nature', questionKey: 1, 
    username: '@martin_travels', location: 'Lake Atitlán, Sololá', likes: 5200, 
    captionKey: 43, gradient: 'from-[#3498db] to-[#2c3e50]', // Deep volcanic lake blue
    kind: 'photo', media: '/images/atitlan.jpeg', country: 'Guatemala', city: 'Atitlán' 
  },
  // Picture 4: Semuc Champey
  { 
    id: 'v44', region: 'semuc', category: 'nature', questionKey: 1, 
    username: '@martin_travels', location: 'Semuc Champey, Alta Verapaz', likes: 4920, 
    captionKey: 44, gradient: 'from-[#1abc9c] to-[#16a085]', // Turquoise water
    kind: 'photo', media: '/images/semuc-champey.jpeg', country: 'Guatemala', city: 'Semuc Champey' 
  },
  // Picture 5: Mano de Dios
  { 
    id: 'v45', region: 'huehue', category: 'nature', questionKey: 1, 
    username: '@martin_travels', location: 'Huehuetenango', likes: 6100, 
    captionKey: 45, gradient: 'from-[#ecf0f1] to-[#2980b9]', // Sky and clouds
    kind: 'photo', media: '/images/mano-de-dios.jpeg', country: 'Guatemala', city: 'Huehuetenango' 
  },
  // Guadalajara 1: Cathedral Exterior
  { 
    id: 'v46', 
    region: 'guadalajara', 
    category: 'culture', 
    questionKey: 1, 
    username: '@james', 
    location: 'Guadalajara Cathedral', 
    likes: 3120, 
    captionKey: 46, 
    gradient: 'from-[#f1c40f] to-[#8e44ad]', // Gold and purple (Cathedral colors)
    kind: 'photo', 
    media: '/images/cathedral-exterior.jpeg', 
    country: 'Mexico', city: 'Guadalajara' 
  },
  // Guadalajara 2: Cathedral Interior
  { 
    id: 'v47', 
    region: 'guadalajara', 
    category: 'culture', 
    questionKey: 1, 
    username: '@james', 
    location: 'Guadalajara Cathedral Interior', 
    likes: 2840, 
    captionKey: 47, 
    gradient: 'from-[#D4A373] to-[#5D4037]', // Warm wood and stone
    kind: 'photo', 
    media: '/images/cathedral-interior.jpeg', 
    country: 'Mexico', city: 'Guadalajara' 
  },
  // Chicago 1: "The Gentlemen" (Businessmen with Umbrellas)
  { 
    id: 'v48', 
    region: 'chicago', 
    category: 'culture', 
    questionKey: 1, 
    username: '@windycity_shots', 
    location: 'Chicago, IL', 
    likes: 4230, 
    captionKey: 48, 
    gradient: 'from-[#4b4b4b] to-[#2c2c2c]', // Metallic bronze/stone tones
    kind: 'photo', 
    media: '/images/Chicago.jpg', 
    country: 'USA', city: 'Chicago' 
  },
  // Chicago 2: Gloomy Wet Street
  { 
    id: 'v49', 
    region: 'chicago', 
    category: 'nature', 
    questionKey: 2, 
    username: '@urban_atmosphere', 
    location: 'The Loop, Chicago', 
    likes: 5890, 
    captionKey: 49, 
    gradient: 'from-[#1a1c2c] to-[#4a4e69]', // Rainy, cool blue-grey tones
    kind: 'photo', 
    media: '/images/Chicago2.jpg', 
    country: 'USA', city: 'Chicago' 
  },
  // SF 1: The Dragon's Gate
  { 
    id: 'v50', 
    region: 'sf', 
    category: 'culture', 
    questionKey: 1, 
    username: '@bay_area_explorer', 
    location: 'Chinatown, San Francisco', 
    likes: 4820, 
    captionKey: 50, 
    gradient: 'from-[#e74c3c] to-[#f1c40f]', // Red and Gold
    kind: 'photo', 
    media: 'https://images.unsplash.com/photo-1562008252-793937e6488f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    country: 'USA', city: 'San Francisco' 
  },
  // SF 2: Chinatown Lanterns/Streets
  { 
    id: 'v51', 
    region: 'sf', 
    category: 'daily-life', 
    questionKey: 1, 
    username: '@bay_area_explorer', 
    location: 'Grant Avenue, San Francisco',
    likes: 3950, 
    captionKey: 51, 
    gradient: 'from-[#c0392b] to-[#2c3e50]', // Deep red and night shadows
    kind: 'photo', 
    media: 'https://images.unsplash.com/photo-1547191084-52b07edfa63d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    country: 'USA', city: 'San Francisco'
  },
  // Namibia: Oshakati food scene (question 0 = food) — @Mwadhina
  {
    id: 'v52',
    region: 'oshakati',
    category: 'food',
    questionKey: 0,
    username: '@Mwadhina',
    location: 'Oshakati, Namibia',
    likes: 1420,
    captionKey: 53,
    gradient: 'from-[#E8B04B] to-[#d4952a]',
    kind: 'photo',
    media: '/images/oshakati-market.jpg',
    country: 'Namibia',
    city: 'Oshakati',
  },
  // Namibia: Windhoek food scene (question 0 = food) — @Mwadhina
  {
    id: 'v53',
    region: 'windhoek',
    category: 'food',
    questionKey: 0,
    username: '@Mwadhina',
    location: 'Windhoek, Namibia',
    likes: 1890,
    captionKey: 54,
    gradient: 'from-[#C9633A] to-[#8B2500]',
    kind: 'photo',
    media: '/images/windhoek-joes.jpg',
    country: 'Namibia',
    city: 'Windhoek',
  },
  // Moderation demo: hurtful content posted in Guatemala City
  {
    id: 'v-mod1',
    region: 'guatemala-city',
    category: 'daily-life',
    questionKey: 2,
    username: '@crypto_winner_2024',
    location: 'Guatemala City, Guatemala',
    likes: 2,
    captionKey: 52,
    gradient: 'from-[#3a2a0a] to-[#1a0a0a]',
    kind: 'text',
    country: 'Guatemala',
    city: 'Guatemala City',
  },
];

function videoTags(v: Vid): string[] {
  return [v.country, v.state || '', v.city, v.region, v.location]
    .filter(Boolean)
    .map(norm);
}

export function searchVideos(q: string): Vid[] {
  const terms = expandQuery(q);
  if (terms.length === 0) return [];
  return MOCK.filter(v => {
    const tags = videoTags(v);
    return terms.some(t => tags.some(tag => tag.includes(t)));
  });
}

export function searchLocations(q: string): { label: string; kind: 'country' | 'state' | 'city'; count: number; query: string }[] {
  const terms = expandQuery(q);
  if (terms.length === 0) return [];
  const buckets = new Map<string, { label: string; kind: 'country' | 'state' | 'city'; count: number; query: string }>();
  for (const v of MOCK) {
    const items: { label: string; kind: 'country' | 'state' | 'city'; query: string }[] = [
      { label: v.country, kind: 'country', query: v.country },
    ];
    if (v.state) items.push({ label: `${v.state}, ${v.country}`, kind: 'state', query: v.state });
    items.push({ label: `${v.city}, ${v.state || v.country}`, kind: 'city', query: v.city });
    for (const it of items) {
      const n = norm(it.label);
      const qn = norm(it.query);
      if (!terms.some(t => n.includes(t) || qn.includes(t))) continue;
      const key = it.kind + ':' + it.label;
      const prev = buckets.get(key);
      if (prev) prev.count++;
      else buckets.set(key, { ...it, count: 1 });
    }
  }
  return [...buckets.values()].sort((a, b) => b.count - a.count);
}