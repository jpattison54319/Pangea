import svgPaths from "./svg-iq7bcrw9i6";
import imgImageIllustration from "./43871cf309752c645e2e5606105f4be67c2b0aed.png";
import { useNavigate } from 'react-router';

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
    <div className="h-[56px] overflow-clip relative shrink-0 w-full" data-name="Status Bar">
      <p className="absolute font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] left-[32px] text-[#281e1b] text-[17px] top-[17px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        10:30
      </p>
      <Frame />
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="flex-[1_0_0] min-h-px overflow-clip relative w-full" data-name="Navigation Bar">
      <p className="-translate-x-1/2 absolute font-['Fraunces:Regular',sans-serif] font-normal leading-[normal] left-[220px] overflow-hidden text-[#281e1b] text-[32px] text-center text-ellipsis top-[13px] w-[440px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Welcome to Pangea!
      </p>
    </div>
  );
}

function HeaderNavigationBarWithTitle() {
  return (
    <div className="bg-[rgba(255,251,250,0)] content-stretch flex flex-col h-[104px] items-start overflow-clip relative shrink-0 w-full z-[3]" data-name="Header Navigation Bar With Title">
      <StatusBar />
      <NavigationBar />
    </div>
  );
}

function ImageIllustration() {
  return <div className="bg-size-[32px_32px] bg-top-left h-[313px] rounded-[16px] shrink-0 w-full" style={{ backgroundImage: `url('${imgImageIllustration}')` }} data-name="Image (Illustration)" />;
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-[#281f1b] text-center w-full" data-name="Container">
      <div className="flex flex-col font-['Roboto_Serif:Bold',sans-serif] font-bold justify-end relative shrink-0 text-[34px] tracking-[-0.68px] w-full" style={{ fontVariationSettings: "'GRAD' 0, 'wdth' 100" }}>
        <p className="leading-[normal]">Discover New Cultures</p>
      </div>
      <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-end relative shrink-0 text-[17px] tracking-[-0.085px] w-full">
        <p className="leading-[1.35]">Swipe through to learn more</p>
      </div>
    </div>
  );
}

function PageIndicatorPages() {
  return (
    <div className="relative shrink-0 size-[6px]" data-name="Page Indicator Pages">
      <div className="absolute bg-[#ba5a33] inset-0 rounded-[360px]" data-name="Rectangle" />
    </div>
  );
}

function PageIndicatorPages1() {
  return (
    <div className="backdrop-blur-[25px] relative shrink-0 size-[6px]" data-name="Page Indicator Pages">
      <div className="absolute bg-[rgba(46,27,20,0.4)] inset-0 rounded-[360px]" data-name="Rectangle" />
    </div>
  );
}

function PageIndicatorPages2() {
  return (
    <div className="backdrop-blur-[25px] relative shrink-0 size-[6px]" data-name="Page Indicator Pages">
      <div className="absolute bg-[rgba(46,27,20,0.4)] inset-0 rounded-[360px]" data-name="Rectangle" />
    </div>
  );
}

function PageIndicatorPages3() {
  return (
    <div className="backdrop-blur-[25px] relative shrink-0 size-[6px]" data-name="Page Indicator Pages">
      <div className="absolute bg-[rgba(46,27,20,0.4)] inset-0 rounded-[360px]" data-name="Rectangle" />
    </div>
  );
}

function PageIndicator() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[48px]" data-name="Page Indicator">
      <PageIndicatorPages />
      <PageIndicatorPages1 />
      <PageIndicatorPages2 />
      <PageIndicatorPages3 />
    </div>
  );
}

function OnboardingPageCarouselWithIllustrations() {
  return (
    <div className="bg-[rgba(251,254,254,0)] relative shrink-0 w-full z-[1]" data-name="Onboarding Page Carousel with Illustrations">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[52px] items-center p-[20px] relative size-full">
          <ImageIllustration />
          <Container />
          <PageIndicator />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col isolate items-start min-h-[582px] relative shrink-0 w-full z-[2]" data-name="Main Content">
      <OnboardingPageCarouselWithIllustrations />
    </div>
  );
}

function ButtonLargePrimary({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-[#884125] flex-[1_0_0] h-[50px] min-w-px relative rounded-[48px] cursor-pointer" data-name="Button Large Primary">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[14.5px] relative size-full">
          <p className="flex-[1_0_0] font-['Fraunces:Bold',sans-serif] font-bold leading-[1.35] min-w-px overflow-hidden relative text-[17px] text-center text-ellipsis text-white whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            Continue
          </p>
        </div>
      </div>
    </button>
  );
}

function SingleButtonPrimaryLarge({ onClick }: { onClick: () => void }) {
  return (
    <div className="bg-[rgba(255,251,250,0)] relative shrink-0 w-full z-[1]" data-name="Single Button Primary Large">
      <div className="content-stretch flex items-start p-[16px] relative size-full">
        <ButtonLargePrimary onClick={onClick} />
      </div>
    </div>
  );
}

export default function WelcomeNewUsers() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fff2ed] content-stretch flex flex-col isolate items-start relative size-full" data-name="Welcome new users">
      <HeaderNavigationBarWithTitle />
      <MainContent />
      <SingleButtonPrimaryLarge onClick={() => navigate('/home')} />
    </div>
  );
}