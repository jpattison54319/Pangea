import svgPaths from "./svg-nseu73lkg2";
import { imgGroup, imgGroup1, imgNorthAmerica, imgVector } from "./svg-vs3ua";

function Battery() {
  return (
    <div className="absolute h-[11px] left-[55.5px] top-[3px] w-[23.5px]" data-name="Battery">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5 11">
        <g id="Battery">
          <path d="M22 3H23.5V8H22V11H0V0H22V3Z" fill="var(--fill-0, #281E1B)" fillOpacity="0.3" id="Battery Shape" />
          <path d="M0 0H16V11H0V0Z" fill="var(--fill-0, #281E1B)" id="Battery Fill" />
        </g>
      </svg>
    </div>
  );
}

function Wifi() {
  return (
    <div className="absolute bottom-[0.5px] h-[13px] left-[31.5px] w-[17px]" data-name="Wifi">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 13">
        <g id="Wifi">
          <path d={svgPaths.p2f6e65e0} fill="var(--fill-0, #281E1B)" fillOpacity="0.3" id="Vector" />
          <path d={svgPaths.p2e3dac80} fill="var(--fill-0, #281E1B)" id="Intersect" />
        </g>
      </svg>
    </div>
  );
}

function Signal() {
  return (
    <div className="absolute h-[14px] left-0 top-0 w-[23.5px]" data-name="Signal">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5 14.0002">
        <g id="Signal">
          <path d="M23.5 14H0V7L23.5 0V14Z" fill="var(--fill-0, #281E1B)" fillOpacity="0.3" id="Vector" />
          <path d={svgPaths.p264a0a00} fill="var(--fill-0, #281E1B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[14.5px] right-[32px] top-[20px] w-[78.5px]" data-name="Frame">
      <Battery />
      <Wifi />
      <Signal />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[65px] overflow-clip relative shrink-0 w-full" data-name="Status Bar">
      <p className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] left-[32px] text-[#281e1b] text-[17px] top-[17px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        10:30
      </p>
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px overflow-clip relative">
      <p className="font-['Fraunces:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[24px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Good morning, Maya!
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.5px_-1.302px] mask-size-[47.5px_47.5px] relative size-full" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.5 44.9475">
        <g id="Group">
          <path d={svgPaths.p194cd480} fill="var(--fill-0, #F4900C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" style={{ containerType: "size" }} data-name="Clip path group">
      <div className="absolute flex inset-[2.74%_5.26%_2.63%_5.26%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <Group />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.25px_-20.469px] mask-size-[42.5px_44.948px] relative size-full" style={{ maskImage: `url('${imgGroup1}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 31.9788">
        <g id="Group">
          <path d={svgPaths.p374d7a80} fill="var(--fill-0, #FFCC4D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[2.74%_5.26%_2.63%_5.26%]" style={{ containerType: "size" }} data-name="Clip path group">
      <div className="absolute flex inset-[45.83%_18.42%_-13.16%_18.42%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <Group1 />
        </div>
      </div>
    </div>
  );
}

function Fire() {
  return (
    <div className="overflow-clip relative shrink-0 size-[47.5px]" data-name="Fire">
      <ClipPathGroup />
      <ClipPathGroup1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[79px]">
      <Fire />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px overflow-clip px-[10px] relative w-[440px]">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function HeaderNavigationBarWithTitle() {
  return (
    <div className="bg-[rgba(255,242,237,0)] content-stretch flex flex-col h-[130px] items-start overflow-clip relative shrink-0 w-full z-[3]" data-name="Header Navigation Bar With Title">
      <StatusBar />
      <Frame1 />
    </div>
  );
}

function Continents() {
  return (
    <div className="absolute contents inset-[25.31%_10.59%_22.94%_20.29%]" data-name="continents">
      <div className="absolute inset-[27.06%_54.02%_48.61%_20.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-44px_-80.303px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="north-america">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 113.036 116.548">
          <path d={svgPaths.pbbee400} fill="var(--fill-0, #C9633A)" id="north-america" opacity="0.96" />
        </svg>
      </div>
      <div className="absolute inset-[25.31%_50.59%_69.2%_43.87%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-147.745px_-71.933px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="greenland">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3725 26.3005">
          <path d={svgPaths.p3d6a0280} fill="var(--fill-0, #C9633A)" id="greenland" opacity="0.9" />
        </svg>
      </div>
      <div className="absolute inset-[48.84%_55.88%_27.21%_35%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-108.706px_-184.639px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="south-america">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.1176 114.736">
          <path d={svgPaths.p385a0c00} fill="var(--fill-0, #C9633A)" id="south-america" opacity="0.96" />
        </svg>
      </div>
      <div className="absolute inset-[28.39%_37.5%_65.44%_52.84%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-187.216px_-86.696px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="europe">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.4902 29.5311">
          <path d={svgPaths.p31b1a000} fill="var(--fill-0, #C9633A)" id="europe" opacity="0.95" />
        </svg>
      </div>
      <div className="absolute inset-[25.49%_38.53%_71.32%_58.09%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-210.294px_-72.789px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="scandinavia">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8824 15.2623">
          <path d={svgPaths.p1aa95c00} fill="var(--fill-0, #C9633A)" id="scandinavia" opacity="0.9" />
        </svg>
      </div>
      <div className="absolute inset-[31.01%_47.35%_67%_50.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-178.588px_-99.221px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="british-isles">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.76471 9.53975">
          <path d={svgPaths.p1190ab00} fill="var(--fill-0, #C9633A)" id="british-isles" opacity="0.88" />
        </svg>
      </div>
      <div className="absolute inset-[35.51%_31.98%_38.53%_54.04%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-192.5px_-120.807px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="africa">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 61.511 124.329">
          <path d={svgPaths.ped9cf80} fill="var(--fill-0, #C9633A)" id="africa" opacity="0.96" />
        </svg>
      </div>
      <div className="absolute inset-[54.03%_29.12%_42.06%_68.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-257.788px_-209.519px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="madagascar">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.8 18.7109">
          <path d={svgPaths.p154bc300} fill="var(--fill-0, #C9633A)" id="madagascar" opacity="0.9" />
        </svg>
      </div>
      <div className="absolute inset-[27.32%_11.76%_59.44%_62.94%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-231.647px_-81.535px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="asia">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111.294 63.4451">
          <path d={svgPaths.p383896c0} fill="var(--fill-0, #C9633A)" id="asia" opacity="0.96" />
        </svg>
      </div>
      <div className="absolute inset-[38.38%_23.53%_53.68%_71.54%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-269.5px_-134.542px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="india">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6765 38.0382">
          <path d={svgPaths.p17186c00} fill="var(--fill-0, #C9633A)" id="india" opacity="0.95" />
        </svg>
      </div>
      <div className="absolute inset-[43.28%_17.77%_52.65%_77.43%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-295.383px_-158.005px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="se-asia-1">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1218 19.5068">
          <path d={svgPaths.p28b1f200} fill="var(--fill-0, #C9633A)" id="se-asia-1" opacity="0.93" />
        </svg>
      </div>
      <div className="absolute inset-[48.13%_16.91%_49.26%_79.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-304.117px_-181.25px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="se-asia-2">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1765 12.4627">
          <path d={svgPaths.p27ff6d80} fill="var(--fill-0, #C9633A)" id="se-asia-2" opacity="0.9" />
        </svg>
      </div>
      <div className="absolute bottom-1/2 left-[84.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-324.564px_-179.368px] mask-size-[349.412px_380.383px] right-[13.53%] top-[47.74%]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="se-asia-3">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6118 10.8223">
          <path d={svgPaths.p2b13b780} fill="var(--fill-0, #C9633A)" id="se-asia-3" opacity="0.88" />
        </svg>
      </div>
      <div className="absolute inset-[53.74%_13.75%_40%_75.85%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-288.427px_-208.104px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="australia">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.7604 29.9878">
          <path d={svgPaths.p33c10500} fill="var(--fill-0, #C9633A)" id="australia" opacity="0.96" />
        </svg>
      </div>
      <div className="absolute inset-[61.37%_10.59%_36.7%_87.65%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-340.353px_-244.647px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="new-zealand">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.76471 9.25368">
          <path d={svgPaths.p39c42600} fill="var(--fill-0, #C9633A)" id="new-zealand" opacity="0.88" />
        </svg>
      </div>
      <div className="absolute inset-[73.07%_27.21%_22.94%_30.15%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-87.353px_-300.695px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="antarctica">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 187.647 19.1072">
          <path d={svgPaths.pf582380} fill="var(--fill-0, #C9633A)" id="antarctica" opacity="0.85" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[10.29%]" data-name="Clip path group">
      <Continents />
    </div>
  );
}

function Grid() {
  return (
    <div className="absolute contents inset-[10.29%]" data-name="grid">
      <div className="absolute inset-[41.91%_10.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-151.448px] mask-size-[349.412px_380.383px] opacity-32" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="Vector">
        <div className="absolute inset-[-0.32%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 349.912 77.9853">
            <path d={svgPaths.pf59d00} id="Vector" stroke="var(--stroke-0, #0D3A3A)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.41%_10.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-91.573px] mask-size-[349.412px_380.383px] opacity-32" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="Vector">
        <div className="absolute inset-[-0.13%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 349.912 197.735">
            <path d={svgPaths.p250d7680} id="Vector" stroke="var(--stroke-0, #0D3A3A)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[17.65%_10.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-35.221px] mask-size-[349.412px_380.383px] opacity-32" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 349.912 310.441">
          <path d={svgPaths.p153a5200} id="Vector" stroke="var(--stroke-0, #0D3A3A)" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute inset-[10.29%_41.91%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-139.117px_0px] mask-size-[349.412px_380.383px] opacity-32" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="Vector">
        <div className="absolute inset-[0_-0.35%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.6765 380.882">
            <path d={svgPaths.p1d335580} id="Vector" stroke="var(--stroke-0, #0D3A3A)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[10.29%_29.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-84.117px_0px] mask-size-[349.412px_380.383px] opacity-32" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="Vector">
        <div className="absolute inset-[0_-0.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 181.676 380.882">
            <path d={svgPaths.p5182300} id="Vector" stroke="var(--stroke-0, #0D3A3A)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[10.29%_17.65%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-32.353px_0px] mask-size-[349.412px_380.383px] opacity-32" style={{ maskImage: `url('${imgNorthAmerica}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 285.206 380.882">
          <path d={svgPaths.p31619880} id="Vector" stroke="var(--stroke-0, #0D3A3A)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-[10.29%]" data-name="Clip path group">
      <Grid />
    </div>
  );
}

function HotspotKansasCity() {
  return (
    <div className="absolute contents inset-[32.35%_60.88%_56.47%_27.94%]" data-name="hotspot-kansas-city">
      <div className="absolute inset-[32.35%_60.88%_56.47%_27.94%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-77.647px_-105.661px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.1765 53.5353">
          <path d={svgPaths.p13941100} fill="url(#paint0_radial_1_256)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(24.5882 26.7676) scale(24.5882 26.7676)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_256" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.9" />
              <stop offset="0.4" stopColor="#C9633A" stopOpacity="0.45" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[37.21%_65.74%_61.32%_32.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-99px_-128.906px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.47059 7.04412">
          <path d={svgPaths.p3f9e780} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotWesternEurope() {
  return (
    <div className="absolute contents inset-[27.94%_39.71%_62.65%_50.88%]" data-name="hotspot-western-europe">
      <div className="absolute inset-[27.94%_39.71%_62.65%_50.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-178.589px_-84.529px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.4118 45.0824">
          <path d={svgPaths.pfecef00} fill="url(#paint0_radial_1_232)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(20.7059 22.5412) scale(20.7059 22.5412)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_232" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#C9633A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[31.99%_43.75%_66.69%_54.93%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-196.383px_-103.9px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.82353 6.33971">
          <path d={svgPaths.p327d4780} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotJapan() {
  return (
    <div className="absolute contents inset-[29.26%_9.41%_60.15%_80%]" data-name="hotspot-japan">
      <div className="absolute inset-[29.26%_9.41%_60.15%_80%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-306.706px_-90.869px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.5882 50.7176">
          <path d={svgPaths.p14c70880} fill="url(#paint0_radial_1_206)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(23.2941 25.3588) scale(23.2941 25.3588)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_206" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.9" />
              <stop offset="0.4" stopColor="#C9633A" stopOpacity="0.45" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[33.82%_13.97%_64.71%_84.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-326.765px_-112.706px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.47059 7.04412">
          <path d={svgPaths.p3f9e780} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotIndia() {
  return (
    <div className="absolute contents inset-[37.79%_22.06%_53.97%_69.71%]" data-name="hotspot-india">
      <div className="absolute inset-[37.79%_22.06%_53.97%_69.71%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-261.412px_-131.725px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.2353 39.4471">
          <path d={svgPaths.pbf90e80} fill="url(#paint0_radial_1_250)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(18.1176 19.7235) scale(18.1176 19.7235)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_250" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#C9633A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[41.32%_25.59%_57.5%_73.24%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-276.941px_-148.631px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.17647 5.63529">
          <path d={svgPaths.p519e600} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotNamibia() {
  return (
    <div className="absolute contents inset-[50.59%_33.97%_39.41%_56.03%]" data-name="hotspot-namibia">
      <div className="absolute inset-[50.59%_33.97%_39.41%_56.03%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-201.235px_-193.009px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 47.9">
          <path d={svgPaths.p2336f300} fill="url(#paint0_radial_1_220)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(22 23.95) scale(22 23.95)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_220" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.9" />
              <stop offset="0.4" stopColor="#C9633A" stopOpacity="0.45" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[54.85%_38.24%_43.68%_60.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-220px_-213.437px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.47059 7.04412">
          <path d={svgPaths.p3f9e780} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotBrazil() {
  return (
    <div className="absolute contents inset-[51.18%_54.71%_40%_36.47%]" data-name="hotspot-brazil">
      <div className="absolute inset-[51.18%_54.71%_40%_36.47%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115.177px_-195.826px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.8235 42.2647">
          <path d={svgPaths.pf407380} fill="url(#paint0_radial_1_204)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(19.4118 21.1324) scale(19.4118 21.1324)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_204" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#C9633A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[55%_58.53%_43.82%_40.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-132px_-214.141px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.17647 5.63529">
          <path d={svgPaths.p519e600} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotAustralia() {
  return (
    <div className="absolute contents inset-[53.24%_15.59%_39.12%_76.76%]" data-name="hotspot-australia">
      <div className="absolute inset-[53.24%_15.59%_39.12%_76.76%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-292.471px_-205.688px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.6471 36.6294">
          <path d={svgPaths.p35025000} fill="url(#paint0_radial_1_200)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(16.8235 18.3147) scale(16.8235 18.3147)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_200" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#C9633A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[56.54%_18.9%_42.43%_80.07%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-307.029px_-221.537px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.52941 4.93088">
          <path d={svgPaths.p3486c6c0} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotIceland() {
  return (
    <div className="absolute contents inset-[25.74%_47.06%_68.38%_47.06%]" data-name="hotspot-iceland">
      <div className="absolute inset-[25.74%_47.06%_68.38%_47.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-161.765px_-73.963px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.8824 28.1765">
          <path d={svgPaths.pdec2b80} fill="url(#paint0_radial_1_218)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(12.9412 14.0882) scale(12.9412 14.0882)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_218" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#C9633A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[28.24%_49.56%_70.88%_49.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-172.765px_-85.938px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.88235 4.22647">
          <path d={svgPaths.p290c00} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function HotspotGuatemala() {
  return (
    <div className="absolute contents inset-[41.62%_65.15%_51.91%_28.38%]" data-name="hotspot-guatemala">
      <div className="absolute inset-[41.62%_65.15%_51.91%_28.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-79.589px_-150.039px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.4706 30.9941">
          <path d={svgPaths.p3b0cff80} fill="url(#paint0_radial_1_198)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(14.2353 15.4971) scale(14.2353 15.4971)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_198" r="1">
              <stop stopColor="#E8B04B" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#C9633A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#C9633A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[44.41%_67.94%_54.71%_31.18%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-91.883px_-163.423px] mask-size-[349.412px_380.383px]" style={{ maskImage: `url('${imgVector}')` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.88235 4.22647">
          <path d={svgPaths.p290c00} fill="var(--fill-0, #E8B04B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Hotspots() {
  return (
    <div className="absolute contents inset-[25.74%_9.41%_39.12%_27.94%]" data-name="hotspots">
      <HotspotKansasCity />
      <HotspotWesternEurope />
      <HotspotJapan />
      <HotspotIndia />
      <HotspotNamibia />
      <HotspotBrazil />
      <HotspotAustralia />
      <HotspotIceland />
      <HotspotGuatemala />
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-[10.29%]" data-name="Clip path group">
      <Hotspots />
    </div>
  );
}

function PangeaGlobeHeatmapV() {
  return (
    <div className="h-[479px] overflow-clip relative shrink-0 w-full z-[2]" data-name="pangea_globe_heatmap_v2 2">
      <div className="absolute inset-[5.88%]" data-name="atmosphere">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 388.235 422.647">
          <path d={svgPaths.p11798b00} fill="url(#paint0_radial_1_309)" id="atmosphere" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(194.118 211.324) scale(194.118 211.324)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_309" r="1">
              <stop offset="0.92" stopColor="#1F6B6B" stopOpacity="0" />
              <stop offset="0.96" stopColor="#2A8A8A" stopOpacity="0.4" />
              <stop offset="1" stopColor="#2A8A8A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[10.29%]" data-name="ocean">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 349.412 380.382">
          <path d={svgPaths.p1cca5b00} fill="url(#paint0_radial_1_271)" id="ocean" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(122.294 114.115) scale(262.059 285.287)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_271" r="1">
              <stop stopColor="#2A8A8A" />
              <stop offset="0.55" stopColor="#1F6B6B" />
              <stop offset="1" stopColor="#0D3A3A" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <ClipPathGroup2 />
      <ClipPathGroup3 />
      <div className="absolute inset-[10.29%]" data-name="shading">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 349.412 380.382">
          <path d={svgPaths.p1cca5b00} fill="url(#paint0_radial_1_234)" id="shading" opacity="0.9" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(244.588 285.287) scale(262.059 285.287)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_234" r="1">
              <stop offset="0.6" stopOpacity="0" />
              <stop offset="1" stopOpacity="0.35" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <ClipPathGroup4 />
      <div className="absolute inset-[10.29%]" data-name="rim">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 349.912 380.882">
          <path d={svgPaths.pee7f800} id="rim" opacity="0.6" stroke="var(--stroke-0, #FF0000)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}

function Spin() {
  return (
    <div className="absolute h-[291px] left-[19px] top-[291.5px] w-[403px] z-[1]" data-name="Spin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 403 291">
        <g clipPath="url(#clip0_1_193)" id="Spin">
          <path d={svgPaths.p220d4c00} fill="var(--fill-0, #7E3F25)" fillOpacity="0.75" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_193">
            <rect fill="white" height="291" width="403" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col isolate items-start min-h-[582px] py-[32px] relative shrink-0 w-full z-[2]" data-name="Main Content">
      <PangeaGlobeHeatmapV />
      <Spin />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p217d7e00} fill="var(--fill-0, #2A8A8A)" fillOpacity="0.6" fillRule="evenodd" id="Icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-center justify-center px-[71px] relative shrink-0 w-[176px]" data-name="tab1">
      <Icon />
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[1.35] min-w-full relative shrink-0 text-[11px] text-[rgba(42,138,138,0.6)] text-center w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Globe
      </p>
    </div>
  );
}

function DribbbleLightPreview() {
  return (
    <div className="absolute contents inset-0" data-name="Dribbble-Light-Preview">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0004 24">
        <g id="icons">
          <path clipRule="evenodd" d={svgPaths.pa541d00} fill="var(--fill-0, black)" fillOpacity="0.5" fillRule="evenodd" id="profile_round-[#1342]" />
        </g>
      </svg>
    </div>
  );
}

function Page() {
  return (
    <div className="absolute contents inset-0" data-name="Page-1">
      <DribbbleLightPreview />
    </div>
  );
}

function Profile() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Profile">
      <Page />
    </div>
  );
}

function Tab1() {
  return (
    <button className="content-stretch cursor-pointer flex flex-col gap-[4px] h-full items-center justify-center px-[70px] relative shrink-0 w-[176px]" data-name="tab2">
      <Profile />
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[1.35] min-w-full relative shrink-0 text-[11px] text-[rgba(0,0,0,0.5)] text-center w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Profile
      </p>
    </button>
  );
}

function Plus() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-name="Plus">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Plus">
          <path d={svgPaths.p3505d200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function RoundButton() {
  return (
    <div className="bg-[#7e3f25] relative rounded-[360px] shrink-0 size-[72px]" data-name="Round Button">
      <Plus />
      <div className="absolute inset-[-4.86%_-4.86%_-3.47%_-3.47%] rounded-[360px]" data-name="Highlight Border">
        <div aria-hidden="true" className="absolute border-3 border-[#7e3f25] border-solid inset-[-3px] pointer-events-none rounded-[363px]" />
      </div>
    </div>
  );
}

function MainButton() {
  return (
    <div className="-translate-x-1/2 absolute bg-white content-stretch flex items-center left-1/2 p-[8px] rounded-[360px] top-0" data-name="Main button">
      <RoundButton />
    </div>
  );
}

function MainCircle() {
  return (
    <div className="absolute h-[95px] left-[176px] top-[-30px] w-[88px]" data-name="Main Circle">
      <MainButton />
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[88px] items-start min-h-px relative w-full" data-name="tabs">
      <Tab />
      <Tab1 />
      <MainCircle />
    </div>
  );
}

export default function HomeScreen() {
  return (
    <div className="bg-[#fff2ed] content-stretch flex flex-col isolate items-center justify-between relative size-full" data-name="Home screen">
      <HeaderNavigationBarWithTitle />
      <MainContent />
      <div className="bg-white content-stretch flex flex-col h-[65px] items-center justify-end relative shadow-[0px_16px_32px_0px_rgba(0,0,0,0.16)] shrink-0 w-[440px] z-[1]" data-name="Bottom Nav Bar">
        <Tabs />
      </div>
    </div>
  );
}