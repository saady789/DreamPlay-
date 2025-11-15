// import { anthropic } from "@/lib/anthropic";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { prompt } = await req.json();

//   const message = await anthropic.messages.create({
//     model: "claude-3-5-sonnet",
//     max_tokens: 200,
//     temperature: 0.4,
//     system: `
// You are DreamPlay Validator.

// Your job:
// 1. Check if the user prompt is a game idea.
// 2. If messy but valid, rewrite it into one clean sentence.
// 3. If unsafe or impossible, return { invalid: true, reason: "..."}.
// 4. Only return valid JSON. No extra text.
// `,
//     messages: [
//       {
//         role: "user",
//         content: `User prompt: "${prompt}".
// Return a JSON like:
// {
//   "invalid": false,
//   "refined": "Make a game where..."
// }`
//       }
//     ],
//   });

//   return NextResponse.json(JSON.parse(message.content[0].text));
// }
