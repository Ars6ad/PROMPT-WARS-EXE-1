import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { searchParams } = new URL(req.url);
    const workerIdParam = searchParams.get("workerId");

    // If worker, force worker's own id unless admin
    const targetWorkerId = user.role === "worker" ? user.id : (workerIdParam || undefined);
    const skills = serverDb.getSkills(targetWorkerId);

    return NextResponse.json({ success: true, skills });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve skills." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();

    const targetWorkerId = user.role === "worker" ? user.id : (body.workerId || user.id);

    const newSkill = serverDb.addSkill({
      workerId: targetWorkerId,
      title: body.title || body.skillName || "Standard Operating Competency",
      industry: body.industry || user.industry,
      category: body.category || "safety",
      issuer: body.issuer || body.issuingBody || "Apex Workforce Academy",
      issuedDate: body.issuedDate || new Date().toISOString().substring(0, 10),
      expiryDate: body.expiryDate,
      isVerified: false,
      badgeLevel: body.badgeLevel || "foundation",
    });

    return NextResponse.json({ success: true, skill: newSkill });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add skill credential." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!hasRequiredRole(user, ["supervisor", "hr_payroll", "admin"])) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Skill verification requires supervisor or HR role." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { skillId } = body;

    if (!skillId) {
      return NextResponse.json({ success: false, error: "Missing skillId." }, { status: 400 });
    }

    const ok = serverDb.verifySkill(skillId, user.name);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Skill credential not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Skill successfully verified." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify skill credential." },
      { status: 500 }
    );
  }
}
