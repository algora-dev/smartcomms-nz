/**
 * Submit changed public URLs to IndexNow.
 * Usage: npm run indexnow -- /schools /pricing /funding
 * Requires the existing public IndexNow key file to remain deployed.
 */
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.smartcomms.co.nz").replace(/\/$/, "");
const key = "e5f35406b43b495b4dacb3ea8957792b";
const paths = process.argv.slice(2);
if (!paths.length) {
  console.error("Pass at least one public path, e.g. npm run indexnow -- /schools /pricing");
  process.exit(1);
}
const urlList = paths.map((p) => p.startsWith("http") ? p : `${site}${p.startsWith("/") ? p : `/${p}`}`);
const host = new URL(site).host;
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${response.status} ${response.statusText}`);
if (!response.ok && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}
