import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const corrections = serverDb.getAttendanceCorrections();
    return NextResponse.json({ success: true, corrections });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load corrections." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();

    const correction = serverDb.submitAttendanceCorrection({
      attendanceRecordId: body.attendanceRecordId || `att-${user.id}-${Date.now()}`,
      workerId: user.id,
      workerName: user.name,
      date: body.date || new Date().toISOString().split("T")[0],
      requestedHours: Number(body.requestedHours) || 8,
      requestedOvertimeHours: Number(body.requestedOvertimeHours) || 0,
      reason: body.reason || "Manual duty hours correction submitted.",
    });

    return NextResponse.json({ success: true, correction });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit correction request." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!hasRequiredRole(user, ["supervisor", "admin", "hr_payroll"])) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Reviewing corrections requires supervisory role." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { correctionId, approved, notes } = body;

    const ok = serverDb.reviewAttendanceCorrection(
      correctionId,
      Boolean(approved),
      user.name,
      notes
    );

    if (!ok) {
      return NextResponse.json({ success: false, error: "Correction record not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Correction request marked ${approved ? "approved" : "rejected"}.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Correction review error." },
      { status: 500 }
    );
  }
}
