"use client";
import "../page.module.css";
import { toast } from "sonner";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  Target,
  Brain,
  Gamepad2,
  Stars,
  Rocket,
  Wand2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PLAYGROUND_RUN_PATH = "/playground/run";

const SUGGESTIONS = [
  "Make a game where a cat jumps over lasers and collects stars",
  "Make a game where a robot dodges falling meteors to save its battery",
  "Make a game where a dragon jumps over knights and counts how many torches it passes",
  "Make a game where a sheep protects the farm from falling stars",
  "Make a game where a space kid collects moons while avoiding black holes",
  "Make a game where a fox slides left and right to catch donuts and avoid broccoli",
  "Make a game where a penguin dodges ice blocks and grabs fish",
  "Make a game where a cloud catches raindrops but dodges lightning bolts",
  "Make a game where a wizard collects potions while dodging exploding books",
  "Make a game where a tiny rocket flies through gates that move faster each level",
  "Make a game where a turtle must cross the river and avoid floating logs",
  "Make a game where a slime jumps over spikes and collects shiny cubes",
  "Make a game where a panda catches bamboo but avoids spicy peppers",
  "Make a game where a knight collects shields while dodging rolling boulders",
  "Make a game where a bee collects flowers and avoids raindrops",
  "Make a game where a ghost dodges flashlights and collects keys",
  "Make a game where a dinosaur catches eggs falling from the sky",
  "Make a game where a spaceship dodges asteroids and collects fuel cells",
  "Make a game where a jellyfish swims up and down to collect bubbles",
  "Make a game where a robot dog collects bones and avoids puddles",
];

const LOADING_MESSAGES = [
  "Picking a theme that fits your tiny story",
  "Choosing icons for player, items, and danger",
  "Wiring speed, gravity, and spawn rules",
  "Tagging which coding ideas this game practices",
  "Packing everything into your playable lesson config",
];

export default function Chat() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [isSuggestionFading, setIsSuggestionFading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [newisLoading, setnewisLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const suggestionFadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Helper to advance suggestion with a small fade transition
  const advanceSuggestion = () => {
    setIsSuggestionFading(true);

    if (suggestionFadeTimeoutRef.current) {
      clearTimeout(suggestionFadeTimeoutRef.current);
    }

    suggestionFadeTimeoutRef.current = setTimeout(() => {
      setActiveSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);
      setIsSuggestionFading(false);
    }, 260);
  };

  // Auto rotate suggestions while user is not typing
  useEffect(() => {
    if (prompt.trim()) {
      return;
    }

    const intervalId = setInterval(() => {
      advanceSuggestion();
    }, 5200);

    return () => {
      clearInterval(intervalId);
      if (suggestionFadeTimeoutRef.current) {
        clearTimeout(suggestionFadeTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  // Fake progress and redirect once loading starts
  useEffect(() => {
    if (!isLoading || !selectedPrompt) return;

    setProgress(0);
    setLoadingMessageIndex(0);

    const progressId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        const jump = Math.random() * 10;
        return Math.min(prev + jump, 96);
      });
    }, 300);

    const messageId = setInterval(() => {
      setLoadingMessageIndex((prev) =>
        prev + 1 < LOADING_MESSAGES.length ? prev + 1 : prev
      );
    }, 1200);

    const finishId = setTimeout(() => {
      setProgress(100);

      const gameConfig = {
        prompt: selectedPrompt,
        templateHint: "auto",
        createdAt: Date.now(),
      };

      const encoded = encodeURIComponent(JSON.stringify(gameConfig));
      router.push(`${PLAYGROUND_RUN_PATH}?config=${encoded}`);
    }, 4500);

    return () => {
      clearInterval(progressId);
      clearInterval(messageId);
      clearTimeout(finishId);
    };
  }, [isLoading, router, selectedPrompt]);

  const handleSuggestionClick = (s: string | undefined) => {
    if (s == undefined) return;
    setPrompt(s);
    inputRef.current?.focus();
  };

  const handleShuffleSuggestion = () => {
    if (prompt.trim()) return;
    advanceSuggestion();
  };

  //   const handleSubmit = () => {
  //     const trimmed = prompt.trim();
  //     if (!trimmed) return;

  //     console.log("Submitting prompt:", trimmed);

  //     setSelectedPrompt(trimmed);
  //     setIsLoading(true);
  //   };

  const handleSubmit = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      toast.error("Write your game idea first", {
        description:
          "A hero, an action, an item to collect, an obstacle, keep it simple",
      });
      return;
    }

    console.log("Submitting prompt:", trimmed);

    try {
      setnewisLoading(true);
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!res.ok) {
        toast.error("Server error", {
          description: "The engine could not process your idea",
          className:
            "bg-slate-950/90 border border-red-500/40 text-red-300 rounded-xl backdrop-blur-xl shadow-[0_0_22px_rgba(239,68,68,0.35)]",
        });
        return;
      }
      const data = await res.json();

      console.log("Refine API response:", data);

      // If AI says the idea cannot be converted into a simple game
      if (data.status === 0) {
        toast.warning("Idea too vague", {
          description: data.text,
          className:
            "bg-slate-900/85 border border-yellow-400/30 text-yellow-200 rounded-xl backdrop-blur-xl shadow-[0_0_22px_rgba(250,204,21,0.35)]",
        });

        setIsLoading(false);
        setnewisLoading(false);
        //alert(data.text); // show human friendly explanation
        return;
      }

      setnewisLoading(false);

      // If valid game idea
      // Save the refined idea if you want
      // setRefinedPrompt(data.text);
      // setChosenGame(data.chosen_game);

      // Now continue to your loading screen + redirect logic
      // Or whatever code came after old handleSubmit
      //setIsLoading(true); // your existing loading overlay

      // continue your existing pipeline...
      // router.push(...) OR whatever you used previously
    } catch (err) {
      console.error("Error calling refine API:", err);
      //alert("Network error. Please try again.");
    } finally {
      // You can decide whether to end loading or keep it on
      // depending on your pipeline logic
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === "Enter") {
    //   e.preventDefault();
    //   if (!isLoading && prompt.trim()) {
    //     handleSubmit();
    //   }
    // }
  };

  const isLaunchDisabled = isLoading || !prompt.trim();

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 flex flex-col gap-16 lg:flex-row lg:items-center">
        {/* Left text block */}
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-slate-900/60 px-4 py-1 text-sm text-slate-300 backdrop-blur">
            <Sparkles className="w-4 h-4 text-orange-300" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Describe a tiny game and DreamPlay will{" "}
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient-shimmer">
              turn it into a playable lesson
            </span>
          </h1>

          <p className="text-lg text-slate-300">
            A single sentence becomes a full mini game. DreamPlay blends
            imagination and learning so kids play their idea while picking up
            real programming thinking through interactions, rules, and outcomes.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 backdrop-blur-sm">
              <Gamepad2 className="w-4 h-4 text-purple-300" />
              Adaptive engines that match any idea
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-emerald-300" />
              Auto tagged learning concepts
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-orange-300" />
              Ready for classrooms or parents
            </div>
          </div>
        </div>

        {/* Right chat card */}
        <div className="w-full max-w-xl mx-auto lg:mx-0">
          <Card className="relative bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur">
            {/* Top strip */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">
                  Prompt engine live
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Stars className="w-4 h-4 text-yellow-300" />
                <span>Config only, no code needed</span>
              </div>
            </div>

            {/* Suggestion carousel */}
            <div className="px-4 pt-4 space-y-3 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-purple-300" />
                  <span>Suggested ideas for kids</span>
                </div>
                <button
                  type="button"
                  onClick={handleShuffleSuggestion}
                  className=" cursor-pointer inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-100 transition-colors"
                  disabled={isLoading || !!prompt.trim()}
                >
                  <Zap className="w-3 h-3 text-yellow-300" />
                  <span>New idea</span>
                </button>
              </div>

              <div className="relative h-24 cursor-pointer">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    handleSuggestionClick(SUGGESTIONS[activeSuggestionIndex])
                  }
                  className={`group relative w-full h-full text-left text-sm rounded-xl px-4 py-3 border transition-all duration-300 bg-slate-900/70 border-slate-700 hover:border-purple-400/70 hover:bg-slate-800/80 ${
                    isSuggestionFading
                      ? "opacity-0 translate-y-2"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <div className="cursor-pointer pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-purple-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  <span className="cursor-pointer relative block text-slate-100">
                    {SUGGESTIONS[activeSuggestionIndex]}
                  </span>
                  <span className="cursor-pointer relative mt-2 block text-[11px] text-slate-400 group-hover:text-slate-300">
                    Click to copy this idea into the prompt bar
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Hint: Start with who the hero is, what they collect, and what
                they must avoid.
              </p>
            </div>

            {/* Prompt input */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Target className="w-4 h-4 text-emerald-300" />
                <span>Describe your tiny game in one sentence</span>
              </div>

              {/* <div className="relative flex items-center rounded-2xl border border-slate-700 bg-slate-900/80 focus-within:border-purple-500/70 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent outline-none px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
                  placeholder='Example: "Make a game where a cat jumps over lasers and collects stars"'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <div className="h-8 w-px bg-slate-700" />
                <Button
                  type="button"
                  size="icon"
                  onClick={handleSubmit}
                  disabled={isLaunchDisabled || newisLoading}
                  className="cursor-pointer m-1 rounded-xl bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Rocket className="w-5 h-5" />
                </Button>
              </div> */}

              <div className="relative flex items-center rounded-2xl border border-slate-700 bg-slate-900/80 focus-within:border-purple-500/70 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent outline-none px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
                  placeholder='Example: "Make a game where a cat jumps over lasers and collects stars"'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />

                <div className="h-8 w-px bg-slate-700" />

                <div className="flex items-center gap-2 pr-3">
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleSubmit}
                    disabled={isLaunchDisabled || newisLoading}
                    className="cursor-pointer m-1 rounded-xl bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Rocket className="w-5 h-5" />
                  </Button>

                  {newisLoading && (
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  AI will pick the best engine, difficulty, and theme for you
                </span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  Preview only, no account needed
                </span>
              </div>
            </div>

            {/* Concept tags preview */}
            <div className="px-4 pb-4 border-t border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Brain className="w-4 h-4 text-emerald-300" />
                This game will probably touch
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-200">
                  Variables
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-200">
                  Events
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
                  Collisions
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/40 text-sky-200">
                  Win and loss rules
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
                  Conditionals
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Full page loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl transition-opacity">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-500/30 via-orange-500/20 to-emerald-500/20 blur-3xl" />
          </div>

          <Card className="relative z-50 w-full max-w-md bg-slate-950/90 border border-slate-800 rounded-2xl p-6 shadow-[0_0_60px_rgba(59,130,246,0.35)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-purple-500 flex items-center justify-center animate-pulse">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  Building your tiny game
                </div>
                <div className="text-xs text-slate-400">
                  Picking a template, icons, and rules behind the scenes
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Game config progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 via-purple-400 to-emerald-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Animated steps */}
            <div className="space-y-2 mb-4 text-xs text-slate-300">
              {LOADING_MESSAGES.map((msg, index) => {
                const isActive = index === loadingMessageIndex;
                const isDone = index < loadingMessageIndex;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 transition-all ${
                      isDone
                        ? "text-emerald-300"
                        : isActive
                          ? "text-slate-100"
                          : "text-slate-500"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isDone
                          ? "bg-emerald-400"
                          : isActive
                            ? "bg-purple-400 animate-pulse"
                            : "bg-slate-600"
                      }`}
                    />
                    <span>{msg}</span>
                  </div>
                );
              })}
            </div>

            {/* Center spinner and hint */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                <span>Preparing to open the DreamPlay playground</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Next: game plus lesson panel
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
