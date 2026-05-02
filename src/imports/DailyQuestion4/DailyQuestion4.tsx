import svgPaths from "./svg-vdbg7cxbbw";
import imgPhotoLibrary from "./230b605a4d0c24ab43ced96961c27cb77464b906.png";
import { imgGroup } from "./svg-ldxaq";

function Close() {
  return (
    <div className="absolute left-[63px] size-[24px] top-[773px] z-[7]" data-name="Close">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close">
          <path d={svgPaths.p33964a00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

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
    <div className="h-[14.5px] relative shrink-0 w-[78.5px]" data-name="Frame">
      <Battery />
      <Wifi />
      <Signal />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative shrink-0 w-full" data-name="Status Bar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[17px] relative size-full">
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#281e1b] text-[17px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            10:30
          </p>
          <Frame />
        </div>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Navigation Bar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[10px] relative size-full">
          <p className="font-['Fraunces:Regular',sans-serif] font-normal leading-[normal] overflow-hidden relative shrink-0 text-[#281e1b] text-[32px] text-center text-ellipsis whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            Daily Question
          </p>
        </div>
      </div>
    </div>
  );
}

function HeaderNavigationBarWithTitle() {
  return (
    <div className="bg-[rgba(255,251,250,0)] content-stretch flex flex-col h-[143px] items-start overflow-clip relative shrink-0 w-full z-[5]" data-name="Header Navigation Bar With Title">
      <StatusBar />
      <NavigationBar />
    </div>
  );
}

function MessageSquare() {
  return (
    <div className="absolute contents inset-[5%]" data-name="message-square">
      <div className="absolute inset-[5%]" data-name="Shape">
        <div className="absolute inset-[-0.49%_-0.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 411.7">
            <path clipRule="evenodd" d={svgPaths.p28ebbd00} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Artboard() {
  return (
    <div className="absolute contents inset-[5%]" data-name="Artboard">
      <MessageSquare />
    </div>
  );
}

function Page() {
  return (
    <div className="absolute contents inset-[5%]" data-name="Page-1">
      <Artboard />
    </div>
  );
}

function Message() {
  return (
    <div className="h-[453px] overflow-clip relative shrink-0 w-full z-[1]" data-name="Message">
      <Page />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col h-[582px] isolate items-start min-h-[582px] relative shrink-0 w-full z-[4]" data-name="Main Content">
      <Message />
    </div>
  );
}

function ButtonLargeSecondary() {
  return (
    <div className="bg-[rgba(126,63,37,0.09)] content-stretch flex h-[37px] items-center justify-center overflow-clip p-[16px] relative rounded-[48px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25),0px_8px_16px_-2px_rgba(0,0,0,0.15)] shrink-0 w-[408px]" data-name="Button Large Secondary">
      <p className="flex-[1_0_0] font-['Domine:Regular',sans-serif] font-normal leading-[1.35] min-w-px overflow-hidden relative text-[17px] text-black text-center text-ellipsis whitespace-nowrap">Skip today’s question</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full z-[3]">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <ButtonLargeSecondary />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[99px] relative shrink-0 w-full z-[2]">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-end px-[16px] relative size-full">
          <div className="h-full relative rounded-[3px] shrink-0 w-[70px]" data-name="✏️ Photo Library">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[3px]">
              <img alt="" className="absolute max-w-none object-cover rounded-[3px] size-full" src={imgPhotoLibrary} />
              <img alt="" className="absolute max-w-none object-cover rounded-[3px] size-full" src={imgPhotoLibrary} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[11px] left-1/2 top-[calc(50%-0.5px)] w-[12px]" data-name="Plus">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Plus">
          <path d={svgPaths.p2bd5a200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function RoundButton() {
  return (
    <div className="bg-[rgba(126,63,37,0.5)] relative rounded-[360px] shrink-0 size-[24px]" data-name="Round Button">
      <Plus />
      <div className="absolute inset-[-4.86%_-4.86%_-3.47%_-3.47%] rounded-[360px]" data-name="Highlight Border">
        <div aria-hidden="true" className="absolute border-3 border-[rgba(126,63,37,0.5)] border-solid inset-[-3px] pointer-events-none rounded-[363px]" />
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="Contents">
      <div className="h-px relative shrink-0 w-full" data-name="_Separator">
        <div aria-hidden="true" className="absolute border-[#e6e6e6] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] min-h-px relative text-[17px] text-black tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">You have to hit up Flipside and get their PBJ Burger!</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[7.16%_3.13%_7.16%_3.12%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.75px_-1.718px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 20.5643">
        <g id="Group">
          <path d={svgPaths.p2d8eb600} fill="var(--fill-0, #7E3F25)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Send() {
  return (
    <div className="absolute left-[10px] overflow-clip size-[24px] top-[10px]" data-name="Send">
      <ClipPathGroup />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative rounded-[999px] shrink-0 size-[44px]">
      <div aria-hidden="true" className="absolute border-2 border-[#7e3f25] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <Send />
    </div>
  );
}

function SingleButtonPrimaryLarge() {
  return (
    <div className="bg-[#fffbfa] relative shrink-0 w-full z-[1]" data-name="Single Button Primary Large">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[16px] relative size-full">
          <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[360px] shrink-0 size-[44px]" data-name="Main button">
            <RoundButton />
          </div>
          <div className="flex-[1_0_0] h-[52px] min-w-px relative" data-name="Text Field">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[16px] relative size-full">
                <Contents />
              </div>
            </div>
          </div>
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

export default function DailyQuestion() {
  return (
    <div className="bg-[#fff2ed] content-stretch flex flex-col isolate items-center justify-between relative size-full" data-name="Daily question 4">
      <Close />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[208px] justify-center leading-[0] left-[55px] not-italic text-[24px] text-[rgba(0,0,0,0.8)] top-[343px] tracking-[-0.552px] w-[357px] z-[6]">
        <p className="leading-[1.5]">{`If someone was visiting your area, what’s the one 'must-try' restaurant and the dish they absolutely have to order?`}</p>
      </div>
      <HeaderNavigationBarWithTitle />
      <MainContent />
      <Frame2 />
      <Frame3 />
      <SingleButtonPrimaryLarge />
    </div>
  );
}