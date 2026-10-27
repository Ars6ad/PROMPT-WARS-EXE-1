import { NextResponse } from "next/server";
import { getAuthenticatedUser, setServerSession } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch user session." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required for session switch." },
        { status: 400 }
      );
    }

    const targetUser = serverDb.getUserById(userId);
    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "User account not found." },
        { status: 404 }
      );
    }

    await setServerSession(targetUser.id);
    return NextResponse.json({ success: true, user: targetUser });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Session error." },
      { status: 500 }
    );
  }
}
