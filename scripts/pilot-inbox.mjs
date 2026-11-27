import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { get, list } from "@vercel/blob";

// Owner-only local operations. This script is never copied into the website.
// An explicit expected store keeps account-specific exports from being mixed.
const expectedStore = process.argv[2] || "store_gVbObWGTY95X9xIQ";
assert.match(expectedStore, /^store_[A-Za-z0-9]+$/, "Pass a valid expected Blob store ID");
assert.equal(process.env.BLOB_STORE_ID, expectedStore, "Load the environment for the expected DealDock pilot application store");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, ".pilot-data", expectedStore);
await mkdir(directory, { recursive: true });
let cursor;
let count = 0;
do {
  const page = await list({ prefix: "pilot-applications/", limit: 100, cursor });
  for (const blob of page.blobs) {
    if (!/^pilot-applications\/[0-9a-f-]{36}\.json$/i.test(blob.pathname)) continue;
    const result = await get(blob.pathname, { access: "private", useCache: false });
    if (result?.statusCode !== 200) throw new Error("An application could not be read");
    const application = await new Response(result.stream).json();
    await writeFile(path.join(directory, path.basename(blob.pathname)), JSON.stringify(application, null, 2), { mode: 0o600 });
    count++;
  }
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);
console.log(`Exported ${count} application(s) to ${directory}.`);
