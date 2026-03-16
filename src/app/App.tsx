import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { ScanningScreen } from "./components/ScanningScreen";
import { ImpactResultScreen } from "./components/ImpactResultScreen";
import { ImpactResultScreenSustainable } from "./components/ImpactResultScreenSustainable";
import { ProductDetailsScreen } from "./components/ProductDetailsScreen";
import { AlternativesScreen } from "./components/AlternativesScreen";
import { AminaInfoScreen } from "./components/AminaInfoScreen";
import { GratitudeScreen } from "./components/GratitudeScreen";
import { ContinueNotedScreen } from "./components/ContinueNotedScreen";
import { FinalThankYouScreen } from "./components/FinalThankYouScreen";

type Screen =
  | "home"
  | "scanning"
  | "impact-result"
  | "impact-result-sustainable"
  | "amina-info"
  | "product-details"
  | "alternatives"
  | "gratitude-low"
  | "gratitude-alternative"
  | "continue-noted"
  | "final-thanks";

type ScanResultTarget = "impact-result" | "impact-result-sustainable";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [screenHistory, setScreenHistory] = useState<Screen[]>(["home"]);
  const [scanResultTarget, setScanResultTarget] = useState<ScanResultTarget>("impact-result");

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    setScreenHistory((prev) => [...prev, screen]);
  };

  const startScanWithTarget = (target: ScanResultTarget) => {
    setScanResultTarget(target);
    navigateTo("scanning");
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = screenHistory.slice(0, -1);
      setScreenHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
      return;
    }

    setCurrentScreen("home");
    setScreenHistory(["home"]);
  };

  const goHome = () => {
    setCurrentScreen("home");
    setScreenHistory(["home"]);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white h-[100dvh] relative">
      <div className="absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
        {currentScreen === "home" && <HomeScreen onNavigate={navigateTo} onStartScan={startScanWithTarget} />}

        {currentScreen === "scanning" && (
          <ScanningScreen onNavigate={navigateTo} onClose={goHome} resultTarget={scanResultTarget} />
        )}

        {currentScreen === "impact-result" && <ImpactResultScreen onNavigate={navigateTo} onBack={goBack} />}

        {currentScreen === "impact-result-sustainable" && (
          <ImpactResultScreenSustainable onNavigate={navigateTo} onBack={goBack} />
        )}

        {currentScreen === "amina-info" && <AminaInfoScreen onNavigate={navigateTo} onBack={goBack} />}

        {currentScreen === "alternatives" && <AlternativesScreen onNavigate={navigateTo} onBack={goBack} />}

        {currentScreen === "product-details" && <ProductDetailsScreen onNavigate={navigateTo} onBack={goBack} />}

        {currentScreen === "gratitude-low" && <GratitudeScreen variant="low" onNavigate={navigateTo} />}

        {currentScreen === "gratitude-alternative" && (
          <GratitudeScreen variant="alternative" onNavigate={navigateTo} />
        )}

        {currentScreen === "continue-noted" && <ContinueNotedScreen onNavigate={navigateTo} />}

        {currentScreen === "final-thanks" && <FinalThankYouScreen onNavigate={navigateTo} />}
      </div>
    </div>
  );
}
