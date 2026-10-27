import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { searchParams } = new URL(req.url);
    const workerIdParam = searchParams.get("workerId");

    const targetWorkerId = user.role === "worker" ? user.id : (workerIdParam || undefined);
    const alerts = serverDb.getFatigueAlerts(targetWorkerId);

    return NextResponse.json({ success: true, alerts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve fatigue alerts." },
      { status: 500 }
    );
  }
}
