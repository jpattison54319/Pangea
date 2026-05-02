import svgPaths from "./svg-ipv5oa7r9j";
import imgCamera from "./d524685e02173bcd4f4e78c023f09ba974b044d4.png";
import imgPhotoLibrary from "./230b605a4d0c24ab43ced96961c27cb77464b906.png";
type HomeIndicatorProps = {
  className?: string;
  darkMode?: boolean;
};

function HomeIndicator({ className, darkMode = false }: HomeIndicatorProps) {
  return (
    <div className={className || "h-[34px] relative w-[390px]"}>
      <div className={`-translate-x-1/2 absolute bottom-[8px] h-[5px] left-1/2 rounded-[100px] w-[134px] ${darkMode ? "bg-white" : "bg-black"}`} data-name="Home Indicator" />
    </div>
  );
}
type CameraProps = {
  className?: string;
  liveText?: boolean;
};

export default function Camera({ className, liveText = true }: CameraProps) {
  return (
    <div className={className || "bg-white h-[956px] overflow-clip relative w-[440px]"} data-name="Camera">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCamera} />
      <HomeIndicator className="absolute bottom-0 h-[34px] left-0 right-0" darkMode />
      <div className="absolute bg-[rgba(0,0,0,0.5)] bottom-0 h-[203px] left-0 overflow-clip right-0" data-name="Bottom Drawer">
        <div className="absolute bottom-[171px] h-[16px] left-[20px] right-[28px]" data-name="Type Selector">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-[calc(10%-4.7px)] top-1/2 w-[59px]" data-name="Cinematic">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59 10">
              <g id="Cinematic">
                <path d={svgPaths.p899b400} fill="url(#paint0_linear_1_916)" />
                <path d={svgPaths.p2233b100} fill="url(#paint1_linear_1_916)" />
                <path d={svgPaths.p241fc172} fill="url(#paint2_linear_1_916)" />
                <path d={svgPaths.p34812b00} fill="url(#paint3_linear_1_916)" />
                <path d={svgPaths.p221c7e31} fill="url(#paint4_linear_1_916)" />
                <path d={svgPaths.p3ecedc00} fill="url(#paint5_linear_1_916)" />
                <path d={svgPaths.p17c76700} fill="url(#paint6_linear_1_916)" />
                <path d={svgPaths.p3ba08200} fill="url(#paint7_linear_1_916)" />
                <path d={svgPaths.p2ca9dcf0} fill="url(#paint8_linear_1_916)" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint7_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint8_linear_1_916" x1="59.5" x2="-1.5" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['SF_Compact:Regular',sans-serif] font-[457.8999938964844] justify-center leading-[0] left-[calc(30%-16.6px)] text-[14px] text-white top-1/2 tracking-[0.28px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">photo</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['SF_Compact:Regular',sans-serif] font-[457.8999938964844] justify-center leading-[0] left-[calc(70%-11.4px)] text-[14px] text-white top-1/2 tracking-[0.28px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">Portrait</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-[calc(90%+20.7px)] top-1/2 w-[27px]" data-name="PANO">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 10">
              <g id="PANO">
                <path d={svgPaths.p3dbd40f1} fill="url(#paint0_linear_1_899)" />
                <path d={svgPaths.p2072cd80} fill="url(#paint1_linear_1_899)" />
                <path d={svgPaths.p1826ce00} fill="url(#paint2_linear_1_899)" />
                <path d={svgPaths.p278be00} fill="url(#paint3_linear_1_899)" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_899" x1="27.2288" x2="-0.68644" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" stopOpacity="0.4" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_899" x1="27.2288" x2="-0.68644" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" stopOpacity="0.4" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_899" x1="27.2288" x2="-0.68644" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" stopOpacity="0.4" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_899" x1="27.2288" x2="-0.68644" y1="5.00001" y2="5.00001">
                  <stop stopColor="white" stopOpacity="0.4" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['SF_Compact:Semibold',sans-serif] font-[656.2000122070312] justify-center leading-[0] left-[calc(50%-19px)] text-[#ffd60a] text-[14px] top-1/2 tracking-[0.38px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">Video</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-[79px] left-1/2 size-[72px]" data-name="Icon / Shutter">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
            <path d={svgPaths.p15d4c300} fill="var(--fill-0, #FF0000)" id="Icon / Shutter" />
          </svg>
        </div>
        <div className="absolute bottom-[91px] left-[20px] rounded-[3px] size-[49px]" data-name="✏️ Photo Library">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[3px] size-full" src={imgPhotoLibrary} />
        </div>
        <div className="absolute bottom-[92px] right-[20px] size-[48px]" data-name="Action / Rotate">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
            <g id="Action / Rotate">
              <rect fill="var(--fill-0, white)" fillOpacity="0.2" height="48" rx="24" width="48" />
              <path d={svgPaths.p24b84900} fill="var(--fill-0, white)" id="arrow.triangle.2.circlepath" />
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.5)] h-[121px] left-0 overflow-clip right-0 top-0" data-name="Top Drawer">
        <div className="absolute left-[12px] size-[25px] top-[41px]" data-name="Action / Flash">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <g id="Action / Flash">
              <rect height="24" rx="12" stroke="var(--stroke-0, white)" strokeOpacity="0.75" width="24" x="0.5" y="0.5" />
              <path clipRule="evenodd" d={svgPaths.p32a39700} fill="var(--fill-0, white)" fillRule="evenodd" id="SF Symbol / bolt.fill" />
            </g>
          </svg>
        </div>
        <div className="absolute right-[13px] size-[25px] top-[41px]" data-name="Action / Live Photo">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <g id="Action / Live Photo">
              <path d={svgPaths.p34414f00} fill="var(--fill-0, white)" id="SF Symbol / livephoto" />
            </g>
          </svg>
        </div>
        <div className="-translate-x-1/2 absolute left-1/2 size-[28px] top-[40px]" data-name="Action / Collapse">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
            <g id="Action / Collapse">
              <rect fill="var(--fill-0, white)" fillOpacity="0.2" height="28" rx="14" width="28" />
              <g id="chevron.up">
                <path d={svgPaths.p3fc24000} fill="var(--fill-0, white)" />
                <path d={svgPaths.p19deed00} fill="var(--fill-0, white)" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[121px_0_203px_0]" data-name="Corner Markers">
        <div className="absolute bottom-0 flex items-center justify-center left-0 size-[24px]">
          <div className="flex-none rotate-180">
            <div className="relative size-[24px]" data-name="Icon / corner marker">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="Icon / corner marker">
                  <path d="M0 0H24V1H0V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
                  <path d="M23 0H24V24H23V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center right-0 size-[24px]">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[24px]" data-name="Icon / corner marker">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="Icon / corner marker">
                  <path d="M0 0H24V1H0V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
                  <path d="M23 0H24V24H23V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute right-0 size-[24px] top-0" data-name="Icon / corner marker">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="Icon / corner marker">
              <path d="M0 0H24V1H0V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
              <path d="M23 0H24V24H23V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
            </g>
          </svg>
        </div>
        <div className="absolute flex items-center justify-center left-0 size-[24px] top-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="relative size-[24px]" data-name="Icon / corner marker">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="Icon / corner marker">
                  <path d="M0 0H24V1H0V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
                  <path d="M23 0H24V24H23V0Z" fill="var(--fill-0, white)" fillOpacity="0.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[rgba(0,0,0,0.3)] bottom-[215px] h-[43px] left-[calc(50%-0.5px)] overflow-clip rounded-[100px] w-[157px]" data-name="Zoom">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,0,0,0.6)] left-[calc(50%-57px)] overflow-clip rounded-[100px] size-[25px] top-1/2" data-name="0.5×">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Compact:Semibold',sans-serif] font-[656.2000122070312] justify-center leading-[0] left-[calc(50%-0.5px)] text-[11px] text-center text-white top-[calc(50%-0.5px)] tracking-[0.28px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">0.5</p>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,0,0,0.6)] left-[calc(50%-17px)] overflow-clip rounded-[100px] size-[37px] top-1/2" data-name="1×">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex font-['SF_Compact:Semibold',sans-serif] font-[656.2000122070312] gap-px items-center justify-center leading-[0] left-[calc(50%+0.5px)] text-[#ffd60a] text-[13px] top-[calc(50%+0.5px)] tracking-[0.38px] uppercase" data-name="Zoom Level">
            <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
              <p className="leading-[16px]">1</p>
            </div>
            <div className="flex flex-col h-[12px] justify-end relative shrink-0 w-[8px]">
              <p className="leading-[14px]">×</p>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,0,0,0.6)] left-[calc(50%+23px)] overflow-clip rounded-[100px] size-[25px] top-1/2" data-name="2×">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Compact:Semibold',sans-serif] font-[656.2000122070312] justify-center leading-[0] left-1/2 text-[11px] text-center text-white top-[calc(50%-0.5px)] tracking-[0.28px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">2</p>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,0,0,0.6)] left-[calc(50%+57px)] overflow-clip rounded-[100px] size-[25px] top-1/2" data-name="3×">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Compact:Semibold',sans-serif] font-[656.2000122070312] justify-center leading-[0] left-1/2 text-[11px] text-center text-white top-[calc(50%-0.5px)] tracking-[0.28px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">3</p>
          </div>
        </div>
      </div>
      {liveText && (
        <div className="absolute bottom-[217px] right-[24px] size-[38px]" data-name="Live Text">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
            <g id="Live Text">
              <rect fill="var(--fill-0, black)" fillOpacity="0.6" height="38" rx="19" width="38" />
              <path d={svgPaths.p3e9efe0} fill="var(--fill-0, white)" id="SF Symbol / text.viewfinder" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}