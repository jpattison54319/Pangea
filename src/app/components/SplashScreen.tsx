export default function SplashScreen() {
  return (
    <div className="bg-[#fff2ed] content-stretch flex flex-col items-center justify-center relative size-full">
      <div className="animate-fade-in">
        {/* Emblem - same as onboarding */}
        <div className="h-[188.374px] w-[187.209px] animate-spin-slow">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 187.209 189.124">
            <g>
              <path
                d="M93.6046 187.874C145.148 187.874 186.959 146.063 186.959 94.5201C186.959 42.9771 145.148 1.16602 93.6046 1.16602C42.0616 1.16602 0.250488 42.9771 0.250488 94.5201C0.250488 146.063 42.0616 187.874 93.6046 187.874Z"
                stroke="#E8B04B"
                strokeWidth="1.25"
                opacity="0.7"
              />
              <path
                d="M93.6046 174.749C137.897 174.749 173.459 139.187 173.459 94.8944C173.459 50.6017 137.897 15.0396 93.6046 15.0396C49.3119 15.0396 13.7498 50.6017 13.7498 94.8944C13.7498 139.187 49.3119 174.749 93.6046 174.749Z"
                fill="#1F6B6B"
              />
              <path
                d="M93.6046 174.749C137.897 174.749 173.459 139.187 173.459 94.8944C173.459 50.6017 137.897 15.0396 93.6046 15.0396"
                stroke="#F7F3EE"
                strokeWidth="1.25"
                opacity="0.55"
              />
              <circle cx="93.6046" cy="94.8944" r="8" fill="#E8B04B" />
              <circle cx="45" cy="120" r="6" fill="#E8B04B" />
              <circle cx="140" cy="75" r="5" fill="#E8B04B" opacity="0.7" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
