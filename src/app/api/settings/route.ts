import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const settings = serverDb.getPolicySettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load policy settings." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!hasRequiredRole(user, ["admin"])) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Policy modifications require Organization Admin role." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const updated = serverDb.updatePolicySettings(body);

    serverDb.addAuditLog({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      actorName: user.name,
      actorRole: user.role,
      action: "POLICY_SETTINGS_UPDATED",
      targetEntity: "settings",
      targetId: "policy-current",
      notes: "Updated organization overtime multipliers, rest thresholds, and privacy rules.",
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update policy settings." },
      { status: 500 }
    );
  }
}
