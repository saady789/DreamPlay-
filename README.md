DreamPlay
Tiny games for big thinkers

DreamPlay turns a kid’s idea into a tiny playable game and a mini lesson about real programming concepts. Kids type one sentence and DreamPlay builds a full mini game that explains how variables, conditions, speed, collisions, and rules shape everything on screen.

This project is built for kids ages six to twelve. The focus is imagination, instant feedback, and playful learning.

What DreamPlay Does

Kids describe a small game in natural language.
DreamPlay uses AI to turn that idea into:

A complete game config

One of three core engines

A playable mini game

Live lessons that explain what changed and why

The goal is simple. Kids learn real programming thinking by changing numbers, tweaking rules, and watching everything update in real time.

Why This Matters

DreamPlay teaches logic and computational thinking before kids ever touch syntax.
Instead of typing code or dragging blocks, they learn by doing.

Change speed and watch the character move faster

Lower spawn rate and see fewer obstacles

Increase jump height and feel the difference immediately

DreamPlay makes cause and effect visible in a fun, safe environment.

How DreamPlay Works

1. Kids describe a tiny game

They type one simple sentence like:
"Make a game where a ghost dodges flashlights and collects keys."

No code needed. Just imagination.

2. AI turns the idea into a game config

DreamPlay chooses a template that fits the idea:

Jump

Falling

Collect

The AI assigns visuals, speeds, rules, win conditions, and hit logic.

3. Kids tweak sliders and rules

They control values such as:

Speed

Gravity

Jump height

Spawn interval

Number of obstacles

Every change updates the game instantly.
This teaches variables, loops, timing, and event based logic.

4. Live lessons explain what changed

When a kid adjusts a slider, the lesson panel pops in.
It explains the idea in simple, friendly language:

Why movement speed changed

How collisions work

How the win rule is calculated

What the game loop checks every moment

Each game is tagged with programming concepts it uses.

Learning System

DreamPlay highlights how real games are built. Every action teaches something:

Variables

Speed, gravity, jump height, spawn rate, and time.
Kids see how changing numbers changes real behavior.

Events

Key press, game start, game over.
Kids learn that actions cause reactions.

Conditions

If the hero hits an obstacle, you lose.
If you reach the goal, you win.

Loops and repetition

Obstacles keep spawning.
Time keeps increasing.
Movement keeps updating.
Kids feel the logic inside every frame.

Physics and timing

Jump arcs, falling speed, acceleration.
Kids build real world intuition.

Cause and effect

Change one rule and watch the entire game react.
That is the heart of programming.

What Makes DreamPlay Different
Imagination first, code later

Kids use natural language.
DreamPlay handles the logic behind the scenes.
When they are older, Scratch or JavaScript makes more sense because the ideas already feel familiar.

Safe and simple to run

Everything runs in the browser.
No logins, no accounts, no chat, no social features.
It works on Chromebooks, tablets, and family laptops.

Built for learning, not distraction

DreamPlay focuses on logic, not flashy animations.
Kids build a mental model of how systems work.

Tiny Game Examples
Jump and Dodge

Jump over obstacles while collecting stars.
Teaches timing and event based input.

Collect the Stars

Move across the screen and gather items while avoiding danger.
Teaches position and win rules.

Avoid the Falling Blocks

Survive as long as possible while objects fall.
Teaches speed, collisions, and the game loop.

For Kids, Parents, and Teachers
For Kids

Feel like a real game designer. Your idea becomes a game in seconds.

Instant results

No wrong answers

Learn by playing

For Parents

A calm activity with real educational value.

No accounts

No data collection

No ads

For Teachers

Perfect for one class period or a full unit.

Works on school devices

Teaches logic and systems thinking

No student sign in needed

Tech and Architecture

DreamPlay is powered by a simple but flexible architecture designed for fast iteration and real time learning.

Core pieces

Next.js 15 frontend

Clerk for optional auth

Express.js (Bun) backend API

Anthropic Claude for game refinement and lesson generation

Browser based 2D engine for running tiny games

Prisma + PostgreSQL for saving configs and sessions

Cloudflare R2 for storing assets

TailwindCSS for UI

How the engines work

DreamPlay uses three small engines:

Jump

Falling

Collect

Each engine is driven by:

Config objects

Speed variables

Spawn intervals

Collision detection

Win and loss checks

The entire engine is config based.
No dynamic code generation.
Kids change numbers, not code.

AI Pipeline

User prompt

Validation and extraction

Game engine selection

Rule generation

Lesson path generation

Game config returned to frontend

Game rendered instantly

Lessons shown alongside gameplay

Setup and Installation

You can run DreamPlay locally in a few minutes.

1. Clone the repo
   git clone https://github.com/YOUR_USERNAME/dreamplay.git
   cd dreamplay

2. Install dependencies
   npm install

3. Create your environment file

Inside the root folder create a file called .env:

ANTHROPIC_API_KEY="your_api_key_here"

You must add your actual Anthropic key.

4. Start the development server
   npm run dev

Your project will be running locally at:

http://localhost:3000

5. Start the backend server (if separate)
   npm run server

Future Improvements

More engines

More dynamic art styles

Code view mode for older kids

Classroom mode with teacher dashboards

Save and share mini games

License

MIT License. Feel free to remix and build on top of DreamPlay.
