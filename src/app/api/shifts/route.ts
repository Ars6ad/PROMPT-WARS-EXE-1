import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";
import { Shift } from "@/types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const workerId = searchParams.get("workerId") || undefined;
    const user = await getAuthenticatedUser();

    // Frontline workers can only query their own shifts
    const effectiveWorkerId = user.role === "worker" ? user.id : workerId;
    const shifts = serverDb.getShifts(effectiveWorkerId);

    return NextResponse.json({ success: true, shifts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load shifts." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!hasRequiredRole(user, ["supervisor", "admin"])) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Only supervisors and administrators can create shifts." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const newShift: Shift = {
      id: `shift-${body.workerId}-${Date.now()}`,
      workerId: body.workerId,
      date: body.date,
      startTime: body.startTime || "09:00",
      endTime: body.endTime || "18:00",
      scheduledHours: body.scheduledHours || 8,
      status: "scheduled",
      siteOrDepartmentName: body.siteOrDepartmentName || user.siteOrDepartmentName,
      supervisorName: user.name,
      isNightShift: Boolean(body.isNightShift),
    };

    const saved = serverDb.createShift(newShift);
    return NextResponse.json({ success: true, shift: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create shift." },
      { status: 500 }
    );
  }
}
