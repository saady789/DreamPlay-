// "use client";

// import { Card } from "@/components/ui/card";
// import { Loader2, Gamepad2, Sparkles } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import Fuse from "fuse.js";
// import {
//   getClosestIcon,
//   getIconUrl,
//   initializeIconSearch,
// } from "../../lib/iconSearch";
// export default function Playground() {
//   const [icons, setIcons] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const configRaw = searchParams.get("config");
//   const [gameSrc, setGameSrc] = useState(
//     "http://localhost:3000/games/collect.html?playerColor=red&playerIcon=https://api.iconify.design/fluent-emoji-flat/dog.svg&blockIcon=https://api.iconify.design/fluent-emoji-flat/rocket.svg"
//   );
//   const [fullConfig, setFullConfig] = useState<any>(null);
//   useEffect(() => {
//     async function loadIcons() {
//       try {
//         const res = await fetch(
//           "https://api.iconify.design/collection?prefix=fluent-emoji-flat"
//         );

//         const data = await res.json();
//         console.log("Full data:", data);

//         // categories is like: { "Animals & Nature": ["dog", "cat"], ... }
//         const categories = data.categories || {};

//         let merged: string[] = [];

//         // Loop each category
//         for (const categoryName in categories) {
//           const arr = categories[categoryName]; // array of icon names
//           merged = merged.concat(arr);
//         }

//         // Remove duplicates just in case
//         merged = [...new Set(merged)];

//         setIcons(merged);
//         initializeIconSearch(merged);
//       } catch (err) {
//         console.error("Error fetching icons:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadIcons();
//   }, []);

//   useEffect(() => {
//     // Must have a config in the URL
//     if (!configRaw) {
//       console.warn("No config found in URL");
//       return;
//     }

//     // Wait until icons are fetched and Fuse is initialized
//     if (loading) {
//       return;
//     }

//     try {
//       const decoded = JSON.parse(decodeURIComponent(configRaw));

//       console.log("==== FULL PLAYGROUND PAYLOAD ====");
//       console.log("raw decoded:", decoded);

//       const engine = decoded.refine.game; // "jump" | "collect" | etc
//       const cfg = { ...decoded.config.config }; // copy so we do not mutate accidentally

//       if (!engine || !cfg) {
//         console.warn("Missing game or config in payload");
//         return;
//       }

//       // Store for debugging or future use
//       setFullConfig({ game: engine, config: cfg });

//       console.log("config BEFORE icon mapping:", cfg);

//       // Any field that ends with "Icon" is passed through Fuse
//       Object.keys(cfg).forEach((key) => {
//         if (key.toLowerCase().endsWith("icon")) {
//           const value = cfg[key as keyof typeof cfg];
//           if (typeof value === "string" && value.trim().length > 0) {
//             const best = getClosestIcon(value);
//             const url = getIconUrl(best);
//             if (url) {
//               cfg[key as keyof typeof cfg] = url as any;
//             }
//           }
//         }
//       });

//       console.log("config AFTER icon mapping:", cfg);

//       // Build query string from all non null config fields
//       const params = new URLSearchParams();
//       Object.entries(cfg).forEach(([key, value]) => {
//         if (value === null || value === undefined) return;
//         params.set(key, String(value));
//       });

//       const finalUrl = `/games/${engine}.html?` + params.toString();

//       console.log("Final iframe URL:", finalUrl);
//       setGameSrc(finalUrl);
//     } catch (err) {
//       console.error("Error decoding config:", err);
//     }
//   }, [configRaw, loading]);

//   return (
//     <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
//       {/* Background glows */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -top-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
//         <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
//       </div>

//       {/* Main container */}
//       <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col gap-10">
//         {/* Lessons panel */}
//         <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur">
//   <div className="flex items-center gap-3 mb-3">
//     <Sparkles className="w-5 h-5 text-purple-300" />
//     <h2 className="text-lg font-semibold text-slate-100">
//       Your DreamPlay lessons
//     </h2>
//   </div>

//   <p className="text-sm text-slate-300 leading-relaxed">
//     Lessons will appear here. These explain how the game works, what
//     rules are controlling gameplay, and which programming concepts the
//     game teaches.
//     <br />
//     Each block will come with tiny interactive buttons like
//     <span className="text-emerald-300"> “Okay” </span>,
//     <span className="text-emerald-300"> “Let me try that!” </span>,
//     <span className="text-emerald-300"> “I tested it already.” </span>
//   </p>
//         </Card>

//         {/* Game area */}
//         {/* Game area */}
//         <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur shadow-2xl mx-auto w-full max-w-5xl">
//           {/* <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-2">
//               <Gamepad2 className="w-5 h-5 text-orange-300" />
//               <span className="text-sm text-slate-300">Your tiny game</span>
//             </div> */}

//           {/* Manual testing buttons */}
//           {/* <div className="flex gap-2">
//               <button
//                 className="px-3 py-1 text-xs bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700"
//                 onClick={() => setGameSrc("/games/jump.html")}
//               >
//                 Test jump
//               </button>
//               <button
//                 className="px-3 py-1 text-xs bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700"
//                 onClick={() => setGameSrc("/games/collect.html")}
//               >
//                 Test collect
//               </button>
//               <button
//                 className="px-3 py-1 text-xs bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700"
//                 onClick={() => setGameSrc("/games/falling.html")}
//               >
//                 Test falling
//               </button>
//             </div>
//           </div> */}

//           {/* Game iframe container */}
//           <div className="w-full max-w-[1100px] h-[500px] mx-auto bg-slate-950/90 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.45)] overflow-hidden flex items-center justify-center backdrop-blur">
//             {gameSrc ? (
//               <iframe
//                 src={gameSrc}
//                 className="w-full h-full"
//                 sandbox="allow-scripts allow-pointer-lock allow-same-origin"
//               />
//             ) : (
//               <div className="flex flex-col items-center gap-3 text-slate-400">
//                 <Loader2 className="w-6 h-6 animate-spin" />
//                 <span className="text-xs">Pick a test game above</span>
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { Card } from "@/components/ui/card";
import { Loader2, Gamepad2, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getClosestIcon,
  getIconUrl,
  initializeIconSearch,
} from "../../lib/iconSearch";

type LessonStep = {
  stepType: string;
  text: string;
  buttons?: { label: string }[];
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

  // Load Iconify collection and initialize Fuse once
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

      console.log("==== FULL PLAYGROUND PAYLOAD ====");
      console.log("raw decoded:", decoded);

      // Figure out which game engine to use
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

      // Figure out the actual config object
      let cfgSource: any = decoded.config;

      // Some payloads use { config: { ... } }
      if (cfgSource && typeof cfgSource === "object" && "config" in cfgSource) {
        cfgSource = (cfgSource as any).config;
      }

      if (!cfgSource || typeof cfgSource !== "object") {
        console.warn("Config is missing or not an object");
        return;
      }

      const cfg: Record<string, unknown> = { ...(cfgSource as object) };

      console.log("config BEFORE icon mapping:", cfg);

      // Any key that ends with "icon" gets mapped to a real Iconify URL
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

      console.log("config AFTER icon mapping:", cfg);

      // Build query string and add a timestamp so iframe always reloads
      const params = new URLSearchParams();
      Object.entries(cfg).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        params.set(key, String(value));
      });
      params.set("_ts", Date.now().toString());

      const finalUrl = `/games/${engine}.html?${params.toString()}`;

      console.log("Final iframe URL:", finalUrl);

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

  const lessons = fullConfig?.lessons;

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
        <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur shadow-2xl mx-auto w-full max-w-5xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-orange-300" />
              <span className="text-sm text-slate-300">
                {fullConfig?.game
                  ? `Your ${fullConfig.game} game`
                  : "Your tiny game"}
              </span>
            </div>
          </div>

          <div className="w-full max-w-[1100px] h-[500px] mx-auto bg-slate-950/90 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.45)] overflow-hidden flex items-center justify-center backdrop-blur">
            {gameSrc ? (
              <iframe
                key={gameSrc}
                src={gameSrc}
                className="w-full h-full"
                sandbox="allow-scripts allow-pointer-lock allow-same-origin"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs">
                  Waiting for a valid game configuration
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
