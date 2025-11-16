"use client";

import { Card } from "@/components/ui/card";
import { Loader2, Gamepad2, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getClosestIcon,
  getIconUrl,
  initializeIconSearch,
} from "../../lib/iconSearch";

type LessonStep = {
  stepType: string;
  text: string;
  buttons?: string[];
};

type RawPayload = {
  game?: string;
  config?: any;
  refine?: {
    chosen_game?: string;
    game?: string;
  };
  lessons?: LessonStep[];
  createdAt?: number;
  [key: string]: unknown;
};

export default function Playground() {
  const searchParams = useSearchParams();
  const configRaw = searchParams.get("config");

  const [loadingIcons, setLoadingIcons] = useState(true);
  const [gameSrc, setGameSrc] = useState<string | null>(null);
  const [fullConfig, setFullConfig] = useState<{
    game: string;
    config: Record<string, unknown>;
    lessons?: LessonStep[];
  } | null>(null);

  // lesson state
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(
    null
  );
  const [lessonVisible, setLessonVisible] = useState(false);
  const [hasShownLesson, setHasShownLesson] = useState(false);
  const [betweenLessons, setBetweenLessons] = useState(false);
  const lessonTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lessons: LessonStep[] = fullConfig?.lessons ?? [];

  function clearLessonTimer() {
    if (lessonTimerRef.current) {
      clearTimeout(lessonTimerRef.current);
      lessonTimerRef.current = null;
    }
  }

  // Show a given lesson index, with auto advance only for steps that have no buttons
  function showLesson(index: number | null) {
    clearLessonTimer();
    setBetweenLessons(false);

    if (index === null || index < 0 || index >= lessons.length) {
      setCurrentLessonIndex(null);
      setLessonVisible(false);
      return;
    }

    const step = lessons[index];
    const stepType = step?.stepType;
    const hasRealButtons = !!step?.buttons && step.buttons.length > 0;
    const hasSyntheticButtons = stepType === "intro" || stepType === "outro";
    const hasButtons = hasRealButtons || hasSyntheticButtons;

    setCurrentLessonIndex(index);
    setLessonVisible(true);
    setHasShownLesson(true);

    // Only auto advance if there are truly no buttons
    if (!hasButtons) {
      lessonTimerRef.current = setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex >= lessons.length) {
          showLesson(null);
        } else {
          showLesson(nextIndex);
        }
      }, 15000);
    }
  }

  // When user clicks a lesson button
  function handleLessonButtonClick(btnIndex: number) {
    if (currentLessonIndex === null) return;
    const step = lessons[currentLessonIndex];
    const isLast = currentLessonIndex >= lessons.length - 1;
    const isIntro = step?.stepType === "intro";
    const isOutro = step?.stepType === "outro";

    // Primary button, always index 0
    if (btnIndex === 0) {
      setLessonVisible(false);
      clearLessonTimer();

      // Outro or final step: stop lessons and show finished copy
      if (isOutro || isLast) {
        setBetweenLessons(false);
        showLesson(null);
        return;
      }

      // Intro and normal tips: give a play gap, then next lesson
      const nextIndex = currentLessonIndex + 1;
      setBetweenLessons(true);
      const capturedNext = nextIndex;
      lessonTimerRef.current = setTimeout(() => {
        showLesson(capturedNext);
      }, 15000);
      return;
    }

    // Secondary button: skip waiting, go straight to next lesson
    if (btnIndex === 1) {
      clearLessonTimer();
      setBetweenLessons(false);
      if (!isLast) {
        showLesson(currentLessonIndex + 1);
      } else {
        showLesson(null);
      }
    }
  }

  // Load icon collection and initialize search
  useEffect(() => {
    async function loadIcons() {
      try {
        const res = await fetch(
          "https://api.iconify.design/collection?prefix=fluent-emoji-flat"
        );

        const data = await res.json();
        const categories = data.categories || {};
        let merged: string[] = [];

        for (const categoryName in categories) {
          const arr = categories[categoryName] as string[];
          merged = merged.concat(arr);
        }

        merged = [...new Set(merged)];
        initializeIconSearch(merged);
      } catch (err) {
        console.error("Error fetching icons:", err);
      } finally {
        setLoadingIcons(false);
      }
    }

    loadIcons();
  }, []);

  // Decode config from URL and build iframe src
  useEffect(() => {
    if (!configRaw) {
      console.warn("No config found in URL");
      return;
    }

    if (loadingIcons) {
      return;
    }

    try {
      const decodedString = decodeURIComponent(configRaw);
      const decoded: RawPayload = JSON.parse(decodedString);

      let engine: string | undefined = decoded.game;
      if (!engine && decoded.refine?.chosen_game) {
        engine = decoded.refine.chosen_game;
      }
      if (!engine && decoded.refine?.game) {
        engine = decoded.refine.game;
      }

      if (!engine) {
        console.warn("No game engine found in payload");
        return;
      }

      let cfgSource: any = decoded.config;
      if (cfgSource && typeof cfgSource === "object" && "config" in cfgSource) {
        cfgSource = (cfgSource as any).config;
      }

      if (!cfgSource || typeof cfgSource !== "object") {
        console.warn("Config is missing or not an object");
        return;
      }

      const cfg: Record<string, unknown> = { ...(cfgSource as object) };

      Object.keys(cfg).forEach((key) => {
        if (key.toLowerCase().endsWith("icon")) {
          const value = cfg[key];
          if (typeof value === "string" && value.trim().length > 0) {
            const best = getClosestIcon(value);
            const url = getIconUrl(best);
            if (url) {
              cfg[key] = url;
            }
          }
        }
      });

      const params = new URLSearchParams();
      Object.entries(cfg).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        params.set(key, String(value));
      });
      params.set("_ts", Date.now().toString());

      const finalUrl = `/games/${engine}.html?${params.toString()}`;

      // Reset lesson state for a fresh game session
      clearLessonTimer();
      setHasShownLesson(false);
      setBetweenLessons(false);
      setLessonVisible(false);
      setCurrentLessonIndex(null);

      setFullConfig({
        game: engine,
        config: cfg,
        lessons: decoded.lessons,
      });
      setGameSrc(finalUrl);
    } catch (err) {
      console.error("Error decoding config:", err);
    }
  }, [configRaw, loadingIcons]);

  // Start with the intro step when lessons arrive
  useEffect(() => {
    if (lessons.length === 0) return;
    showLesson(0);
    return clearLessonTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons.length]);

  // Which lesson is currently visible
  const currentStep =
    lessonVisible && currentLessonIndex !== null
      ? lessons[currentLessonIndex]
      : null;

  const currentStepButtons =
    currentStep && currentStep.buttons && currentStep.buttons.length > 0
      ? currentStep.buttons
      : currentStep?.stepType === "intro"
        ? ["Lets play"]
        : currentStep?.stepType === "outro"
          ? ["Thanks, got it"]
          : [];

  const gameDimmed = !!currentStep && lessonVisible;

  const showIdleIntro = !currentStep && !hasShownLesson;
  const showBetweenCopy = !currentStep && hasShownLesson && betweenLessons;
  const showFinishedCopy = !currentStep && hasShownLesson && !betweenLessons;

  return (
    <>
      <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
        {/* background glow similar to hero */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-64 -left-32 w-[520px] h-[520px] bg-gradient-to-br from-fuchsia-600/35 via-purple-700/25 to-sky-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-72 right-0 w-[640px] h-[640px] bg-gradient-to-tr from-orange-500/25 via-pink-500/15 to-purple-700/25 rounded-full blur-3xl" />
        </div>

        {/* main column */}
        <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col gap-10">
          {/* Lessons panel */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-[#020617]/95 via-[#020617]/95 to-[#020617]/95 border border-slate-800/80 rounded-3xl px-6 py-5 shadow-[0_0_60px_rgba(15,23,42,0.85)]">
            {/* particle dust layer */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="dp-particle" />
              <div className="dp-particle dp-p2" />
              <div className="dp-particle dp-p3" />
              <div className="dp-particle dp-p4" />
            </div>

            {/* animated glow inside lessons card */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -left-8 w-64 h-64 rounded-full bg-sky-500/18 blur-3xl animate-dp-orbit-soft" />
              <div className="absolute -bottom-28 right-0 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl animate-dp-orbit-soft-delayed" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/40 via-emerald-400/40 to-violet-500/40 blur-md opacity-70" />
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 border border-sky-400/70">
                      <Sparkles className="w-4 h-4 text-sky-300" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-base font-semibold tracking-tight dp-shimmer">
                      Your DreamPlay lessons
                    </h2>
                    <p className="text-xs text-slate-400">
                      Tiny AI hints that pause your game, explain the rules,
                      then let you play again.
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-[11px] text-sky-200/80">
                  <span className="inline-flex h-6 items-center rounded-full border border-sky-500/40 bg-sky-500/15 px-3 font-medium">
                    Live teaching
                  </span>
                </div>
              </div>

              {/* dynamic lesson content, fixed height so page never jumps */}
              <div className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 backdrop-blur-sm shadow-inner h-[150px] flex items-stretch">
                {currentStep && (
                  <div className="w-full flex flex-col animate-dp-fade-in dp-slide">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300 mb-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 border border-sky-400/50 px-3 py-1 dp-lesson-chip">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                        {currentStep.stepType === "intro"
                          ? "Intro"
                          : currentStep.stepType === "outro"
                            ? "Wrap up"
                            : "Tip"}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        DreamPlay is teaching live
                      </span>
                    </div>

                    {/* <div className="text-sm text-slate-50 leading-relaxed whitespace-pre-line flex-1 overflow-y-auto pr-1">
                      {currentStep.text}
                    </div> */}
                    <div className="text-sm text-slate-50 leading-relaxed whitespace-pre-line flex-1 overflow-y-auto pr-1 dp-type">
                      {currentStep.text}
                    </div>

                    {currentStepButtons.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {currentStepButtons.map((label, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLessonButtonClick(idx)}
                            className={
                              idx === 0
                                ? "cursor-pointer px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-400 text-slate-950 text-xs font-semibold shadow-md shadow-sky-500/40 hover:brightness-110 transition-transform duration-150 hover:-translate-y-[1px]"
                                : "cursor-pointer px-4 py-2 rounded-xl border border-slate-600 text-slate-100 text-xs hover:bg-slate-800/80 transition-colors"
                            }
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {showIdleIntro && (
                  <div className="w-full flex flex-col justify-center text-sm text-slate-200 leading-relaxed animate-dp-fade-in">
                    <span className="font-medium text-sky-200">
                      When you start a new game,
                    </span>{" "}
                    DreamPlay keeps the world frozen and explains what it is
                    about to do. Tap the first lesson button to wake the game
                    and let it run. After a short play break, your first live
                    tip will pop in.
                  </div>
                )}

                {showBetweenCopy && (
                  <div className="w-full flex items-center justify-between gap-4 text-xs text-slate-200 animate-dp-fade-in">
                    <div>
                      <span className="font-medium text-sky-200">
                        DreamPlay is watching your moves.
                      </span>{" "}
                      Keep playing. Your next tip will arrive after a short play
                      window.
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
                      <span>Next lesson loading</span>
                    </div>
                  </div>
                )}

                {showFinishedCopy && (
                  <div className="w-full flex flex-col justify-center text-sm text-slate-200 leading-relaxed animate-dp-fade-in">
                    <span className="font-medium text-emerald-300">
                      Lessons finished.
                    </span>{" "}
                    You now know how speed, gravity, and rules control this tiny
                    game. Tweak sliders, break things, and see what new versions
                    of the game you can invent.
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Game area */}
          <Card className="relative overflow-hidden bg-[#020617]/95 border border-slate-800/80 rounded-3xl p-4 backdrop-blur-md shadow-[0_0_70px_rgba(15,23,42,0.9)] mx-auto w-full max-w-5xl">
            {/* soft animated border glow behind the card */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-[-1px] rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.16),transparent_55%)] opacity-70 animate-dp-panel-glow" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500/80 to-amber-400/80 text-slate-950 shadow-md">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-200">
                      {fullConfig?.game
                        ? `Your ${fullConfig.game} game`
                        : "Your tiny game"}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Live game view
                    </span>
                  </div>
                </div>

                {gameDimmed && (
                  <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-900/80 px-3 py-1 text-[11px] text-sky-100 shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                    Paused for a DreamPlay tip
                  </span>
                )}
              </div>

              <div className="relative w-full max-w-[1100px] h-[450px] mx-auto rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden bg-slate-950/90 dp-breathe-ring">
                <div
                  className={
                    gameDimmed
                      ? "w-full h-full opacity-35 transition-opacity duration-200"
                      : "w-full h-full opacity-100 transition-opacity duration-200"
                  }
                >
                  {gameSrc ? (
                    <iframe
                      key={gameSrc}
                      src={gameSrc}
                      className="w-full h-full"
                      sandbox="allow-scripts allow-pointer-lock allow-same-origin"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-400 h-full justify-center">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="text-xs">
                        Waiting for a valid game configuration
                      </span>
                    </div>
                  )}
                </div>

                {gameDimmed && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="rounded-2xl bg-slate-900/80 px-5 py-2 border border-sky-500/40 shadow-xl">
                      <span className="text-[11px] text-sky-100">
                        DreamPlay has paused the game to show a tip.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* global animation for lesson panel and game glow */}
      <style jsx global>{`
        @keyframes dp-fade-in {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-dp-fade-in {
          animation: dp-fade-in 0.22s ease-out forwards;
        }

        @keyframes dp-orbit-soft {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate3d(12px, -8px, 0) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.7;
          }
        }
        .animate-dp-orbit-soft {
          animation: dp-orbit-soft 9s ease-in-out infinite;
        }
        .animate-dp-orbit-soft-delayed {
          animation: dp-orbit-soft 11s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        @keyframes dp-panel-glow {
          0% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.95;
          }
          100% {
            opacity: 0.45;
          }
        }
        .animate-dp-panel-glow {
          animation: dp-panel-glow 9s ease-in-out infinite;
        }

        @keyframes dp-breathe-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.18);
          }
          50% {
            box-shadow: 0 0 34px 0 rgba(56, 189, 248, 0.45);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.18);
          }
        }
        .dp-breathe-ring {
          animation: dp-breathe-ring 6.5s ease-in-out infinite;
        }

        @keyframes dp-typing {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes dp-slide-up {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dp-slide {
          animation: dp-slide-up 0.35s ease-out;
        }

        @keyframes dp-lesson-glow {
          0% {
            box-shadow: 0 0 0 rgba(56, 189, 248, 0.15);
          }
          50% {
            box-shadow: 0 0 16px rgba(56, 189, 248, 0.35);
          }
          100% {
            box-shadow: 0 0 0 rgba(56, 189, 248, 0.15);
          }
        }

        .dp-lesson-chip {
          animation: dp-lesson-glow 3.5s ease-in-out infinite;
        }

        @keyframes dp-shimmer {
          0% {
            background-position: -200%;
          }
          100% {
            background-position: 200%;
          }
        }
        .dp-shimmer {
          background: linear-gradient(
            90deg,
            rgba(56, 189, 248, 0.5),
            rgba(16, 185, 129, 0.5),
            rgba(99, 102, 241, 0.5)
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          animation: dp-shimmer 2.5s linear infinite;
        }

        @keyframes dp-dust {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-60px) translateX(20px);
            opacity: 0;
          }
        }

        .dp-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          top: 80%;
          left: 30%;
          animation: dp-dust 6s linear infinite;
        }

        .dp-p2 {
          left: 55%;
          animation-delay: 1.2s;
          animation-duration: 7s;
        }
        .dp-p3 {
          left: 15%;
          animation-delay: 2s;
          animation-duration: 8s;
        }
        .dp-p4 {
          left: 70%;
          animation-delay: 3s;
          animation-duration: 6.5s;
        }

        .dp-type {
          animation: dp-typing 1.2s steps(35) forwards;
        }
      `}</style>
    </>
  );
}
