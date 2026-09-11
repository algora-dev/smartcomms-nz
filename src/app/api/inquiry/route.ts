import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const TO_EMAIL = process.env.INQUIRY_EMAIL_TO ?? "insights@t3labs.co.uk";
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // per file
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 5;

const ALLOWED_EXTENSIONS = new Set(["pdf", "png", "jpg", "jpeg", "webp", "dwg", "heic"]);

function fileExtension(name: string): string {
  const parts = name.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() ?? "" : "";
}

export async function POST(req: Request) {
  try {
    const { Resend } = await import("resend");
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json(
      { error: "The enquiry service is temporarily unavailable. Please try again shortly or use our contact form." },
        { status: 503 },
      );
    }
    const resend = new Resend(key);

    const fd = await req.formData();
    const get = (k: string) => (fd.get(k) ?? "").toString().slice(0, 4000);

    // Honeypot. Real users never see or fill this field.
    if (get("company_website")) {
      return NextResponse.json({ ok: true });
    }

    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const location = get("location");
    const comments = get("comments");
    const mode = get("mode") === "assessment" ? "Site assessment request" : "Accurate quote request";
    const estimate = get("estimate");
    const estimateLink = get("estimateLink");
    const pageUrl = get("pageUrl");
    const referrer = get("referrer");
    const utmSource = get("utm_source");
    const utmMedium = get("utm_medium");
    const utmCampaign = get("utm_campaign");
    const partner = get("partner");

    if (!name || !email || !phone || !location) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const files = fd.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `Please attach no more than ${MAX_FILES} files.` }, { status: 400 });
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Attachments are too large in total. Please keep combined uploads under 20MB." }, { status: 400 });
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    for (const f of files) {
      if (f.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json({ error: `${f.name} is larger than 8MB. Please attach a smaller file.` }, { status: 400 });
      }
      if (!ALLOWED_EXTENSIONS.has(fileExtension(f.name))) {
        return NextResponse.json({ error: `${f.name} is not a supported file type.` }, { status: 400 });
      }
      attachments.push({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) });
    }

    const body = [
      `Type: ${mode}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Site location: ${location}`,
      estimate ? `Estimate: ${estimate}` : null,
      estimateLink ? `Estimate link: ${estimateLink}` : null,
      pageUrl ? `Page URL: ${pageUrl}` : null,
      referrer ? `Referrer: ${referrer}` : null,
      utmSource ? `UTM source: ${utmSource}` : null,
      utmMedium ? `UTM medium: ${utmMedium}` : null,
      utmCampaign ? `UTM campaign: ${utmCampaign}` : null,
      partner ? `Partner / campaign code: ${partner}` : null,
      "",
      "Comments:",
      comments || "(none)",
    ].filter((line) => line !== null).join("\n");

    const sendResult = await resend.emails.send({
      from: process.env.INQUIRY_EMAIL_FROM ?? "SmartComms NZ <insights@t3labs.co.uk>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `SmartComms enquiry: ${mode} - ${name}`,
      text: body,
      attachments,
    });

    if (sendResult.error) {
      console.error("inquiry resend error", sendResult.error);
      return NextResponse.json({ error: "Could not send your enquiry. Please try again or email us directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("inquiry error", err);
    return NextResponse.json({ error: "Something went wrong sending your enquiry. Please try again." }, { status: 500 });
  }
}
