import { cookies } from "next/headers";
import { User, WorkerProfile, UserRole } from "@/types";
import { serverDb } from "@/lib/server/db";

const SESSION_COOKIE_NAME = "fairshift_session";

export interface SessionData {
  userId: string;
  role: UserRole;
  name: string;
}

/**
 * Retrieves the currently authenticated user from server cookies.
 * Defaults to demoWorkerAsha if no session exists, ensuring seamless demo experience.
 */
export async function getAuthenticatedUser(): Promise<User | WorkerProfile> {
  const cookieStore = await cookies();
  const sessionVal = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionVal) {
    const user = serverDb.getUserById(sessionVal);
    if (user) {
      return user;
    }
  }

  // Default to Asha Kumar (Worker - Construction)
  return serverDb.getUserById("worker-asha")!;
}

/**
 * Sets the active session cookie.
 */
export async function setServerSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clears the server session.
 */
export async function clearServerSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Validates whether the user possesses one of the authorized roles.
 */
export function hasRequiredRole(user: User | WorkerProfile, allowedRoles: UserRole[]): boolean {
  if (allowedRoles.includes(user.role)) {
    return true;
  }
  // Org Admin has supervisory & administrative escalation access
  if (user.role === "admin") {
    return true;
  }
  return false;
}
