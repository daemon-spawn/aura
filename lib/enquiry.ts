/** Shared between the form and the API route. */
export const needs = ["A website", "A business system", "Ongoing care", "Not sure yet"] as const;

export type Enquiry = {
  name: string;
  email: string;
  business?: string;
  need: string;
  message: string;
  company?: string; // honeypot
};

export function validateEnquiry(input: Partial<Enquiry>) {
  const errors: Partial<Record<keyof Enquiry, string>> = {};
  if (!input.name?.trim()) errors.name = "Please tell me your name.";
  if (!input.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    errors.email = "I'll need a valid email address to reply.";
  if (!input.need || !needs.includes(input.need as (typeof needs)[number]))
    errors.need = "Choose the closest option.";
  if (!input.message?.trim() || input.message.trim().length < 10)
    errors.message = "A sentence or two about the business helps me prepare.";
  return errors;
}

export function enquiryMailto(to: string, e: Partial<Enquiry>) {
  const subject = `Discovery call — ${e.business || e.name || "new enquiry"}`;
  const body = [
    `Name: ${e.name ?? ""}`,
    `Email: ${e.email ?? ""}`,
    `Business / website: ${e.business ?? ""}`,
    `Looking for: ${e.need ?? ""}`,
    "",
    e.message ?? "",
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
