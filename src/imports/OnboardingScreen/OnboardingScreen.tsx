import svgPaths from "./svg-icyeeptze4";

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
    <div className="h-[56px] overflow-clip relative shrink-0 w-full z-[3]" data-name="Status Bar">
      <p className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] left-[32px] text-[#281e1b] text-[17px] top-[17px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        10:30
      </p>
      <Frame />
    </div>
  );
}

function Emblem() {
  return (
    <div className="h-[188.374px] relative shrink-0 w-[187.209px]" data-name="emblem">
      <div className="absolute inset-[-0.2%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 187.209 189.124">
          <g id="emblem">
            <path d={svgPaths.p35a7d180} id="orbit-ring" opacity="0.7" stroke="var(--stroke-0, #E8B04B)" strokeWidth="1.25" />
            <path d={svgPaths.p96f870} fill="var(--fill-0, #1F6B6B)" id="globe-sphere" />
            <path d={svgPaths.p146f7d70} id="meridian-horizontal" opacity="0.55" stroke="var(--stroke-0, #F7F3EE)" strokeWidth="1.25" />
            <path d={svgPaths.p1aa19b00} id="meridian-vertical" opacity="0.55" stroke="var(--stroke-0, #F7F3EE)" strokeWidth="1.25" />
            <path d={svgPaths.p6577e20} id="meridian-quarter" opacity="0.35" stroke="var(--stroke-0, #F7F3EE)" strokeWidth="0.75" />
            <path d={svgPaths.p34737f00} id="outer-ring" opacity="0.5" stroke="var(--stroke-0, #E8B04B)" strokeWidth="0.75" />
            <path d={svgPaths.p2f0fa500} fill="var(--fill-0, #E8B04B)" id="hotspot-a" />
            <path d={svgPaths.p2d5f8800} fill="var(--fill-0, #E8B04B)" id="hotspot-b" />
            <path d={svgPaths.p604300} fill="var(--fill-0, #E8B04B)" id="hotspot-c" opacity="0.7" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-[7.09px] relative shrink-0 w-[91.853px]" data-name="divider">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.853 7.09004">
        <g id="divider">
          <path d="M0 3.54502H45.9265" id="Vector" opacity="0.75" stroke="var(--stroke-0, #E8B04B)" strokeWidth="1.25" />
          <path d="M45.9265 3.54503H91.8529" id="Vector_2" opacity="0.75" stroke="var(--stroke-0, #E8B04B)" strokeWidth="1.25" />
          <path d={svgPaths.p1435ccf0} fill="var(--fill-0, #E8B04B)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function PangeaWordmark() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="pangea_wordmark 1">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center px-[175px] py-[32px] relative size-full">
          <Emblem />
          <p className="font-['Fraunces:Regular',sans-serif] font-normal h-[205.611px] leading-[normal] relative shrink-0 text-[#c9633a] text-[118px] text-center w-[343.938px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            Pangea
          </p>
          <Divider />
          <p className="font-['Inter:Regular',sans-serif] font-normal h-[24.106px] leading-[normal] not-italic relative shrink-0 text-[#6b6860] text-[14px] text-center w-[250.044px]">SEE THE WORLD THROUGH LOCALS</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] flex-[1_0_0] min-h-px relative w-full z-[2]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[10px] relative size-full">
          <PangeaWordmark />
        </div>
      </div>
    </div>
  );
}

function ButtonLargePrimary() {
  return (
    <div className="bg-[#7e3f25] relative rounded-[48px] shadow-[0px_8px_16px_-2px_rgba(0,0,0,0.15),0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Button Large Primary">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="flex-[1_0_0] font-['Domine:Regular',sans-serif] font-normal leading-[1.35] min-w-px overflow-hidden relative text-[17px] text-center text-ellipsis text-white whitespace-nowrap">Create an account</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[280px] relative shrink-0 w-full z-[1]">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[16px] relative size-full">
          <ButtonLargePrimary />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingScreen() {
  return (
    <div className="bg-[#fff2ed] content-stretch flex flex-col isolate items-center justify-between relative size-full" data-name="Onboarding Screen">
      <StatusBar />
      <Frame2 />
      <Frame1 />
    </div>
  );
}