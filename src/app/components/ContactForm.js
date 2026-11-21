"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const initialValues = { fullName: "", email: "", subject: "", message: "", consent: false, website: "" };

const inputClass = "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-700 focus:ring-2 focus:ring-sky-700/15";

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your name.";
  else if (values.fullName.trim().length > 100) errors.fullName = "Name must be 100 characters or fewer.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = "Enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Enter a subject.";
  else if (values.subject.trim().length > 160) errors.subject = "Subject must be 160 characters or fewer.";
  if (!values.message.trim()) errors.message = "Enter a message.";
  else if (values.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  else if (values.message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";
  if (!values.consent) errors.consent = "Consent is required before sending your enquiry.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [deliveryConfigured, setDeliveryConfigured] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let active = true;
    fetch("/api/contact", { method: "GET", cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("status")))
      .then((data) => { if (active) setDeliveryConfigured(Boolean(data.configured)); })
      .catch(() => { if (active) setDeliveryConfigured(false); });
    return () => { active = false; };
  }, []);

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    if (!deliveryConfigured) {
      setStatus({ type: "error", message: "The website form is not configured to deliver messages yet. Nothing was sent. Please use one of the email links on this page." });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Nothing was sent; please try again or use an email link.");
      setValues(initialValues);
      setErrors({});
      setStatus({ type: "success", message: "Your enquiry was accepted for delivery. This does not confirm that it has reached the recipient's inbox." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Your message could not be sent. Nothing was sent; please try again or use an email link." });
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (name) => errors[name] ? <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-rose-700">{errors[name]}</p> : null;

  return (
    <section aria-labelledby="contact-form-heading" className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-800">Send a message</p>
        <h2 id="contact-form-heading" className="mt-2 text-2xl font-black tracking-tight text-slate-950">Contact form</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Your details will be used to respond to your enquiry. No promotional emails or newsletter subscriptions are sent through this form.</p>
      </div>

      {deliveryConfigured === false && (
        <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950" role="status">
          The form and its fields are disabled because email delivery is not configured yet. Nothing can be entered or sent here. Use an email link in the contact details to reach Ashutosh.
        </div>
      )}
      {deliveryConfigured === null && <p className="mb-5 text-sm text-slate-500" role="status">Checking message delivery availability…</p>}
      {deliveryConfigured === true && <p className="mb-5 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-relaxed text-sky-950">The form is configured to submit enquiries. If the mail provider rejects a message, the form will show an error and will not report success.</p>}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" value={values.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
        </div>

        <fieldset disabled={deliveryConfigured !== true} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="text-sm font-bold text-slate-800">Full name <span aria-hidden="true" className="text-rose-700">*</span></label>
          <input className={inputClass} id="fullName" name="fullName" autoComplete="name" maxLength={100} value={values.fullName} onChange={updateField} required aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
          {fieldError("fullName")}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-bold text-slate-800">Email address <span aria-hidden="true" className="text-rose-700">*</span></label>
          <input className={inputClass} id="email" name="email" type="email" autoComplete="email" maxLength={254} value={values.email} onChange={updateField} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor="subject" className="text-sm font-bold text-slate-800">Subject <span aria-hidden="true" className="text-rose-700">*</span></label>
          <input className={inputClass} id="subject" name="subject" maxLength={160} value={values.subject} onChange={updateField} required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} />
          {fieldError("subject")}
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-bold text-slate-800">Message <span aria-hidden="true" className="text-rose-700">*</span></label>
          <textarea className={`${inputClass} min-h-36 resize-y`} id="message" name="message" maxLength={5000} value={values.message} onChange={updateField} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error message-count" : "message-count"} />
          <div className="mt-1.5 flex justify-between gap-4">
            {fieldError("message") || <span />}
            <span id="message-count" className="text-xs text-slate-500">{values.message.length}/5000</span>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-800 focus:ring-sky-700" id="consent" name="consent" type="checkbox" checked={values.consent} onChange={updateField} required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : "consent-copy"} />
            <label id="consent-copy" htmlFor="consent" className="text-sm leading-relaxed text-slate-600">I agree that the information I submit may be used to respond to this enquiry. See the <Link href="/privacy-policy" className="font-semibold text-sky-800 underline underline-offset-2">Privacy Policy</Link>. <span aria-hidden="true" className="text-rose-700">*</span></label>
          </div>
          {fieldError("consent")}
        </div>

        </fieldset>

        {status && <p className={`rounded-xl border p-4 text-sm leading-relaxed ${status.type === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-rose-300 bg-rose-50 text-rose-950"}`} role={status.type === "success" ? "status" : "alert"}>{status.message}</p>}

        <button type="submit" disabled={submitting || deliveryConfigured !== true} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-800 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 disabled:cursor-not-allowed disabled:bg-slate-600 sm:w-auto">
          {submitting ? "Sending…" : deliveryConfigured === false ? "Email form unavailable" : deliveryConfigured === null ? "Checking availability…" : "Send enquiry"}
        </button>
        <p className="text-xs leading-relaxed text-slate-500">A required honeypot field helps screen automated spam. Do not include passwords, payment details, or other sensitive information.</p>
      </form>
    </section>
  );
}
