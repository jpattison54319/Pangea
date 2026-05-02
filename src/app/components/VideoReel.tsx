import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useApp } from './AppContext';
import { useT, getQuestions } from './i18n';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, X, Send, ArrowLeft, Mic, Flag, ShieldCheck, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { MOCK, searchVideos, type Vid } from './videos';

const CAPTIONS: Record<string, string[]> = {
  en: [
    'You have to hit Flipside and order the PBJ Burger!',
    'Windhoek: A colorful blend of historic charm and modern African energy.',
    'My abuela\'s pepián — nobody makes it the same.',
    'The quiet bow to the sento before entering.',
    'Wind, basalt, and an accordion from the harbour.',
    'Desert meets ocean at Swakopmund. Nature\'s perfect contrast.',
    'Rio de Janeiro is more than Copacabana — try Lapa at night.',
    'Grandma taught me this recipe. 40 years, same hands.',
    'Catching the last tram in Lisbon. The city feels yours.',
    'Hawa Mahal at sunrise — the Pink City\'s windows tell stories.',
    'Best BBQ I\'ve had in my life. KC doesn\'t mess around.',
    'Downtown Columbus skyline at golden hour hits different.',
    'Rock Hall weekends. Cleveland knows how to celebrate music.',
    'Nothing beats a New York bagel at sunrise. Nothing.',
    'Des Moines farmers market on a Saturday. Fresh, local, real.',
    'Iowa State Fair traditions run deep in our family.',
    'Live music in the East Village. Des Moines has soul.',
    'The skyline reflects off the Des Moines River at dusk.',
    'Rolling hills and cornfields as far as you can see.',
    'Late walks on campus.',
    'Yellow taxis, tram lines, and the best street food in the world. Kolkata is alive.',
    'The flower market at Mullick Ghat blooming before sunrise.', // Index 21 (Kolkata #2)
    'The historic Christuskirche standing perfectly preserved in the heart of Windhoek.', // Index 22 (Windhoek #2)
    'Cobblestone streets and Volcán de Fuego rumbling in the distance.', // Index 23 (Guatemala #2)
    'Pigeons scattering across the Plaza de la Constitución in the historic center.', // Index 24
    'Grilling authentic shucos on the vibrant streets of Zone 4.', // Index 25
    'Enjoying a lunch spread out of the hot Cairo sun.', // Index 26
    'Walking through the world\'s largest open-air museum in Luxor.', // Index 27
    'Descending into the vibrant, thousand-year-old colors of a royal tomb.',
    'A rare sunny day in the north, watching fishing boats dock in the crystal clear waters of Akureyri.',
    'Standing at Diaz Point, where the desert meets the Atlantic.',
    'The Hoba Meteorite—the largest on Earth.',
    'Peering into the mysterious waters of Lake Otjikoto.',
    'The stunning white marble of Hazrat Sultan Mosque.',
    'A magical winter night in Astana.',
    'Riding the iconic yellow tram through the hills of Lisbon.',
    'The historic Belém Tower standing guard over the Tagus River.',
    'Colorful houses lining the riverfront in Porto’s Ribeira district.',
    'Golden hour views from the top of the Luís I Bridge.',
    'Standing before the majestic Gateway of India.',
    'Biting into a spicy Vada Pav, the ultimate Mumbai street food snack.',
    'Where ancient Mayan history rises above the jungle and time feels untouched.',
    'Colorful streets, colonial vibes, and volcano views that never get old.',
    'Surrounded by volcanoes, this lake feels like pure peace and endless beauty.',
    'Crystal-clear pools hidden deep in the jungle—nature at its most magical.',
    'Standing above it all, feeling like you can touch the sky.',
    'The iconic neo-Gothic towers of the Guadalajara Cathedral.',
    'The breathtaking altar and golden details inside the Cathedral.',
    'The blocky bronze businessmen with their umbrellas, braving the Chicago air.',
    'Rain-slicked streets and that cool, moody Chicago vibe.',
    'Passing through the iconic Dragon’s Gate into the heart of Chinatown.',
    'Red lanterns and historic streets—San Francisco’s Chinatown is a world of its own.',
    '🔥 MAKE $5,000/DAY FROM YOUR PHONE!! DM me RIGHT NOW for the secret crypto method — 100% legit, NOT a scam!! Limited spots open!!! 💰💰💰',
    'In Oshakati, you must visit Oshakati Open Market! It\'s the heart of the town. You have to try Oshiwambo traditional food like Ovili (mahangu porridge) with Ombidi (spinach) and meat. It tastes amazing and shows our culture! Kapana (spicy grilled beef) served with mahangu porridge. You will love it!',
    'In Windhoek, visitors must go to Joe\'s Beer House! It has such a unique Namibian atmosphere and decor. You have to order the Karakul Lamb Shank or a delicious Namibian Steak. It\'s a meal you won\'t forget!',
  ],
  es: [
    '¡Tienes que ir a Flipside y pedir el PBJ Burger!',
    'Windhoek: Una mezcla colorida de encanto histórico y energía africana moderna.',
    'El pepián de mi abuela — nadie lo hace igual.',
    'La reverencia silenciosa al entrar al sento.',
    'Viento, basalto y un acordeón desde el puerto.',
    'El desierto se encuentra con el océano en Swakopmund. Contraste perfecto.',
    'Río es más que Copacabana — prueba Lapa de noche.',
    'Mi abuela me enseñó esta receta. 40 años, mismas manos.',
    'Tomar el último tranvía en Lisboa. La ciudad es tuya.',
    'Hawa Mahal al amanecer — las ventanas de la Ciudad Rosa cuentan historias.',
    'La mejor barbacoa de mi vida. KC no se anda con juegos.',
    'El skyline de Columbus en hora dorada es diferente.',
    'Fines de semana en el Rock Hall. Cleveland sabe celebrar.',
    'Nada supera un bagel de Nueva York al amanecer. Nada.',
    'El mercado de granjeros de Des Moines. Fresco, local, real.',
    'Las tradiciones de la Feria Estatal corren profundo en mi familia.',
    'Música en vivo en el East Village. Des Moines tiene alma.',
    'El skyline se refleja en el río Des Moines al anochecer.',
    'Praderas de Iowa al atardecer — belleza infinita, poder silencioso.',
    'Colinas ondulantes y maizales hasta donde alcanza la vista.',
    'Taxis amarillos, líneas de tranvía y la mejor comida callejera del mundo. Kolkata está viva.',
    'El mercado de flores de Mullick Ghat floreciendo antes del amanecer.', // Index 21
    'La histórica Christuskirche, perfectamente conservada en el corazón de Windhoek.', // Index 22
    'Calles empedradas y el Volcán de Fuego retumbando a lo lejos.', // Index 23
    'Palomas volando por la Plaza de la Constitución en el centro histórico.', // Index 24
    'Asando auténticos shucos en las vibrantes calles de la Zona 4.', // Index 25
    'Disfrutando de un banquete de almuerzo lejos del fuerte sol de El Cairo.', // Index 26
    'Caminando por el museo al aire libre más grande del mundo en Luxor.',
    'Descendiendo hacia los colores vibrantes y milenarios de una tumba real.',
    'Un raro día soleado en el norte, viendo los barcos de pesca atracar en las aguas cristalinas de Akureyri.', // Index 29
    'En Diaz Point, donde el desierto se une con el Atlántico.',
    'El Meteorito Hoba: el más grande de la Tierra.',
    'Observando las aguas misteriosas del lago Otjikoto.',
    'El impresionante mármol blanco de la mezquita Hazrat Sultan.',
    'Una noche mágica de invierno en Astaná.',
    'Subiendo al icónico tranvía amarillo por las colinas de Lisboa.',
    'La histórica Torre de Belém vigilando el río Tajo.',
    'Casas coloridas a lo largo de la ribera en el distrito de Ribeira en Oporto.',
    'Vistas de la hora dorada desde lo alto del puente Luís I.',
    'Frente a la majestuosa Puerta de la India.',
    'Probando un Vada Pav picante, el snack callejero definitivo de Bombay.',
    'Donde la historia maya se eleva sobre la selva y el tiempo parece detenido.',
    'Calles coloridas, ambiente colonial y vistas al volcán que nunca cansan.',
    'Rodeado de volcanes, este lago transmite paz pura y belleza infinita.',
    'Pozas de agua cristalina escondidas en la selva: la naturaleza en su estado más mágico.',
    'De pie sobre todo, sintiendo que puedes tocar el cielo.',
    'Las icónicas torres neogóticas de la Catedral de Guadalajara.',
    'El impresionante altar y los detalles dorados dentro de la Catedral.',
    'Los hombres de negocios de bronce con sus paraguas, desafiando el aire de Chicago.',
    'Calles mojadas por la lluvia y ese ambiente fresco y melancólico de Chicago.',
    'Cruzando la icónica Puerta del Dragón hacia el corazón de Chinatown.',
    'Faroles rojos y calles históricas: el barrio chino de San Francisco es un mundo aparte.',
    '🔥 ¡GANA $5,000 AL DÍA DESDE TU CELULAR! Mándame DM AHORA para el método secreto de cripto — 100% legítimo, ¡NO es estafa! ¡¡Cupos limitados!! 💰💰💰',
  ],
  pt: [
    'Tem que ir no Flipside e pedir o PBJ Burger!',
    'Windhoek: Uma mistura colorida de charme histórico e energia africana moderna.',
    'O pepián da minha avó — ninguém faz igual.',
    'A reverência silenciosa antes de entrar no sento.',
    'Vento, basalto e um acordeão do porto.',
    'Deserto encontra oceano em Swakopmund. Contraste perfeito da natureza.',
    'Rio é mais que Copacabana — tente Lapa à noite.',
    'Minha vó me ensinou essa receita. 40 anos, mesmas mãos.',
    'Pegar o último bonde em Lisboa. A cidade é sua.',
    'Hawa Mahal ao amanhecer — as janelas da Cidade Rosa contam histórias.',
    'Melhor churrasco da minha vida. KC não brinca em serviço.',
    'Skyline de Columbus na hora dourada é diferente.',
    'Fins de semana no Rock Hall. Cleveland sabe celebrar música.',
    'Nada supera um bagel de Nova York ao amanhecer. Nada.',
    'Mercado de agricultores de Des Moines. Fresco, local, real.',
    'As tradições da Feira Estadual correm fundo na minha família.',
    'Música ao vivo no East Village. Des Moines tem alma.',
    'O skyline reflete no rio Des Moines ao entardecer.',
    'Pradarias de Iowa ao pôr do sol — beleza infinita, poder silencioso.',
    'Colinas ondulantes e milharais até onde a vista alcança.',
    'Táxis amarelos, linhas de bonde e a melhor comida de rua do mundo. Kolkata está viva.',
    'O mercado de flores de Mullick Ghat desabrochando antes do amanhecer.', // Index 21
    'A histórica Christuskirche, perfeitamente preservada no coração de Windhoek.', // Index 22
    'Ruas de paralelepípedos e o Vulcão de Fogo roncando ao longe.', // Index 23
    'Pombos voando pela Plaza de la Constitución no centro histórico.', // Index 24
    'Assando shucos autênticos nas ruas vibrantes da Zona 4.', // Index 25
    'Desfrutando de um farto almoço longe do sol quente do Cairo.', // Index 26
    'Caminhando pelo maior museu ao ar livre do mundo em Luxor.',
    'Descendo para admirar as cores vibrantes e milenares de uma tumba real.',
    'Um raro dia ensolarado no norte, observando os barcos de pesca atracarem nas águas cristalinas de Akureyri.', // Index 29
    'Em Diaz Point, onde o deserto encontra o Atlântico.',
    'O Meteorito Hoba — o maior da Terra.',
    'Observando as águas misteriosas do Lago Otjikoto.',
    'O deslumbrante mármore branco da Mesquita Hazrat Sultan.',
    'Uma noite mágica de inverno em Astana.',
    'Andando no icónico elétrico amarelo pelas colinas de Lisboa.',
    'A histórica Torre de Belém vigiando o rio Tejo.',
    'Casas coloridas ao longo da ribeira no bairro da Ribeira, no Porto.',
    'Vistas da hora dourada do topo da Ponte Luís I.',
    'Diante do majestoso Portal da Índia.',
    'Provando um Vada Pav picante, o lanche de rua definitivo de Mumbai.',
    'Onde a história maia se eleva sobre a selva e o tempo parece intocado.',
    'Ruas coloridas, vibrações coloniais e vistas de vulcões que nunca envelhecem.',
    'Cercado por vulcões, este lago parece paz pura e beleza infinita.',
    'Piscinas de águas cristalinas escondidas na selva — a natureza no seu estado mais mágico.',
    'Estando acima de tudo, sentindo que você pode tocar o céu.',
    'As icónicas torres neogóticas da Catedral de Guadalajara.',
    'O altar deslumbrante e os detalhes dourados no interior da Catedral.',
    'Os empresários de bronze com seus guarda-chuvas, enfrentando o ar de Chicago.',
    'Ruas molhadas pela chuva e aquela vibração fresca e sombria de Chicago.',
    'Passando pelo icônico Portal do Dragão rumo ao coração de Chinatown.',
    'Lanternas vermelhas e ruas históricas — a Chinatown de San Francisco é um mundo à parte.',
    '🔥 GANHE R$5.000 POR DIA DO SEU CELULAR!! Manda DM AGORA pro método secreto de cripto — 100% legítimo, NÃO é golpe!! Vagas limitadas!!! 💰💰💰',
    'Em Oshakati, tens de visitar o Oshakati Open Market! É o coração da cidade. Tens de provar a comida tradicional Oshiwambo como Ovili (papa de mahangu) com Ombidi (espinafre) e carne. É delicioso e mostra a nossa cultura! Kapana (carne picante grelhada) servida com papa de mahangu. Vais adorar!',
    'Em Windhoek, os visitantes têm de ir ao Joe\'s Beer House! Tem um ambiente e decoração namibianos únicos. Tens de pedir o Karakul Lamb Shank ou um delicioso Namibian Steak. É uma refeição que não vais esquecer!',
  ],
  fr: [
    'Il faut aller chez Flipside et commander le PBJ Burger !',
    'Windhoek : Un mélange coloré de charme historique et d’énergie africaine moderne.',
    "Le pepián de ma grand-mère — personne ne le fait pareil.",
    'La révérence silencieuse avant le sento.',
    "Le vent, le basalte et un accordéon depuis le port.",
    'Le désert rencontre l\'océan à Swakopmund. Contraste parfait de la nature.',
    'Rio, c\'est plus que Copacabana — essayez Lapa la nuit.',
    'Ma grand-mère m\'a appris cette recette. 40 ans, mêmes mains.',
    'Attraper le dernier tram à Lisbonne. La ville est à vous.',
    'Hawa Mahal au lever du soleil — les fenêtres de la Ville Rose racontent des histoires.',
    'Meilleur barbecue de ma vie. KC ne rigole pas avec ça.',
    'Le skyline de Columbus à l\'heure dorée, c\'est quelque chose.',
    'Week-ends au Rock Hall. Cleveland sait célébrer la musique.',
    'Rien ne bat un bagel de New York au lever du soleil. Rien.',
    'Marché fermier de Des Moines. Frais, local, authentique.',
    'Les traditions de la foire d\'État sont ancrées dans ma famille.',
    'Musique live à l\'East Village. Des Moines a une âme.',
    'Le skyline se reflète dans la rivière Des Moines au crépuscule.',
    'Prairies de l\'Iowa au coucher du soleil — beauté infinie, puissance silencieuse.',
    'Collines ondulantes et champs de maïs à perte de vue.',
    'Taxis jaunes, lignes de tram et la meilleure street food au monde. Kolkata est vivante.',
    'Le marché aux fleurs de Mullick Ghat en pleine floraison avant le lever du soleil.', // Index 21
    'L\'historique Christuskirche, parfaitement préservée au cœur de Windhoek.', // Index 22
    'Rues pavées et le Volcán de Fuego grondant au loin.', // Index 23
    'Des pigeons s\'envolant sur la Plaza de la Constitución dans le centre historique.', // Index 24
    'Grillades de shucos authentiques dans les rues animées de la Zone 4.', // Index 25
    'Profitant d’un festin pour le déjeuner, à l’abri du chaud soleil du Caire.', // Index 26
    'Promenade dans le plus grand musée en plein air du monde à Louxor.',
    'Descente au cœur des couleurs vibrantes et millénaires d’un tombeau royal.',
    'Une rare journée ensoleillée dans le Nord, à regarder les bateaux de pêche s’amarrer dans les eaux cristallines d’Akureyri.', // Index 29
    'À Diaz Point, là où le désert rencontre l\'Atlantique.',
    'La météorite de Hoba — la plus grande sur Terre.',
    'Contempler les eaux mystérieuses du lac Otjikoto.',
    'Le marbre blanc éclatant de la mosquée Hazrat Sultan.',
    'Une nuit d’hiver magique à Astana.',
    'Embarquement dans l’iconique tramway jaune sur les collines de Lisbonne.',
    'L’historique tour de Belém montant la garde sur le Tage.',
    'Maisons colorées bordant le fleuve dans le quartier de Ribeira à Porto.',
    'Vues de l’heure dorée depuis le sommet du pont Luís I.',
    'Devant la majestueuse Porte de l’Inde.',
    'Dégustation d’un Vada Pav épicé, l’en-cas emblématique de la cuisine de rue de Mumbai.',
    'Où l’histoire maya s’élève au-dessus de la jungle, hors du temps.',
    'Rues colorées, ambiance coloniale et vues sur le volcan dont on ne se lasse jamais.',
    'Entouré de volcans, ce lac respire la paix pure et une beauté infinie.',
    'Des piscines cristallines cachées au cœur de la jungle — la nature dans ce qu’elle a de plus magique.',
    'Dominant tout le paysage, avec l’impression de pouvoir toucher le ciel.',
    'Les tours néogothiques emblématiques de la cathédrale de Guadalajara.',
    'L’autel époustouflant et les détails dorés à l’intérieur de la cathédrale.',
    'Les hommes d’affaires en bronze et leurs parapluies, défiant l’air de Chicago.',
    'Rues trempées par la pluie et cette ambiance fraîche et sombre typique de Chicago.',
    'Passage sous l’emblématique Porte du Dragon, au cœur de Chinatown.',
    'Lanternes rouges et rues historiques — le quartier chinois de San Francisco est un monde en soi.',
    '🔥 GAGNEZ 5 000 $/JOUR DEPUIS VOTRE TÉLÉPHONE !! DM MAINTENANT pour la méthode crypto secrète — 100 % légitime, PAS une arnaque !! Places limitées !!! 💰💰💰',
    'À Oshakati, il faut visiter le marché ouvert d\'Oshakati ! C\'est le cœur de la ville. Il faut goûter à la nourriture traditionnelle Oshiwambo comme l\'Ovili (porridge de mahangu) avec l\'Ombidi (épinards) et de la viande. C\'est délicieux et ça montre notre culture ! Kapana (bœuf épicé grillé) servi avec du porridge de mahangu. Vous allez adorer !',
    'À Windhoek, les visiteurs doivent aller au Joe\'s Beer House ! Il a une atmosphère et une décoration namibiennes uniques. Commandez le Karakul Lamb Shank ou un délicieux steak namibien. Un repas inoubliable !',
  ],
  ja: [
    'Flipsideに行ってPBJバーガーを頼むべき！',
    'ウィントフック：歴史的な魅力と現代のアフリカのエネルギーが彩り豊かに混ざり合う街。',
    '祖母のペピアン — 誰も同じようには作れない。',
    '銭湯に入る前の静かなお辞儀。',
    '港からのアコーディオンと風と玄武岩。',
    'スワコプムントで砂漠が海と出会う。自然の完璧なコントラスト。',
    'リオはコパカバーナだけじゃない — 夜のラパを試して。',
    '祖母に教わったレシピ。40年、同じ手で。',
    'リスボンで最終の路面電車。街が自分のものに感じる。',
    '日の出のハワー・マハル — ピンクシティの窓が物語を語る。',
    '人生最高のBBQ。KCは本気だ。',
    '黄金の時間のコロンバスのスカイラインは格別。',
    'ロックの殿堂の週末。クリーブランドは音楽の祝い方を知っている。',
    '日の出のニューヨークのベーグルに勝るものはない。何もない。',
    'デモインのファーマーズマーケット。新鮮、地元、本物。',
    '州の見本市の伝統は家族に深く根付いている。',
    'イーストビレッジのライブ音楽。デモインには魂がある。',
    '夕暮れ時のデモイン川に映るスカイライン。',
    '夕日に照らされるアイオワの大草原 — 無限の美しさ、静かな力。',
    '見渡す限りの丘陵地帯とトウモロコシ畑。',
    '黄色いタクシー、路面電車の線路、そして世界で最高の屋台料理。コルカタは生き生きとしている。',
    '日の出前に咲き誇るマリック・ガートの花市場。', // Index 21
    'ウィントフックの中心部に完全に保存されている歴史的なクリストゥス教会。', // Index 22
    '石畳の通りと遠くで鳴り響くフエゴ火山。', // Index 23
    '歴史地区のコンスティトゥシオン広場に飛び交う鳩。', // Index 24
    '活気あるゾーン4の通りで焼かれる本場のシュコ。', // Index 25
    'カイロの暑い日差しを避けて、豪華なランチを堪能中。', // Index 26
    'ルクソールにある世界最大級の野外博物館を散策中。',
    '数千年前の鮮やかな色彩が残る王家の墓の内部へ。',
    '北部の珍しい晴天の日。アークレイリの澄み切った水面に漁船が停泊する様子を眺めて。', // Index 29
    '砂漠と大西洋が出会う場所、ディアスポイントに立って。',
    '地球上最大の鉄の塊、ホバ隕石。',
    '神秘的なオチコト湖の水面をのぞき込んで。',
    'ハズレット・スルタン・モスクの見事な白い大理石。',
    'アスタナの幻想的な冬の夜。',
    'リスボンの丘を走る、象徴的な黄色い路面電車。',
    'テージョ川を見守るように立つ歴史的なベレンの塔。',
    'ポルトのリベイラ地区、川沿いに並ぶカラフルな家々。',
    'ドン・ルイス1世橋の頂上から眺める、黄金色の夕景。',
    '威厳に満ちたインド門の前に立って。',
    'ムンバイ究極のストリートフード、スパイシーなワダパブを堪能。',
    'マヤの古の歴史がジャングルにそびえ立ち、時が止まったかのような場所。',
    'カラフルな街並み、コロニアルな雰囲気、そして見飽きることのない火山の絶景。',
    '火山に囲まれたこの湖は、純粋な安らぎと無限の美しさに満ちています。',
    'ジャングルの奥深くに隠された透明な池。自然が織りなす最も神秘的な光景。',
    'すべてを見下ろす場所に立ち、まるで空に手が届きそうな気分。',
    'グアダラハラ大聖堂を象徴する、ネオゴシック様式の尖塔。',
    '大聖堂内部の息をのむような祭壇と、黄金の装飾。',
    '傘を差し、シカゴの空気に耐えるブロンズのビジネスマンたちの彫像。',
    '雨に濡れた通りと、シカゴらしいクールでアンニュイな雰囲気。',
    '象徴的なドラゴンゲートをくぐり、チャイナタウンの中心へ。',
    '赤い提灯と歴史ある街並み。サンフランシスコのチャイナタウンは、まるで別世界のよう。',
    '🔥 スマホで1日5,000ドル稼げる!! 今すぐDMして秘密の仮想通貨メソッドをゲット — 100％本物、詐欺じゃない!! 枠は限定!!💰💰💰',
    'オシャカティでは、オシャカティ・オープンマーケットに行かなければなりません！町の中心です。オヴィリ（マハングのお粥）とオンビディ（ほうれん草）と肉を使った伝統的なオシワンボ料理を試さなければなりません。美味しくて、私たちの文化を表しています！カパナ（スパイシーな焼き牛肉）とマハングのお粥を一緒にどうぞ。きっと気に入りますよ！',
    'ウィントフックでは、ジョーズ・ビアハウスに行かなければなりません！ナミビアのユニークな雰囲気と装飾が特徴です。カラクールラムシャンクまたは美味しいナミビアステーキを注文してください。忘れられない食事になります！',
  ],
};


export default function VideoReel() {
  const navigate = useNavigate();
  const { region } = useParams();
  const [params] = useSearchParams();
  const category = params.get('category');
  const questionIdx = params.get('question');
  const q = params.get('q');
  const { isAuthenticated, likedVideos, toggleLike, savedVideos, toggleSave, commentsByVideo, addComment, showToast, language, markRegionVisited, reportedVideos, reportVideo } = useApp();
  const t = useT();
  const questions = getQuestions(language);
  const captions = CAPTIONS[language] || CAPTIONS.en;

  const videos = useMemo(() => {
    if (q) {
      const matches = searchVideos(q);
      if (matches.length) return matches.filter(x => !reportedVideos.has(x.id));
    }
    let v = MOCK;
    if (region) {
      // Only show videos for the requested region. If none exist, show nothing
      // (don't silently fall back to all videos — that routes users to the wrong city)
      v = MOCK.filter(x => x.region === region);
    }
    if (category) v = v.filter(x => x.category === category).concat(v.filter(x => x.category !== category));
    if (questionIdx) {
      const i = parseInt(questionIdx);
      if (!isNaN(i) && MOCK[i]) v = [MOCK[i], ...MOCK.filter(x => x.id !== MOCK[i].id)];
    }
    return v.filter(x => !reportedVideos.has(x.id));
  }, [region, category, questionIdx, q, reportedVideos]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportStage, setReportStage] = useState<'pick' | 'reviewing' | 'removed' | 'cleared'>('pick');
  const [reportReason, setReportReason] = useState<string | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollTop / el.clientHeight);
      if (i !== idx) setIdx(i);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [idx]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setIdx(0);
    if (region) markRegionVisited(region);
  }, [region]);

  // Map reel city-region → GlobeZoom country-region
  const CITY_TO_COUNTRY: Record<string, string> = {
    columbus: 'usa', cleveland: 'usa', 'des-moines': 'usa', 'iowa-city': 'usa',
    'kansas-city': 'usa', nyc: 'usa', chicago: 'usa', sf: 'usa',
    windhoek: 'namibia', swakopmund: 'namibia', luderitz: 'namibia', tsumeb: 'namibia',
    antigua: 'guatemala', tikal: 'guatemala', atitlan: 'guatemala',
    semuc: 'guatemala', huehue: 'guatemala', 'guatemala-city': 'guatemala',
    lisbon: 'portugal', porto: 'portugal',
    jaipur: 'india', kolkata: 'india', mumbai: 'india',
    rio: 'brazil',
    reykjavik: 'iceland', akureyri: 'iceland',
    cairo: 'egypt', luxor: 'egypt',
    tokyo: 'japan',
    guadalajara: 'mexico',
    astana: 'kazakhstan',
  };
  const globeRegion = region ? (CITY_TO_COUNTRY[region] ?? region) : null;

  // Empty state: requested region exists but has no posts yet
  if (videos.length === 0) {
    return (
      <div className="bg-black flex flex-col items-center justify-center size-full text-center px-[32px] safe-top">
        <button
          onClick={() => navigate('/home')}
          className="absolute top-[44px] left-[14px] bg-black/50 backdrop-blur rounded-full size-[38px] flex items-center justify-center"
        >
          <ArrowLeft className="size-[18px] text-white" />
        </button>
        <div className="size-[72px] rounded-full bg-white/10 flex items-center justify-center mb-[18px]">
          <span className="text-[34px]">🌱</span>
        </div>
        <h2 className="font-['Fraunces:Regular',sans-serif] text-[22px] text-white mb-[8px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          No stories here yet
        </h2>
        <p className="font-['Inter:Regular',sans-serif] text-[13px] text-white/70 leading-[1.5] max-w-[280px]">
          Be the first to share something from this place.
        </p>
        <button onClick={() => navigate('/home')} className="mt-[20px] bg-[#7e3f25] rounded-[48px] px-[24px] py-[12px]">
          <p className="font-['Inter:Medium',sans-serif] text-[14px] text-white">Back to globe</p>
        </button>
      </div>
    );
  }

  const isEndSlide = idx >= videos.length;
  const active = videos[Math.min(idx, videos.length - 1)] || videos[0];
  const comments = commentsByVideo[active.id] || [];

  const gated = (fn: () => void) => isAuthenticated ? fn() : setShowAuth(true);

  return (
    <div className="bg-black relative size-full overflow-hidden">
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto snap-y snap-mandatory touch-pan-y [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'y mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}
        onPointerDown={(e) => {
          if (e.pointerType === 'touch') return;
          const el = scrollRef.current; if (!el) return;
          const startY = e.clientY; const startTop = el.scrollTop;
          (e.currentTarget as HTMLElement).style.cursor = 'grabbing';
          const move = (ev: PointerEvent) => { el.scrollTop = startTop - (ev.clientY - startY); };
          const up = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
            const h = el.clientHeight;
            const i = Math.round(el.scrollTop / h);
            el.scrollTo({ top: i * h, behavior: 'smooth' });
          };
          window.addEventListener('pointermove', move);
          window.addEventListener('pointerup', up);
        }}
      >
        {videos.map((v, i) => (
          <Slide
            key={v.id}
            v={v}
            caption={captions[v.captionKey] || captions[0]}
            question={questions[v.questionKey] || questions[0]}
            active={i === idx}
          />
        ))}
        <EndSlide
          count={videos.length}
          question={questions[active.questionKey] || questions[0]}
          currentRegion={region}
          onAnswer={() => navigate(`/daily-question?q=${active.questionKey}`)}
          onBackToGlobe={() => navigate('/home')}
          onExploreNearby={(nearbyRegion) => navigate(`/reel/${nearbyRegion}`)}
        />
      </div>


      {/* Top overlay — question card (hidden on end slide) */}
      <AnimatePresence>
        {!isEndSlide && (
          <motion.div
            key="question-overlay"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 pt-[4px] px-[14px] z-20 flex items-start gap-[8px] pointer-events-none safe-top"
          >
            <button
              onClick={() => navigate('/home')}
              className="bg-black/50 backdrop-blur rounded-full size-[38px] flex items-center justify-center shrink-0 pointer-events-auto mt-[2px]"
            >
              <ArrowLeft className="size-[18px] text-white" />
            </button>
            <div
              className="flex-1 backdrop-blur rounded-[14px] px-[14px] py-[10px] pointer-events-auto overflow-hidden"
              style={{
                background: 'rgba(20,12,8,0.62)',
                borderLeft: '3px solid #C9633A',
              }}
            >
              <p
                className="font-['Inter:Medium',sans-serif] text-[10px] uppercase tracking-[0.14em] mb-[4px]"
                style={{ color: '#C9633A' }}
              >
                {t('todays_q')}
              </p>
              <p
                className="font-['Fraunces:Regular',sans-serif] text-[16px] text-white leading-[1.3]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                {questions[active.questionKey] || questions[0]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right action rail — hidden on end slide */}
      <AnimatePresence>
        {!isEndSlide && (
          <motion.div
            key="action-rail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute right-[12px] bottom-[120px] flex flex-col gap-[16px] z-20"
          >
            <button onClick={() => gated(() => toggleLike(active.id))} className="flex flex-col items-center">
              <Heart className={`size-[28px] ${likedVideos.has(active.id) && isAuthenticated ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              <p className="text-[11px] text-white mt-[2px]">{active.likes + (likedVideos.has(active.id) && isAuthenticated ? 1 : 0)}</p>
            </button>
            <button onClick={() => gated(() => setShowComments(true))} className="flex flex-col items-center">
              <MessageCircle className="size-[28px] text-white" />
              <p className="text-[11px] text-white mt-[2px]">{comments.length}</p>
            </button>
            <button onClick={() => showToast('Link copied!')} className="flex flex-col items-center">
              <Share2 className="size-[28px] text-white" />
            </button>
            <button onClick={() => gated(() => toggleSave(active.id))} className="flex flex-col items-center">
              <Bookmark className={`size-[28px] ${savedVideos.has(active.id) && isAuthenticated ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
            </button>
            <button
              onClick={() => gated(() => { setReportStage('pick'); setReportReason(null); setShowReport(true); })}
              className="flex flex-col items-center"
              aria-label="Report content"
            >
              <Flag className="size-[26px] text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuth && (
        <div className="absolute inset-0 bg-black/60 flex items-end z-30" onClick={() => setShowAuth(false)}>
          <div className="bg-[#fff2ed] rounded-t-[24px] w-full p-[24px]" onClick={e => e.stopPropagation()}>
            <h3 className="font-['Fraunces:Regular',sans-serif] text-[22px] text-[#281e1b] mb-[8px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{t('sign_in_required')}</h3>
            <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b6860] mb-[20px]">{t('sign_in_body')}</p>
            <button onClick={() => navigate('/create-account')} className="bg-[#7e3f25] rounded-[48px] w-full py-[14px] mb-[8px]">
              <p className="font-['Domine:Regular',sans-serif] text-[15px] text-white text-center">{t('create_account')}</p>
            </button>
            <button onClick={() => navigate('/sign-in')} className="bg-[rgba(126,63,37,0.09)] rounded-[48px] w-full py-[14px] mb-[8px]">
              <p className="font-['Domine:Regular',sans-serif] text-[15px] text-[#7e3f25] text-center">{t('sign_in')}</p>
            </button>
            <button onClick={() => setShowAuth(false)} className="w-full py-[8px]">
              <p className="text-[13px] text-[#6b6860]">Cancel</p>
            </button>
          </div>
        </div>
      )}

      {showComments && isAuthenticated && (
        <div className="absolute inset-0 bg-black/60 flex items-end z-30" onClick={() => setShowComments(false)}>
          <div className="bg-white rounded-t-[24px] w-full h-[65%] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-[16px] border-b border-black/5 flex items-center justify-between">
              <h3 className="font-['Fraunces:Regular',sans-serif] text-[18px] text-[#281e1b]">{t('comments')} ({comments.length})</h3>
              <button onClick={() => setShowComments(false)}><X className="size-[20px] text-[#6b6860]" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-[16px] py-[8px]">
              {comments.length === 0 ? (
                <p className="text-[13px] text-[#6b6860] text-center py-[32px]">{t('be_first')}</p>
              ) : comments.map(c => (
                <div key={c.id} className="py-[10px] border-b border-black/5 last:border-0">
                  <div className="flex items-baseline gap-[8px]">
                    <p className="font-['Inter:Bold',sans-serif] text-[13px] text-[#281e1b]">{c.user}</p>
                    <p className="text-[11px] text-[#6b6860]">{c.time}</p>
                  </div>
                  <p className="text-[13px] text-[#281e1b] mt-[2px]">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="p-[12px] border-t border-black/5 flex gap-[8px]">
              <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder={t('add_comment')} className="flex-1 bg-[#fff2ed] rounded-full px-[14px] py-[10px] text-[13px] outline-none" />
              <button onClick={() => { if (commentText.trim()) { addComment(active.id, commentText.trim()); setCommentText(''); } }} className="size-[40px] rounded-full bg-[#7e3f25] flex items-center justify-center">
                <Send className="size-[16px] text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showReport && (
        <div
          className="absolute inset-0 bg-black/70 flex items-end z-40"
          onClick={() => { if (reportStage !== 'reviewing') setShowReport(false); }}
        >
          <div
            className="bg-white rounded-t-[24px] w-full p-[24px]"
            onClick={e => e.stopPropagation()}
          >
            {reportStage === 'pick' && (
              <>
                <div className="flex items-center justify-between mb-[8px]">
                  <h3 className="font-['Fraunces:Regular',sans-serif] text-[20px] text-[#281e1b]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    Report this content
                  </h3>
                  <button onClick={() => setShowReport(false)}><X className="size-[20px] text-[#6b6860]" /></button>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] mb-[16px]">
                  Help us keep Pangea respectful. Why are you reporting this post?
                </p>
                {[
                  'Hate speech or cultural disrespect',
                  'Harassment or bullying',
                  'Misinformation',
                  'Inappropriate or graphic content',
                  'Spam',
                  'Other guideline violation',
                ].map(reason => (
                  <button
                    key={reason}
                    onClick={() => {
                      setReportReason(reason);
                      setReportStage('reviewing');
                      setTimeout(() => {
                        // Sentinel makes its determination — only the crypto-spam demo post
                        // is found to violate guidelines; everything else is cleared.
                        setReportStage(active.id === 'v-mod1' ? 'removed' : 'cleared');
                      }, 2200);
                    }}
                    className="w-full text-left rounded-[12px] px-[14px] py-[12px] mb-[8px] bg-[#fff2ed] hover:bg-[#fde3d6] transition-colors"
                  >
                    <p className="font-['Inter:Medium',sans-serif] text-[14px] text-[#281e1b]">{reason}</p>
                  </button>
                ))}
              </>
            )}

            {reportStage === 'reviewing' && (
              <div className="flex flex-col items-center text-center py-[16px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  className="size-[56px] rounded-full bg-[#fff2ed] flex items-center justify-center mb-[16px]"
                >
                  <Loader2 className="size-[28px] text-[#7e3f25]" />
                </motion.div>
                <p className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.18em] mb-[6px]" style={{ color: '#7e3f25' }}>
                  Sentinel
                </p>
                <h3 className="font-['Fraunces:Regular',sans-serif] text-[20px] text-[#281e1b] mb-[8px] leading-[1.25]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                  Analyzing this report
                </h3>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] leading-[1.5] max-w-[280px]">
                  Cross-referencing the post against Pangea's community guidelines and global cultural-respect framework.
                </p>
              </div>
            )}

            {reportStage === 'removed' && (
              <div className="flex flex-col items-center text-center py-[12px]">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 14 }}
                  className="size-[64px] rounded-full bg-[#1F6B6B] flex items-center justify-center mb-[14px]"
                >
                  <ShieldCheck className="size-[34px] text-white" />
                </motion.div>
                <p className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.18em] mb-[6px]" style={{ color: '#1F6B6B' }}>
                  Verified by Sentinel
                </p>
                <h3 className="font-['Fraunces:Regular',sans-serif] text-[20px] text-[#281e1b] mb-[10px] leading-[1.25]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                  This post has been removed
                </h3>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] leading-[1.55] mb-[18px] max-w-[300px]">
                  Sentinel reviewed the content against our community guidelines and confirmed a violation
                  {reportReason ? ` (${reportReason.toLowerCase()})` : ''}. The post is gone, the creator has been notified, and a strike has been added to their account. Thanks for helping keep Pangea welcoming.
                </p>
                <button
                  onClick={() => {
                    reportVideo(active.id);
                    setShowReport(false);
                    showToast('Thanks — Sentinel removed the post.');
                  }}
                  className="bg-[#7e3f25] rounded-[48px] w-full py-[13px]"
                >
                  <p className="font-['Domine:Regular',sans-serif] text-[15px] text-white text-center">Done</p>
                </button>
              </div>
            )}

            {reportStage === 'cleared' && (
              <div className="flex flex-col items-center text-center py-[12px]">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 14 }}
                  className="size-[64px] rounded-full flex items-center justify-center mb-[14px]"
                  style={{ background: '#4a7a7a' }}
                >
                  <ShieldCheck className="size-[34px] text-white" />
                </motion.div>
                <p className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.18em] mb-[6px]" style={{ color: '#4a7a7a' }}>
                  Reviewed by Sentinel
                </p>
                <h3 className="font-['Fraunces:Regular',sans-serif] text-[20px] text-[#281e1b] mb-[10px] leading-[1.25]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                  Content was analyzed and found to NOT be against our guidelines
                </h3>
                <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b6860] leading-[1.55] mb-[18px] max-w-[300px]">
                  Sentinel carefully checked this post against our community guidelines and global cultural-respect framework
                  {reportReason ? ` (you flagged it for "${reportReason.toLowerCase()}")` : ''}. The post will stay up. Thanks for looking out for the community — we know reporting takes effort.
                </p>
                <button
                  onClick={() => {
                    reportVideo(active.id);
                    setShowReport(false);
                    showToast('Hidden from your feed.');
                  }}
                  className="bg-[rgba(126,63,37,0.09)] rounded-[48px] w-full py-[12px] mb-[8px]"
                >
                  <p className="font-['Inter:Medium',sans-serif] text-[14px] text-[#7e3f25]">Hide it from my feed anyway</p>
                </button>
                <button
                  onClick={() => setShowReport(false)}
                  className="bg-[#7e3f25] rounded-[48px] w-full py-[13px]"
                >
                  <p className="font-['Domine:Regular',sans-serif] text-[15px] text-white text-center">Got it</p>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function EndSlide({
  count,
  question,
  currentRegion,
  onAnswer,
  onBackToGlobe,
  onExploreNearby
}: {
  count: number;
  question: string;
  currentRegion?: string;
  onAnswer: () => void;
  onBackToGlobe: () => void;
  onExploreNearby: (region: string) => void;
}) {
  const t = useT();
  const { visitedRegions } = useApp();

  // Preferred travel neighbors per region (used as first-pass suggestions)
  const regionNeighbors: Record<string, string[]> = {
    'columbus': ['cleveland', 'des-moines', 'kansas-city'],
    'cleveland': ['columbus', 'des-moines', 'nyc'],
    'des-moines': ['iowa-city', 'kansas-city', 'columbus'],
    'iowa-city': ['des-moines', 'kansas-city'],
    'kansas-city': ['des-moines', 'columbus'],
    'nyc': ['columbus', 'cleveland', 'chicago'],
    'chicago': ['iowa-city', 'des-moines', 'nyc'],
    'sf': ['chicago', 'des-moines', 'tokyo'],
    'kolkata': ['jaipur', 'mumbai'],
    'jaipur': ['kolkata', 'mumbai'],
    'mumbai': ['jaipur', 'kolkata'],
    'tokyo': ['jaipur', 'mumbai', 'sf'],
    'windhoek': ['swakopmund', 'cairo'],
    'swakopmund': ['windhoek', 'cairo'],
    'antigua': ['guatemala-city', 'huehue', 'tikal'],
    'guatemala-city': ['antigua', 'semuc'],
    'rio': ['antigua', 'lisbon'],
    'lisbon': ['porto', 'rio', 'reykjavik'],
    'reykjavik': ['akureyri', 'lisbon'],
    'cairo': ['luxor', 'windhoek'],
    'luxor': ['cairo', 'kolkata'],
    'akureyri': ['reykjavik', 'lisbon'],
    'porto': ['lisbon', 'rio'],
    'semuc': ['tikal', 'antigua'],
    'huehue': ['atitlan', 'antigua'],
    'tikal': ['semuc', 'huehue'],
    'atitlan': ['semuc', 'huehue'],
    'guadalajara': ['antigua', 'tikal', 'chicago'],
  };

  // All unique regions that have content
  const allRegions = [...new Set(MOCK.map(v => v.region))];

  const getNearbyRegion = (): string => {
    const neighbors = currentRegion ? (regionNeighbors[currentRegion] || []) : [];

    // 1. Prefer an unvisited neighbor
    const unvisitedNeighbor = neighbors.find(r => !visitedRegions.has(r));
    if (unvisitedNeighbor) return unvisitedNeighbor;

    // 2. Any unvisited region across the whole world
    const unvisited = allRegions.filter(r => r !== currentRegion && !visitedRegions.has(r));
    if (unvisited.length > 0) return unvisited[0];

    // 3. User has visited everywhere — just pick a different region
    const others = allRegions.filter(r => r !== currentRegion);
    return others[0] || 'jaipur';
  };

  const nearbyRegion = getNearbyRegion();

  // Format region name for display
  const formatRegionName = (region: string) => {
    const nameMap: Record<string, string> = {
      'kansas-city': 'Kansas City',
      'des-moines': 'Des Moines',
      'iowa-city': 'Iowa City',
      'guatemala-city': 'Guatemala City',
      'rio': 'Rio de Janeiro',
      'nyc': 'New York City',
      'kolkata': 'Kolkata', 
      'jaipur': 'Jaipur',   
      'cairo' : 'Cairo, Egypt', 
      'luxor' : 'Luxor, Egypt',
      'akureyri': 'Akureyri, Iceland',
      'reykjavik': 'Reykjavik, Iceland',
    };
    return nameMap[region] || region.charAt(0).toUpperCase() + region.slice(1);
  };

  const nearbyRegionName = formatRegionName(nearbyRegion);

  return (
    <div
      className="relative w-full h-full snap-start snap-always shrink-0 flex flex-col items-center justify-center px-[36px]"
      style={{ background: 'linear-gradient(160deg, #1a0e0a 0%, #281e1b 60%, #1F3535 100%)', scrollSnapAlign: 'start' }}
    >
      {/* Back to globe — matches the back button on regular reels */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onBackToGlobe}
        className="absolute left-[14px] z-20 bg-black/50 backdrop-blur rounded-full size-[38px] flex items-center justify-center"
        style={{ top: 'max(env(safe-area-inset-top, 0px), 48px)' }}
        aria-label="Back to globe"
      >
        <ArrowLeft className="size-[18px] text-white" />
      </button>

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(201,99,58,0.15) 0%, transparent 65%)' }}
      />

      {/* Globe icon */}
      <motion.div
        className="size-[72px] rounded-full flex items-center justify-center mb-[24px]"
        style={{ background: 'rgba(201,99,58,0.14)', border: '1px solid rgba(201,99,58,0.3)' }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[38px]">🌍</span>
      </motion.div>

      {/* Headline */}
      <motion.p
        className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.18em] mb-[10px] text-center"
        style={{ color: '#C9633A' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {count} {t('voices_from')}
      </motion.p>

      <motion.h2
        className="font-['Fraunces:Regular',sans-serif] text-[26px] text-white text-center leading-[1.25] mb-[12px]"
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        {t('full_community')}
      </motion.h2>

      <motion.p
        className="font-['Inter:Regular',sans-serif] text-[14px] text-white/60 text-center leading-[1.5] mb-[36px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
      >
        {t('answer_culture_lens')}
      </motion.p>

      {/* The question echoed */}
      <motion.div
        className="w-full rounded-[16px] px-[16px] py-[13px] mb-[28px]"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.34 }}
      >
        <p
          className="font-['Fraunces:Regular',sans-serif] text-[15px] text-white/90 text-center leading-[1.4]"
          style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        >
          "{question}"
        </p>
      </motion.div>

      <motion.button
        onClick={onAnswer}
        onPointerDown={(e) => e.stopPropagation()} // <--- BUG FIX: PREVENTS SWIPE FROM EATING CLICK
        className="flex items-center gap-[10px] rounded-[48px] px-[28px] py-[14px] mb-[12px]"
        style={{ background: '#C9633A' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, type: 'spring', damping: 18 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mic className="size-[17px] text-white" />
        <p className="font-['Domine:Regular',sans-serif] text-[16px] text-white">{t('share_answer')}</p>
      </motion.button>

      {/* Navigation buttons */}
      <motion.div
        className="flex flex-col gap-[10px] w-full"
        onPointerDown={(e) => e.stopPropagation()} // <--- BUG FIX: PREVENTS SWIPE FROM EATING CLICK
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={onBackToGlobe}
          className="rounded-[48px] px-[24px] py-[12px] w-full"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <p className="font-['Inter:Medium',sans-serif] text-[14px] text-white">{t('explore_globe')}</p>
        </button>
        <button
          onClick={() => onExploreNearby(nearbyRegion)}
          className="rounded-[48px] px-[24px] py-[12px] w-full"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <p className="font-['Inter:Regular',sans-serif] text-[13px] text-white/80">Explore {nearbyRegionName} →</p>
        </button>
      </motion.div>
    </div>
  );
}

function Slide({ v, caption, question, active }: { v: Vid; caption: string; question: string; active: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full snap-start snap-always shrink-0" style={{ scrollSnapAlign: 'start' }}>
      {/* Background by kind */}
      {v.kind === 'photo' && v.media ? (
        <ImageWithFallback src={v.media} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : v.kind === 'video' ? (
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-b ${v.gradient}`} />
          {v.media && (
            <motion.div
              className="absolute inset-0"
              animate={active ? { scale: [1.1, 1.25, 1.1], x: [0, -14, 0], y: [0, -8, 6, 0] } : { scale: 1.1 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ImageWithFallback src={v.media} alt="" className="w-full h-full object-cover" />
            </motion.div>
          )}
          {/* Film flicker */}
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            animate={active ? { opacity: [0, 0.05, 0, 0.02, 0] } : { opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${v.gradient}`} />
      )}
      {v.kind === 'video' && (
        <>
          {/* Timeline progress */}
          <div className="absolute top-[140px] left-[16px] right-[16px] h-[2px] bg-white/20 rounded-full z-10 overflow-hidden">
            <motion.div
              className="h-full bg-white/90 rounded-full"
              animate={active ? { width: ['0%', '100%'] } : { width: '0%' }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          {/* Audio visualizer bottom-right */}
          <div className="absolute bottom-[120px] left-[16px] flex items-end gap-[3px] h-[18px] z-10">
            {[0.6, 0.9, 0.4, 1, 0.7, 0.3, 0.8, 0.5].map((h, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-white/80 rounded-full"
                animate={active ? { height: [`${h * 30}%`, `${h * 100}%`, `${h * 50}%`] } : { height: '30%' }}
                transition={{ duration: 0.5 + i * 0.07, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
              />
            ))}
          </div>
          {/* Duration badge */}
          <div className="absolute top-[150px] left-[16px] bg-black/50 backdrop-blur rounded-[4px] px-[6px] py-[2px] z-10">
            <p className="font-['DM_Sans:Bold',sans-serif] text-[10px] text-white">0:18</p>
          </div>
        </>
      )}
      {v.kind === 'text' && (
        <div className="absolute inset-0 flex items-center justify-center px-[32px]">
          <p className="font-['Fraunces:Regular',sans-serif] text-[28px] text-white text-center leading-[1.3]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            "{caption}"
          </p>
        </div>
      )}
      {/* Bottom darken gradient for readability */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/70 to-transparent" />

      {/* Bottom caption block */}
      <div className="absolute bottom-0 left-0 right-[80px] pb-[24px] px-[16px] z-10">
        <button onClick={() => navigate(`/profile/${v.username.slice(1)}`)} className="text-left">
          <p className="font-['Inter:Bold',sans-serif] text-[15px] text-white">{v.username}</p>
          <p className="font-['Inter:Regular',sans-serif] text-[12px] text-white/80">{v.location}</p>
        </button>
        {v.kind !== 'text' && (
          <p className="font-['Inter:Regular',sans-serif] text-[13px] text-white mt-[8px] leading-[1.4]">{caption}</p>
        )}
      </div>

    </div>
  );
}