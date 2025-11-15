import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";

async function main() {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  const msg = await client.messages.create({
    model: "claude-3-5-sonnet",
    max_tokens: 60,
    messages: [
      { role: "user", content: "Make a tiny game idea about a penguin." },
    ],
  });

  console.log(msg.content[0]?.type, msg.content[0]);
}

main().catch(console.error);
