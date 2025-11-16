"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Zap,
  Target,
  Brain,
  Code,
  Rocket,
  Shield,
  School,
  ChevronDown,
} from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-green-500 text-transparent bg-clip-text">
            DreamPlay
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("learning")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Learning
            </button>
            <button
              onClick={() => scrollToSection("for-everyone")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              For Everyone
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </button>
            <Button
              onClick={() => (window.location.href = "/chat")}
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold px-6"
            >
              Open Playground
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-orange-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Turn kids ideas into{" "}
                <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
                  real games
                </span>{" "}
                that teach computer programming
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Kids ages 6 to 12 type one idea. DreamPlay turns it into a tiny
                game and shows how variables, conditions, and events shape
                everything on screen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => (window.location.href = "/chat")}
                  size="lg"
                  className=" cursor-pointer bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold px-8 text-lg"
                >
                  Open the Playground
                </Button>
                <Button
                  onClick={() => scrollToSection("learning")}
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  See How Learning Works
                </Button>
              </div>
            </div>

            {/* Mock Interface */}
            <div className="relative">
              <Card className="bg-slate-900 border-slate-800 p-6 rounded-2xl shadow-2xl">
                <div className="mb-4">
                  <div className="text-sm text-slate-400 mb-2">Your Prompt</div>
                  <div className="bg-slate-800 rounded-lg p-3 text-slate-200 border border-slate-700">
                    "Make a game where a cat jumps over lasers and collects
                    stars"
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-orange-900/30 rounded-lg p-8 mb-4 border border-purple-500/20 min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-orange-400 mx-auto mb-2 animate-pulse" />
                    <p className="text-slate-300">Your game appears here</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
                  <div className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Programming Concepts
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                      Variables
                    </span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs border border-orange-500/30">
                      Events
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30">
                      Collisions
                    </span>
                  </div>
                  <div className="text-sm text-slate-300 bg-slate-900/50 rounded p-2 border border-slate-700">
                    <div className="font-medium text-green-400 mb-1">
                      Mission
                    </div>
                    Make the game harder by increasing speed and adding one more
                    obstacle.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ChevronDown className="w-8 h-8 animate-bounce mx-auto" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            How DreamPlay Works
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            From a kid's idea to real learning in four clear steps.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-slate-900 border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Kids describe a tiny game
              </h3>
              <p className="text-slate-400">
                They write one simple sentence in plain language. No code, no
                blocks, just imagination.
              </p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6 rounded-2xl hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-400">
                AI turns it into a game config
              </h3>
              <p className="text-slate-400">
                DreamPlay uses AI to pick a theme, set rules, and configure one
                core game engine that runs in the browser.
              </p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6 rounded-2xl hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Kids tweak sliders and rules
              </h3>
              <p className="text-slate-400">
                They change speed, gravity, jump height, and obstacles. Every
                change updates the game instantly.
              </p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-400">
                Live lessons explain what changed
              </h3>
              <p className="text-slate-400">
                A lesson panel pauses the game and explains what kids just did
                using kid friendly language. It tags each game with ideas like
                variables, events, collisions, conditions, and timing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Kids Learn */}
      <section
        id="learning"
        className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            A playful way to learn{" "}
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 text-transparent bg-clip-text">
              programming concepts
            </span>
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-3xl mx-auto">
            DreamPlay sneaks core programming concepts into fast feedback loops
            that feel like pure play.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6">
              <Code className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-purple-300">
                Variables
              </h3>
              <p className="text-slate-400">
                Speed, gravity, jump height, and number of lives. Kids see that
                changing a number changes behavior.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-6">
              <Zap className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-orange-300">
                Events
              </h3>
              <p className="text-slate-400">
                Key press, game start, game over. Kids learn that actions
                trigger responses.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-6">
              <Target className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-green-300">
                Conditions
              </h3>
              <p className="text-slate-400">
                What happens when the character hits an obstacle and what counts
                as a win or a loss.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6">
              <div className="w-8 h-8 text-purple-400 mb-3 font-bold text-2xl">
                ∞
              </div>
              <h3 className="text-lg font-semibold mb-2 text-purple-300">
                Loops and repetition
              </h3>
              <p className="text-slate-400">
                How motion keeps going, obstacles keep coming, and timers keep
                ticking. The game loop made visible.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-6">
              <Rocket className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-orange-300">
                Physics and timing
              </h3>
              <p className="text-slate-400">
                Jump arcs, falling speed, acceleration. Real world intuition
                mapped to game mechanics.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-6">
              <Brain className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-green-300">
                Cause and effect
              </h3>
              <p className="text-slate-400">
                Change one value and see everything react. The heart of
                computational thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="py-20 px-4 bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Why DreamPlay Helps Kids Learn
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-3xl mx-auto">
            Kids experiment with rules, values, and outcomes. That is the core
            of real programming thinking.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
              <div className="w-14 h-14 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Concept first
              </h3>
              <p className="text-slate-400">
                Kids meet ideas like speed, gravity, spawn rate, and win
                conditions in a visual way long before they ever see JavaScript
                or Python.
              </p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
              <div className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-400">
                Instant feedback
              </h3>
              <p className="text-slate-400">
                Sliders update the game in real time. Kids guess what will
                happen, then test their guess. That loop builds intuition and
                confidence.
              </p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Systems thinking
              </h3>
              <p className="text-slate-400">
                Kids see that one rule can make a game too easy, too hard, or
                broken. They learn to balance a system, not just follow
                instructions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes DreamPlay Different */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            What Makes DreamPlay Different
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-3xl mx-auto">
            Plenty of tools ask kids to copy code or drag blocks. DreamPlay
            trains how a young engineer thinks.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl hover:border-purple-500/40 transition-all">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">
                Imagination first, code later
              </h3>
              <p className="text-slate-400">
                Kids stay in natural language while the engine handles the
                technical side.
              </p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl hover:border-orange-500/40 transition-all">
              <div className="w-16 h-16 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">
                Safe and simple to run
              </h3>
              <p className="text-slate-400">
                All games run in the browser. No accounts, no chat, no social
                layer. Just a clean playground for learning.
              </p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl hover:border-green-500/40 transition-all">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">
                Ready for real courses
              </h3>
              <p className="text-slate-400">
                By the time kids meet a real code editor, variables, conditions,
                and loops are already familiar ideas. Classes can use DreamPlay
                as a gentle on ramp to Scratch, JavaScript, or Python.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* For Everyone */}
      <section
        id="for-everyone"
        className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Built for Kids, Trusted by Adults
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">
                For Kids
              </h3>
              <p className="text-slate-300 mb-4">
                Feel like a game designer, not only a player. Your idea turns
                into a real game in seconds.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Experiment freely with no wrong answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>See results instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Learn by doing, not by reading slides</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">
                For Parents
              </h3>
              <p className="text-slate-300 mb-4">
                A focused activity that feels like play and quietly builds real
                skills for the future.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>No chat or social features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>No accounts or personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>No ads, runs in the browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Educational value in every session</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <School className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">
                For Teachers
              </h3>
              <p className="text-slate-300 mb-4">
                A quick way to introduce computational thinking in a single lab
                period or as a recurring activity.
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>No sign in required for students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Works on Chromebooks and tablets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Fits into existing CS or STEM units</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>
                    Teaches logic and systems thinking, not only tools
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Game Examples */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Tiny Game Examples
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16">
            All built from one core template with different rules and missions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-900 border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 h-48 flex items-center justify-center">
                <Target className="w-20 h-20 text-white/80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Jump and Dodge</h3>
                <p className="text-slate-400 mb-3">
                  Jump over obstacles while collecting points. Perfect for
                  learning about timing and event based input.
                </p>
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                  Teaches timing and jump events
                </span>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all">
              <div className="bg-gradient-to-br from-orange-600 to-yellow-600 h-48 flex items-center justify-center">
                <Sparkles className="w-20 h-20 text-white/80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Collect the Stars</h3>
                <p className="text-slate-400 mb-3">
                  Gather items while avoiding danger. Shows how position,
                  movement, and win conditions work together.
                </p>
                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                  Teaches position and win rules
                </span>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 h-48 flex items-center justify-center">
                <Zap className="w-20 h-20 text-white/80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Avoid the Falling Blocks
                </h3>
                <p className="text-slate-400 mb-3">
                  Stay alive as long as possible. Makes abstract ideas like
                  speed variables and collision detection feel concrete.
                </p>
                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                  Teaches speed and collisions
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Does DreamPlay store kid data?
              </h3>
              <p className="text-slate-300">
                No. DreamPlay runs entirely in the browser. It does not collect
                names, emails, or personal information. Everything stays on the
                device.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">
                Do kids need accounts?
              </h3>
              <p className="text-slate-300">
                No accounts are required. Open the playground, type a prompt,
                and start playing. The first version focuses on the learning
                loop, not on sign up flows.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                How does it teach programming without a code editor?
              </h3>
              <p className="text-slate-300">
                DreamPlay teaches concepts through experimentation. Kids learn
                variables by changing speed, events by pressing keys, and
                conditions by seeing what makes them win or lose. It is learning
                by doing, not by memorizing syntax.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                What age range is this for?
              </h3>
              <p className="text-slate-300">
                Roughly ages six to twelve. Younger kids enjoy the magic of
                ideas turning into games, while older kids start to reason about
                the underlying logic and systems.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">
                Can it be used on tablets and Chromebooks?
              </h3>
              <p className="text-slate-300">
                Yes. DreamPlay runs in any modern web browser. It is friendly
                for school computer labs, Chromebooks, tablets, and home
                devices.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Is this a full course or just a playground?
              </h3>
              <p className="text-slate-300">
                Right now it is a focused playground with guided missions. Kids
                explore freely, while the learning panel points out the
                programming ideas behind each game. All of it is driven by one
                core game template that adapts based on prompts.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-950 to-orange-900/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready for your kid to think like a{" "}
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
              programmer
            </span>
            , not only a player?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            No sign up. No downloads. Just imagination, tiny games, and real
            learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/chat")}
              size="lg"
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold px-12 text-lg"
            >
              Open the Playground
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-green-500 text-transparent bg-clip-text mb-4">
            DreamPlay
          </div>
          <p className="text-slate-400 mb-6">Tiny games for big thinkers.</p>
          <div className="flex justify-center gap-8 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Safety
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <div className="mt-8 text-sm text-slate-500">
            © 2025 DreamPlay. Built for learning, powered by imagination.
          </div>
        </div>
      </footer>
    </div>
  );
}
