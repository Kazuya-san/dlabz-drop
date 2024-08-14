import { NextResponse } from "next/server";
import brackets from "@/utils/brackets.json";

export const GET = async () => {
  return NextResponse.json({
    brackets,
  });
};
