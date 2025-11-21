import { anthropic } from "@/lib/anthropic";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    return NextResponse.json({
      message: "server is live",
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Server Not Responding" },
      { status: 500 }
    );
  }
}
