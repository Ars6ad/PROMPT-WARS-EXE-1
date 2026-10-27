import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";
import { SafetyStatus } from "@/types";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const reports = serverDb.getSafetyReports(user.role !== "worker");
    return NextResponse.json({ success: true, reports });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load safety reports." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();

    const isAnon = Boolean(body.isAnonymous);

    const report = serverDb.submitSafetyReport({
      title: body.title || "Hazard Incident",
      description: body.description || "Unsafe condition observed on site.",
      hazardCategory: body.hazardCategory || "missing_ppe",
      severity: body.severity || "high",
      industry: body.industry || user.industry,
      siteOrDepartmentName: body.siteOrDepartmentName || user.siteOrDepartmentName,
      isAnonymous: isAnon,
      // Ingress identity stripping
      workerId: isAnon ? undefined : user.id,
      workerName: isAnon ? undefined : user.name,
      voiceNoteAttached: Boolean(body.voiceNoteAttached),
      voiceTranscription: body.voiceTranscription,
      photoAttached: Boolean(body.photoAttached),
      photoUrl: body.photoUrl,
    });

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Safety report submission error." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();
    const { action, reportId, status, owner, resolutionNote, correctiveActions, workerConfirmed, feedback } = body;

    // Worker Ground Verification
    if (action === "worker_verify") {
      const ok = serverDb.verifySafetyResolution(reportId, Boolean(workerConfirmed), feedback);
      if (!ok) {
        return NextResponse.json({ success: false, error: "Report not found." }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: workerConfirmed ? "Resolution verified as effective." : "Incident reopened for additional action.",
      });
    }

    // Safety Officer / Admin Triage
    if (!hasRequiredRole(user, ["safety_officer", "supervisor", "admin"])) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Triage requires Safety Officer or Admin role." },
        { status: 403 }
      );
    }

    const ok = serverDb.updateSafetyStatus(
      reportId,
      status as SafetyStatus,
      user.name,
      owner,
      resolutionNote,
      correctiveActions
    );

    if (!ok) {
      return NextResponse.json({ success: false, error: "Report not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Report status updated to ${status}.` });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Safety report triage error." },
      { status: 500 }
    );
  }
}
