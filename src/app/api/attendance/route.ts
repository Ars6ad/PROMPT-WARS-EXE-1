import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { searchParams } = new URL(req.url);
    const workerIdParam = searchParams.get("workerId");

    const effectiveWorkerId = user.role === "worker" ? user.id : workerIdParam || undefined;
    const records = serverDb.getAttendance(effectiveWorkerId);

    return NextResponse.json({ success: true, records });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load attendance." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { method, qrToken, siteId } = body;

    const targetSiteId = siteId || user.siteOrDepartmentId;

    // Validate QR code cryptographically if QR method is used
    if (method === "qr_code" && qrToken) {
      const qrCheck = serverDb.verifyQrToken(qrToken, targetSiteId);
      if (!qrCheck.valid) {
        return NextResponse.json(
          {
            success: false,
            error: `QR Code Validation Failed: ${qrCheck.reason}`,
          },
          { status: 400 }
        );
      }
    }

    const result = serverDb.recordCheckIn({
      workerId: user.id,
      workerName: user.name,
      method: method || "qr_code",
      siteId: targetSiteId,
      siteName: user.siteOrDepartmentName,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, record: result.record, message: result.message });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Attendance check-in error." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { action, attendanceId, approved, hoursWorked } = body;

    // Conclude / Check-out
    if (action === "check_out") {
      const result = serverDb.recordCheckOut({
        workerId: user.id,
        hoursWorked: hoursWorked ? Number(hoursWorked) : undefined,
      });
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, record: result.record, message: result.message });
    }

    // Supervisor Overtime Approval
    if (action === "overtime_approval") {
      if (!hasRequiredRole(user, ["supervisor", "admin", "hr_payroll"])) {
        return NextResponse.json(
          { success: false, error: "Unauthorized: Overtime adjudication requires supervisory role." },
          { status: 403 }
        );
      }

      const ok = serverDb.approveOvertime(attendanceId, Boolean(approved), user.name);
      if (!ok) {
        return NextResponse.json({ success: false, error: "Attendance record not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: `Overtime ${approved ? "approved" : "rejected"} successfully.` });
    }

    return NextResponse.json({ success: false, error: "Invalid action." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Attendance update error." },
      { status: 500 }
    );
  }
}
