import { createClient } from "@/common/utils/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch messages:", error);
      return NextResponse.json(
        { message: "Failed to fetch messages", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  try {
    const body = await req.json();
    const { error } = await supabase.from("messages").insert([body]);

    if (error) {
      console.error("Failed to insert message:", error, body);
      return NextResponse.json(
        { message: "Failed to insert message", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json("Data saved successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
