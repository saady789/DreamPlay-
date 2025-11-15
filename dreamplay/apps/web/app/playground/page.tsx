"use client";

import { Card } from "@/components/ui/card";
import { Loader2, Gamepad2, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Playground() {
  useEffect(() => {
    async function loadIcons() {
      try {
        const res = await fetch(
          "https://api.iconify.design/collection?prefix=fluent-emoji-flat"
        );

        const data = await res.json();
        console.log("Full data:", data);

        // categories is like: { "Animals & Nature": ["dog", "cat"], ... }
        const categories = data.categories || {};

        let merged: string[] = [];

        // Loop each category
        for (const categoryName in categories) {
          const arr = categories[categoryName]; // array of icon names
          merged = merged.concat(arr);
        }

        // Remove duplicates just in case
        merged = [...new Set(merged)];

        setIcons(merged);
      } catch (err) {
        console.error("Error fetching icons:", err);
      } finally {
        setLoading(false);
      }
    }

    loadIcons();
  }, []);
  const [icons, setIcons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const configRaw = searchParams.get("config");

  // For iframe testing we will manually swap game src until AI wiring is ready
  const [gameSrc, setGameSrc] = useState(
    "http://localhost:3000/games/falling.html?playerColor=red&playerIcon=https://api.iconify.design/fluent-emoji-flat/dog.svg&blockIcon=https://api.iconify.design/fluent-emoji-flat/rocket.svg"
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col gap-10">
        {/* Lessons panel */}
        <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <h2 className="text-lg font-semibold text-slate-100">
              Your DreamPlay lessons
            </h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Lessons will appear here. These explain how the game works, what
            rules are controlling gameplay, and which programming concepts the
            game teaches.
            <br />
            Each block will come with tiny interactive buttons like
            <span className="text-emerald-300"> “Okay” </span>,
            <span className="text-emerald-300"> “Let me try that!” </span>,
            <span className="text-emerald-300"> “I tested it already.” </span>
          </p>
        </Card>

        {/* Game area */}
        {/* Game area */}
        <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur shadow-2xl mx-auto w-full max-w-5xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-orange-300" />
              <span className="text-sm text-slate-300">Your tiny game</span>
            </div>

            {/* Manual testing buttons */}
            <div className="flex gap-2">
              <button
                className="px-3 py-1 text-xs bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700"
                onClick={() => setGameSrc("/games/jump.html")}
              >
                Test jump
              </button>
              <button
                className="px-3 py-1 text-xs bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700"
                onClick={() => setGameSrc("/games/collect.html")}
              >
                Test collect
              </button>
              <button
                className="px-3 py-1 text-xs bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700"
                onClick={() => setGameSrc("/games/falling.html")}
              >
                Test falling
              </button>
            </div>
          </div>

          {/* Game iframe container */}
          <div className="w-full max-w-[1100px] h-[500px] mx-auto bg-slate-950/90 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.45)] overflow-hidden flex items-center justify-center backdrop-blur">
            {gameSrc ? (
              <iframe
                src={gameSrc}
                className="w-full h-full"
                sandbox="allow-scripts allow-pointer-lock allow-same-origin"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs">Pick a test game above</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
