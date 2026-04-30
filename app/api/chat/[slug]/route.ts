import { NextResponse } from "next/server";

import { createClient } from "@/common/utils/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  const supabase = createClient();
  try {
    const id = params.slug;
    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete message:", error, { id });
      return NextResponse.json(
        { message: "Failed to delete message", details: error.message },
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
