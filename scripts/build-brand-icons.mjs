// Builds the site icons from the brand files in public/brand (the source artwork). Run: node scripts/build-brand-icons.mjs
// Writes src/app/favicon.ico (16, 32, 48), src/app/icon.png, src/app/apple-icon.png and public/brand/d-mark-192.png (the header logo).
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const brand = file => `public/brand/${file}`;

// ICO with embedded PNG frames: a 6-byte header, a 16-byte entry per frame, then the PNG data.
async function ico(frames) {
  const pngs = await Promise.all(frames.map(([file, size]) => sharp(brand(file)).resize(size, size).png().toBuffer()));
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach((png, i) => {
    const size = frames[i][1], at = 6 + 16 * i;
    head.writeUInt8(size, at); head.writeUInt8(size, at + 1);
    head.writeUInt16LE(1, at + 4); head.writeUInt16LE(32, at + 6);
    head.writeUInt32LE(png.length, at + 8); head.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([head, ...pngs]);
}

await writeFile("src/app/favicon.ico", await ico([["favicon-32.png", 16], ["favicon-32.png", 32], ["favicon-48.png", 48]]));
await sharp(brand("favicon-128.png")).toFile("src/app/icon.png");
await sharp(brand("d-mark-transparent-1024.png")).trim().resize({ width: 192 }).png({ compressionLevel: 9 }).toFile(brand("d-mark-192.png"));

// Apple icon: the white mark on the orange tile, full bleed (iOS rounds the corners itself).
const tile = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFA233"/><stop offset=".55" stop-color="#FF7414"/><stop offset="1" stop-color="#F2500A"/></linearGradient></defs><rect width="180" height="180" fill="url(#g)"/></svg>`);
const mark = await sharp(brand("d-mark-white-1024.png")).trim().resize(112, 112, { fit: "contain", background: "#0000" }).toBuffer();
await sharp(tile).composite([{ input: mark, gravity: "centre" }]).flatten({ background: "#FF7414" }).png().toFile("src/app/apple-icon.png");

console.log("brand icons written");
