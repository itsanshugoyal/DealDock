import { createPilotApplicationHandler, createRateLimiter } from "@/lib/pilot/intake.mjs";
import { createPrivateApplicationStore } from "@/lib/pilot/blob-store.mjs";

export const runtime = "nodejs";
export const maxDuration = 30;

const allow = createRateLimiter();
export async function POST(request: Request) {
  const handler = createPilotApplicationHandler({
    configured: Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN),
    store: createPrivateApplicationStore(), allow,
  });
  return handler(request);
}
