import { NextResponse } from "next/server";
import { getAuthenticatedUser, hasRequiredRole } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const all = serverDb.getPayQueries();

    // Frontline workers see only their personal queries
    const filtered = user.role === "worker" ? all.filter((q) => q.workerId === user.id) : all;
    return NextResponse.json({ success: true, queries: filtered });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load pay queries." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await req.json();

    const query = serverDb.submitPayQuery({
      workerId: user.id,
      workerName: user.name,
      payslipId: body.payslipId,
      month: body.month || "October 2026",
      category: body.category || "incorrect_overtime",
      description: body.description || "Clarification requested on duty hours.",
    });

    return NextResponse.json({ success: true, query });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit pay query." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!hasRequiredRole(user, ["hr_payroll", "admin"])) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Only HR or Admins can resolve pay queries." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { queryId, response, adjustedAmount } = body;

    const ok = serverDb.resolvePayQuery(
      queryId,
      response,
      user.name,
      adjustedAmount ? Number(adjustedAmount) : undefined
    );

    if (!ok) {
      return NextResponse.json({ success: false, error: "Pay query not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Pay query resolved and audited." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Pay query resolution error." },
      { status: 500 }
    );
  }
}
