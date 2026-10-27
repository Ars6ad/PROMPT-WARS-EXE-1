import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId") || undefined;

    // Server-enforced K-anonymity
    const result = serverDb.getKAnonymousFeedback(siteId);

    return NextResponse.json({ success: true, analytics: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load feedback analytics." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();

    const isAnon = body.isAnonymous !== false; // default true

    const fb = serverDb.submitFeedback({
      industry: body.industry || user.industry,
      siteOrDepartmentId: body.siteOrDepartmentId || user.siteOrDepartmentId,
      safetyRating: Number(body.safetyRating) || 4,
      supervisorRespectRating: Number(body.supervisorRespectRating) || 4,
      workloadRating: Number(body.workloadRating) || 3,
      payClarityRating: Number(body.payClarityRating) || 4,
      restAndBreaksRating: Number(body.restAndBreaksRating) || 3,
      enoughRestBetweenShifts: Boolean(body.enoughRestBetweenShifts),
      safeRaisingConcerns: Boolean(body.safeRaisingConcerns),
      understandsPay: Boolean(body.understandsPay),
      comments: body.comments,
      isAnonymous: isAnon,
      workerId: isAnon ? undefined : user.id,
    });

    return NextResponse.json({ success: true, feedback: fb });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Feedback submission error." },
      { status: 500 }
    );
  }
}
