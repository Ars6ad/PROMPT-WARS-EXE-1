import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!hasRequiredRole(user, ["admin", "hr_payroll", "safety_officer", "supervisor"])) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Access restricted to authorized workforce officers." },
        { status: 403 }
      );
    }

    const logs = serverDb.getAuditLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve audit logs." },
      { status: 500 }
    );
  }
}
