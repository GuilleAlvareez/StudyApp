import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, content, rating } = body;

  if (!content || !rating) {
    return NextResponse.json(
      { error: "Missing content or rating" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error: dbError } = await supabase.from("review").insert({
    name: name || null,
    content,
    rating,
  });

  if (dbError) {
    return NextResponse.json(
      { error: dbError.message, details: dbError },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
