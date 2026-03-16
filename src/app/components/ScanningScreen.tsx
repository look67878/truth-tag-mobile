import { Camera, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ScanResultTarget = "impact-result" | "impact-result-sustainable";
type BarcodeDetectorWindow = Window & {
  BarcodeDetector?: {
    new (options?: { formats?: string[] }): {
      detect: (image: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
    };
    getSupportedFormats?: () => Promise<string[]>;
  };
};

interface ScanningScreenProps {
  onNavigate: (screen: string) => void;
  onClose: () => void;
  resultTarget: ScanResultTarget;
}

const BARCODE_FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"];

export function ScanningScreen({ onNavigate, onClose, resultTarget }: ScanningScreenProps) {
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [detected, setDetected] = useState(false);
  const [statusText, setStatusText] = useState("Waiting for camera");
  const [detectorSupported, setDetectorSupported] = useState(true);
  const [scannerUnavailable, setScannerUnavailable] = useState(false);
  const [successFlash, setSuccessFlash] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<{ detect: (image: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>> } | null>(null);
  const rafRef = useRef<number | null>(null);
  const scanBusyRef = useRef(false);
  const lastScanTsRef = useRef(0);
  const detectFailureCountRef = useRef(0);

  const isReadyForScan = cameraReady || demoMode;

  const playBeep = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
      const now = audioContext.currentTime;
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      gainNode.gain.setValueAtTime(0.0001, now);

      const beep = (startAt: number, freq: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, startAt);
        oscillator.connect(gainNode);

        gainNode.gain.setValueAtTime(0.0001, startAt);
        gainNode.gain.exponentialRampToValueAtTime(0.5, startAt + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

        oscillator.start(startAt);
        oscillator.stop(startAt + duration + 0.01);
      };

      beep(now, 1450, 0.12);
      beep(now + 0.17, 1750, 0.13);

      window.setTimeout(() => {
        void audioContext.close();
      }, 450);
    } catch {
      // Silent fallback if audio context is unavailable.
    }
  }, []);

  const triggerVibration = useCallback(() => {
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([170, 140, 190]);
      }
    } catch {
      // Ignore vibration errors on unsupported devices.
    }
  }, []);

  const handleDetected = useCallback(
    (value?: string) => {
      if (detected) {
        return;
      }

      setDetected(true);
      setStatusText(value ? `Barcode detected: ${value}` : "Barcode detected");
      setSuccessFlash(true);
      playBeep();
      triggerVibration();
      window.setTimeout(() => setSuccessFlash(false), 260);

      window.setTimeout(() => {
        onNavigate(resultTarget);
      }, 400);
    },
    [detected, onNavigate, playBeep, resultTarget, triggerVibration],
  );

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const initBarcodeDetector = useCallback(async () => {
    const detectorApi = (window as BarcodeDetectorWindow).BarcodeDetector;

    if (!detectorApi) {
      detectorRef.current = null;
      setDetectorSupported(false);
      return;
    }

    try {
      const supportedFormats = (await detectorApi.getSupportedFormats?.()) ?? BARCODE_FORMATS;
      const formats = BARCODE_FORMATS.filter((fmt) => supportedFormats.includes(fmt));
      detectorRef.current = new detectorApi({ formats: formats.length > 0 ? formats : BARCODE_FORMATS });
      setDetectorSupported(true);
    } catch {
      detectorRef.current = null;
      setDetectorSupported(false);
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("This browser does not support camera access.");
        return;
      }

      setCameraError(null);
      setCameraReady(false);
      setDetected(false);
      setScannerUnavailable(false);
      detectFailureCountRef.current = 0;
      setStatusText("Requesting camera permission...");
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setDemoMode(false);
      setCameraReady(true);
      setStatusText(detectorRef.current ? "Point barcode inside frame" : "Automatic barcode scanning is not available on this browser.");
    } catch {
      setCameraError("Camera permission is blocked. Please allow camera access and tap Enable Camera.");
      setCameraReady(false);
      setStatusText("Waiting for camera");
    }
  }, [stopCamera]);

  const detectCodes = useCallback(async (video: HTMLVideoElement) => {
    if (!detectorRef.current) {
      return [];
    }

    try {
      return await detectorRef.current.detect(video);
    } catch {
      if (!("createImageBitmap" in window)) {
        throw new Error("ImageBitmap fallback is unavailable.");
      }

      const bitmap = await createImageBitmap(video);

      try {
        return await detectorRef.current.detect(bitmap);
      } finally {
        bitmap.close();
      }
    }
  }, []);

  const scanFrame = useCallback(
    async (timestamp: number) => {
      if (!cameraReady || detected || demoMode) {
        return;
      }

      if (!videoRef.current || !detectorRef.current) {
        rafRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      const video = videoRef.current;

      if (video.readyState < 2) {
        rafRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      if (scanBusyRef.current || timestamp - lastScanTsRef.current < 160) {
        rafRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      scanBusyRef.current = true;
      lastScanTsRef.current = timestamp;

      try {
        const barcodes = await detectCodes(video);
        detectFailureCountRef.current = 0;
        if (barcodes.length > 0) {
          handleDetected(barcodes[0].rawValue);
          scanBusyRef.current = false;
          return;
        }
      } catch {
        detectFailureCountRef.current += 1;

        if (detectFailureCountRef.current >= 3) {
          setScannerUnavailable(true);
          setStatusText("Automatic barcode scanning is not available on this browser.");
        } else {
          setStatusText("Scanning camera stream...");
        }
      }

      scanBusyRef.current = false;
      rafRef.current = requestAnimationFrame(scanFrame);
    },
    [cameraReady, demoMode, detectCodes, detected, handleDetected],
  );

  useEffect(() => {
    void initBarcodeDetector();
    void startCamera();

    return () => {
      stopCamera();
    };
  }, [initBarcodeDetector, startCamera, stopCamera]);

  useEffect(() => {
    if (!cameraReady || detected || demoMode) {
      return;
    }

    if (!detectorRef.current) {
      setScannerUnavailable(true);
      setStatusText("Barcode detector not supported on this browser.");
      return;
    }

    rafRef.current = requestAnimationFrame(scanFrame);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [cameraReady, demoMode, detected, scanFrame]);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleContinueWithoutCamera = () => {
    stopCamera();
    setDemoMode(true);
    setScannerUnavailable(false);
    setCameraError(null);
    setDetected(false);
    setStatusText("Demo mode: tap 'Simulate Barcode Scan' to continue");
  };

  const showOverlay = !isReadyForScan;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted autoPlay />
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
            successFlash ? "opacity-100 bg-green-400/35" : "opacity-0 bg-transparent"
          }`}
        />

        {demoMode && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-800/80 flex items-center justify-center px-6 text-center">
            <div>
              <p className="text-white font-medium">Demo mode is active</p>
              <button
                onClick={() => handleDetected("SIMULATED-BARCODE")}
                className="mt-4 h-11 px-5 rounded-xl text-white font-medium"
                style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
              >
                Simulate Barcode Scan
              </button>
            </div>
          </div>
        )}

        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center px-6 text-center">
            <div>
              <Camera className="w-12 h-12 text-white/80 mx-auto mb-4" />
              <p className="text-white/90 font-medium">Enable camera to scan barcode</p>
              {cameraError && <p className="text-white/70 text-sm mt-2">{cameraError}</p>}
              {!detectorSupported && (
                <p className="text-white/70 text-sm mt-2">This browser may not support automatic barcode detection.</p>
              )}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    void startCamera();
                  }}
                  className="h-11 px-5 rounded-xl text-white font-medium"
                  style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
                >
                  Enable Camera
                </button>
                <button
                  onClick={handleContinueWithoutCamera}
                  className="h-11 px-5 rounded-xl text-white/90 font-medium border border-white/40 bg-white/10"
                >
                  Continue Without Camera
                </button>
              </div>
            </div>
          </div>
        )}

        {!showOverlay && scannerUnavailable && !demoMode && (
          <div className="absolute inset-x-6 top-24 z-10 rounded-2xl border border-white/20 bg-black/55 px-4 py-4 text-center backdrop-blur-sm">
            <p className="text-sm font-medium text-white">This browser can open the camera, but it cannot scan barcodes automatically.</p>
            <button
              onClick={handleContinueWithoutCamera}
              className="mt-3 h-10 px-4 rounded-xl text-white/90 font-medium border border-white/40 bg-white/10"
            >
              Use Demo Scan Instead
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
        <div className="relative w-full max-w-sm aspect-square">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 rounded-tl-3xl" style={{ borderColor: "white" }} />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 rounded-tr-3xl" style={{ borderColor: "white" }} />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 rounded-bl-3xl" style={{ borderColor: "white" }} />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 rounded-br-3xl" style={{ borderColor: "white" }} />

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--eco-accent)] to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
          <div className={`w-2 h-2 rounded-full ${detected ? "bg-green-400" : "bg-white animate-pulse"}`} />
          <span className="text-white font-medium">{detected ? "Barcode recognized" : statusText}</span>
        </div>
      </div>
    </div>
  );
}
