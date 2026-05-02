import svgPaths from "./svg-qhggd3kwac";

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
    <div className="h-[48px] relative shrink-0 w-full" data-name="Navigation Bar">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[10px] relative size-full">
          <p className="-translate-x-1/2 absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] left-[220px] overflow-hidden text-[#281e1b] text-[32px] text-center text-ellipsis top-[13px] w-[440px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            Create Account
          </p>
        </div>
      </div>
    </div>
  );
}

function HeaderNavigationBarWithTitle() {
  return (
    <div className="bg-[rgba(255,251,250,0)] content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full z-[2]" data-name="Header Navigation Bar With Title">
      <StatusBar />
      <NavigationBar />
    </div>
  );
}

function FacebookIcon() {
  return (
    <div className="absolute left-[15px] size-[22px] top-[15px]" data-name="Facebook Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_1_500)" id="Facebook Icon">
          <path d={svgPaths.pc40d400} fill="url(#paint0_linear_1_500)" id="Subtract" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_500" x1="11.0005" x2="11.0005" y1="21.2346" y2="-0.00405221">
            <stop stopColor="#E4DBD7" />
            <stop offset="1" stopColor="#E4DBD7" />
          </linearGradient>
          <clipPath id="clip0_1_500">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonSignUpWithFacebook() {
  return (
    <div className="bg-[#1877f2] relative rounded-[48px] shrink-0 w-full" data-name="Button Sign up with Facebook">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[15px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:bold',sans-serif] leading-[1.35] min-w-px not-italic overflow-hidden relative text-[17px] text-center text-ellipsis text-white whitespace-nowrap">Sign up with Facebook</p>
          <FacebookIcon />
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <div className="absolute inset-[28%_90.13%_28%_3.91%]" data-name="Google Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3359 22">
        <g id="Google Icon">
          <path d={svgPaths.p20870400} fill="var(--fill-0, #B85933)" id="path" />
          <path d={svgPaths.p28c85200} fill="var(--fill-0, #A85534)" id="path_2" />
          <path d={svgPaths.p3d484200} fill="var(--fill-0, #B95933)" id="path_3" />
          <path d={svgPaths.p119e0e00} fill="var(--fill-0, #B85933)" id="path_4" />
        </g>
      </svg>
    </div>
  );
}

function ButtonSignUpWithGoogle() {
  return (
    <div className="bg-white h-[50px] relative rounded-[48px] shrink-0 w-full" data-name="Button Sign up with Google">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:bold',sans-serif] leading-[1.35] min-w-px not-italic overflow-hidden relative text-[#3c4043] text-[17px] text-center text-ellipsis whitespace-nowrap">Sign up with Google</p>
          <GoogleIcon />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[48px]" />
    </div>
  );
}

function ButtonSignUpWithApple() {
  return (
    <div className="bg-black relative rounded-[48px] shrink-0 w-full" data-name="Button Sign up with Apple">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[15px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:bold',sans-serif] leading-[1.35] min-w-px not-italic overflow-hidden relative text-[17px] text-center text-ellipsis text-white whitespace-nowrap">Sign up with Apple</p>
          <div className="absolute h-[22px] left-[16.08px] top-[13px] w-[17.912px]" data-name="Apple Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.912 22">
              <path d={svgPaths.p22a41300} fill="var(--fill-0, black)" id="Apple Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpButtons() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[16px] shrink-0 w-full z-[4]" data-name="Sign up buttons">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <ButtonSignUpWithFacebook />
        <ButtonSignUpWithGoogle />
        <ButtonSignUpWithApple />
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table Header">
      <div className="content-stretch flex items-start justify-between pb-[4px] pt-[24px] px-[16px] relative size-full">
        <p className="flex-[1_0_0] font-['Fraunces:Regular',sans-serif] font-normal leading-[1.3] min-w-px relative text-[#281e1b] text-[22px] tracking-[-0.22px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          Sign Up with Email
        </p>
      </div>
    </div>
  );
}

function TableTitleEmphasized() {
  return (
    <div className="bg-[rgba(255,251,250,0)] relative shrink-0 w-full" data-name="Table Title Emphasized">
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <TableHeader />
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
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] min-h-px relative text-[17px] text-[rgba(60,60,67,0.5)] tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">First name</p>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="Contents">
      <div className="h-px relative shrink-0 w-full" data-name="_Separator">
        <div aria-hidden="true" className="absolute border-[#e6e6e6] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] min-h-px relative text-[17px] text-[rgba(60,60,67,0.5)] tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Last name</p>
      </div>
    </div>
  );
}

function DualTextField() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Dual Text Field">
      <div className="flex-[1_0_0] h-[52px] min-w-px relative" data-name="Text Field">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] relative size-full">
            <Contents />
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] h-[52px] min-w-px relative" data-name="Text Field">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] relative size-full">
            <Contents1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Contents2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="Contents">
      <div className="h-px relative shrink-0 w-full" data-name="_Separator">
        <div aria-hidden="true" className="absolute border-[#e6e6e6] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] min-h-px relative text-[17px] text-[rgba(60,60,67,0.5)] tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Email</p>
      </div>
    </div>
  );
}

function Contents3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="Contents">
      <div className="h-px relative shrink-0 w-full" data-name="_Separator">
        <div aria-hidden="true" className="absolute border-[#e6e6e6] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] min-h-px relative text-[17px] text-[rgba(60,60,67,0.5)] tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Password</p>
      </div>
    </div>
  );
}

function SignUpWithEmail() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px relative w-full z-[3]" data-name="Sign up with Email">
      <TableTitleEmphasized />
      <DualTextField />
      <div className="h-[52px] relative shrink-0 w-full" data-name="Text Field">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] relative size-full">
            <Contents2 />
          </div>
        </div>
      </div>
      <div className="h-[52px] relative shrink-0 w-full" data-name="Text Field">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] relative size-full">
            <Contents3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(255,251,250,0)] relative shrink-0 w-full z-[2]" data-name="Frame">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[13px] text-[rgba(40,30,27,0.5)] text-center">{`By creating an account, you agree to our Terms & Conditions.`}</p>
        </div>
      </div>
    </div>
  );
}

function ButtonLargePrimary() {
  return (
    <div className="bg-[#884125] flex-[1_0_0] h-[50px] min-w-px relative rounded-[48px]" data-name="Button Large Primary">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[14.5px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:bold',sans-serif] leading-[1.35] min-w-px not-italic overflow-hidden relative text-[17px] text-center text-ellipsis text-white whitespace-nowrap">Create Account</p>
        </div>
      </div>
    </div>
  );
}

function SingleButtonPrimaryLarge() {
  return (
    <div className="bg-[rgba(0,0,0,0)] relative shrink-0 w-full z-[1]" data-name="Single Button Primary Large">
      <div className="content-stretch flex items-start p-[16px] relative size-full">
        <ButtonLargePrimary />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col h-[818px] isolate items-start min-h-[716px] relative shrink-0 w-full z-[1]" data-name="Main Content">
      <SignUpButtons />
      <SignUpWithEmail />
      <Frame1 />
      <SingleButtonPrimaryLarge />
    </div>
  );
}

export default function CreateAccountScreen() {
  return (
    <div className="bg-[#fff2ed] content-stretch flex flex-col isolate items-start justify-between relative size-full" data-name="Create account screen">
      <HeaderNavigationBarWithTitle />
      <MainContent />
    </div>
  );
}