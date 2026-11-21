const MAX_BODY_LENGTH = 12_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 5_000;

const CONTACT_RECIPIENTS = ["support@speedytypeapp.com", "ashutoshsinha656@gmail.com"];

export const dynamic = "force-dynamic";

function isDeliveryConfigured() {
  return process.env.CONTACT_FORM_ENABLED === "true"
    && Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isEmail(value) {
  return typeof value === "string"
    && value.length <= MAX_EMAIL_LENGTH
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    && !/[\r\n\u0000-\u001f\u007f]/.test(value);
}

export async function GET() {
  return json({ configured: isDeliveryConfigured() });
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: "This request could not be accepted. Please reload the page and try again." }, 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "The request format was not supported." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_LENGTH) {
    return json({ error: "The message is too large. Please shorten it and try again." }, 413);
  }

  let payload;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_LENGTH) {
      return json({ error: "The message is too large. Please shorten it and try again." }, 413);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return json({ error: "The request could not be read. Please check the form and try again." }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ error: "The form data was not valid." }, 400);
  }

  // Honeypot: bots that populate this off-screen field are rejected without sending mail.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return json({ error: "The message could not be accepted." }, 400);
  }

  const fullName = typeof payload.fullName === "string" ? payload.fullName.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const hasControlCharacters = [fullName, subject, message].some((value) => /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value));

  if (!fullName || fullName.length > MAX_NAME_LENGTH
    || !isEmail(email)
    || !subject || subject.length > MAX_SUBJECT_LENGTH || /[\r\n]/.test(subject)
    || !message || message.length < 10 || message.length > MAX_MESSAGE_LENGTH
    || hasControlCharacters
    || payload.consent !== true) {
    return json({ error: "Please check the required fields and try again." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!isDeliveryConfigured()) {
    return json({ error: "Email delivery is not configured yet. Nothing was sent. Please use one of the email links on the Contact page." }, 503);
  }

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: CONTACT_RECIPIENTS,
        reply_to: email,
        subject: `Speedy Type enquiry: ${subject}`,
        text: [
          "A visitor sent an enquiry through the Speedy Type contact form.",
          "",
          `Name: ${fullName}`,
          `Reply-to: ${email}`,
          `Subject: ${subject}`,
          "",
          message,
        ].join("\n"),
      }),
      cache: "no-store",
    });

    if (!providerResponse.ok) {
      return json({ error: "The email provider could not accept this message. Nothing was confirmed as sent; please try an email link or try again later." }, 502);
    }

    return json({ ok: true });
  } catch {
    return json({ error: "Email delivery could not be reached. Nothing was confirmed as sent; please try an email link or try again later." }, 502);
  }
}
