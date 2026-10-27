import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/server/auth";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");
    const user = await getAuthenticatedUser();

    const targetSiteId = siteId || user.siteOrDepartmentId;
    const token = serverDb.generateSignedQrToken(targetSiteId);

    return NextResponse.json({ success: true, qr: token });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate QR token." },
      { status: 500 }
    );
  }
}
