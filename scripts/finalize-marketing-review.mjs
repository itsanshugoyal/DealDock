import assert from "node:assert/strict";
import { copyFile, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Next exports this generated image without an extension. Give static hosting
// an explicit PNG extension, updating both HTML and client navigation payloads.
assert.ok(process.argv[2], "Pass the static out directory");
const output = path.resolve(process.argv[2]);
assert.equal(path.basename(output), "out", "Only operate on a static export");
const image = path.join(output, "design-preview/opengraph-image");
assert.equal((await readFile(image)).subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
await copyFile(image, image + ".png");
const files = await readdir(output, { recursive: true, withFileTypes: true });
for (const entry of files) {
  if (!entry.isFile()) continue;
  const filename = path.join(entry.parentPath, entry.name);
  assert.ok(!/(^|[/\\])(?:dashboard|api|\.env[^/\\]*|PIPELINE\.md)([/\\]|$)/.test(path.relative(output, filename)), "Private content must not be exported");
  if (!/\.(html|txt)$/.test(entry.name)) continue;
  const text = await readFile(filename, "utf8");
  const updated = text.replaceAll(/\/design-preview\/opengraph-image(?!\.png)/g, "/design-preview/opengraph-image.png");
  if (text !== updated) await writeFile(filename, updated);
}
console.log(`Verified marketing-only export: ${output}`);
