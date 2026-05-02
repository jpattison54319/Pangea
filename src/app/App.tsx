import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import SplashScreen from "./components/SplashScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import OnboardingTour from "./components/OnboardingTour";
import EnhancedCreateAccount from "./components/EnhancedCreateAccount";
import SignInScreen from "./components/SignInScreen";
import InteractiveHome from "./components/InteractiveHome";
import GlobeZoom from "./components/GlobeZoom";
import VideoReel from "./components/VideoReel";
import EnhancedDailyQuestion from "./components/EnhancedDailyQuestion";
import CameraScreen from "./components/CameraScreen";
import ProfileScreen from "./components/ProfileScreen";
import SearchScreen from "./components/SearchScreen";
import NotificationsScreen from "./components/NotificationsScreen";

import { AppProvider, useApp } from "./components/AppContext";
import TrophyOverlay from "./components/TrophyOverlay";

function Toast() {
  const { toast } = useApp();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          className="absolute bottom-[80px] left-1/2 -translate-x-1/2 bg-[#281e1b] text-white rounded-full px-[16px] py-[10px] z-50 shadow-lg"
        >
          <p className="font-['Inter:Medium',sans-serif] text-[13px]">
            {toast}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AppShell() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <BrowserRouter>
      <div className="relative size-full">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/welcome" replace />}
            />
            <Route
              path="/welcome"
              element={<WelcomeScreen />}
            />
            <Route
              path="/create-account"
              element={<EnhancedCreateAccount />}
            />
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route
              path="/onboarding"
              element={<OnboardingTour />}
            />
            <Route path="/home" element={<InteractiveHome />} />
            <Route
              path="/globe-zoom/:region"
              element={<GlobeZoom />}
            />
            <Route
              path="/reel/:region?"
              element={<VideoReel />}
            />
            <Route
              path="/daily-question"
              element={<EnhancedDailyQuestion />}
            />
            <Route path="/camera" element={<CameraScreen />} />
            <Route
              path="/profile/:userId?"
              element={<ProfileScreen />}
            />
            <Route path="/search" element={<SearchScreen />} />
            <Route
              path="/notifications"
              element={<NotificationsScreen />}
            />
            <Route
              path="*"
              element={<Navigate to="/welcome" replace />}
            />
          </Routes>
        <Toast />
        <TrophyOverlay />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}