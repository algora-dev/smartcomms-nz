import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const TO_EMAIL = "insights@t3labs.co.uk";
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8MB per file

export async function POST(req: Request) {
  try {
    const { Resend } = await import("resend");
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "Email service is not configured yet. Please try again later." }, { status: 500 });
    }
    const resend = new Resend(key);

    const fd = await req.formData();
    const get = (k: string) => (fd.get(k) ?? "").toString().slice(0, 2000);

    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const location = get("location");
    const comments = get("comments");
    const mode = get("mode") === "assessment" ? "Site assessment request" : "Accurate quote request";
    const estimate = get("estimate");
    const estimateLink = get("estimateLink");

    if (!name || !email || !phone || !location) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // attachments
    const files = fd.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
    const attachments: { filename: string; content: Buffer }[] = [];
    for (const f of files.slice(0, 5)) {
      if (f.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json({ error: `${f.name} is larger than 8MB. Please attach a smaller file.` }, { status: 400 });
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
      "",
      "Comments:",
      comments || "(none)",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const send = await resend.emails.send({
      from: "SmartComms NZ <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `SmartComms enquiry: ${mode} - ${name}`,
      text: body,
      attachments,
    });
    if (send.error) {
      console.error("resend error", send.error);
      return NextResponse.json({ error: "Email provider rejected the message: " + (send.error.message ?? "unknown") }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("inquiry error", err);
    return NextResponse.json({ error: "Something went wrong sending your enquiry. Please try again." }, { status: 500 });
  }
}
