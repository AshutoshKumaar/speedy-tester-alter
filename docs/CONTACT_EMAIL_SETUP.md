# Speedy Type Contact Email Setup

The contact page and server route are prepared, but the form is **not operational until delivery is configured and tested**. No provider credentials were present in the project at implementation time. The route does not return success when its setup is missing or when the provider rejects the request.

## Provider and delivery path

No email service, SMTP setup, mail library, API route, or email-related environment configuration was found in the project. The implementation uses the Resend email HTTP API directly with server-side `fetch`, so it adds no dependency. After configuration, the route sends an enquiry to both `support@speedytypeapp.com` and `ashutoshsinha656@gmail.com`; the visitor's validated email is set as Reply-To. It sends plain-text enquiry notifications only and does not subscribe visitors to marketing.

## Required server environment variables

Set these in the local server environment and the production hosting environment. Do not prefix secret values with `NEXT_PUBLIC_` and never put them in browser code.

| Variable | Required value |
|---|---|
| `RESEND_API_KEY` | A Resend API key with permission to send email. Keep it secret. |
| `RESEND_FROM_EMAIL` | A sender identity/domain verified in Resend and accepted for sending by the account. Use the exact verified sender value. |
| `CONTACT_FORM_ENABLED` | Set to the literal string `true` only after the policy and provider checks below are complete. Any missing/other value leaves the form delivery disabled. |

## Steps before enabling

1. Create/configure a Resend account for the actual operator and verify control of the sending domain using Resend's current dashboard instructions. Publish the requested DNS records at the actual DNS host and wait for verification.
2. Create a server-side API key and choose a sender identity allowed by that verified domain. Do not use a visitor-supplied address as the sender.
3. Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` as encrypted/server-only variables in the hosting environment. Keep `CONTACT_FORM_ENABLED` unset or not `true` while completing the remaining steps.
4. **Update the Privacy Policy before enabling delivery.** It currently says the app has no message-submission feature and does not describe the contact data flow. Add accurate disclosure that the form collects name, email address, subject, message and consent; uses the information to respond to that enquiry; sends it to the operator's support and operator inboxes through Resend; and uses the submitted, validated address for Reply-To. Verify and disclose the provider's applicable processing, retention, location/transfer and deletion terms based on the actual Resend account/settings. Explain that the honeypot is used to screen automated spam. Do not claim a specific retention period or legal compliance without confirming it.
5. Configure both intended recipient inboxes so they can receive mail; verify their ownership/access and any forwarding rules. The addresses are set in the server route and are not taken from client input.
6. Test a real enquiry in a non-production/staging deployment first: verify both inboxes receive one message, the subject/body are correct, Reply-To opens to the visitor, the provider accepts the sender and recipients, and replies work. Test a provider failure, missing configuration, oversized body, invalid fields and populated honeypot. Confirm no error path reports success.
7. Only after those checks, set `CONTACT_FORM_ENABLED=true`, redeploy through the site's normal release process, and submit a final controlled production test. Check provider delivery events/inboxes; an API acceptance response alone does not prove inbox delivery.

## Current behavior and safeguards

- `GET /api/contact` reports only whether the three server variables are present/enabled; it exposes no secret values.
- `POST /api/contact` validates required fields, lengths, email syntax, consent, request origin when supplied, JSON type and body size. It rejects a populated honeypot.
- The email provider key and From identity are read only on the server. The visitor's validated email is the Reply-To value.
- Missing/incomplete setup returns a service-unavailable response. Provider/network failures return an error. The client presents an error and does not show its success state.
- The form has a honeypot but no distributed rate limiter. If abuse becomes material, add a production-appropriate rate limiter (for example a shared KV/edge rate limit) before relying on the endpoint at scale; an in-memory limit would not be dependable across serverless instances.
- This code has not been tested with real provider credentials and no real email delivery has been verified.
