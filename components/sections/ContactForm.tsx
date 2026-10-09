"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { needs, validateEnquiry, enquiryMailto, type Enquiry } from "@/lib/enquiry";
import { track } from "@/lib/analytics";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent" | "fallback";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const [draft, setDraft] = useState<Partial<Enquiry>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Partial<Enquiry>;
    const errs = validateEnquiry(data);
    setErrors(errs);
    setDraft(data);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        track("enquiry_submit", { need: data.need });
        setStatus("sent");
      } else {
        setStatus("fallback");
      }
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.done} role="status" aria-live="polite">
        <p className="t-meta">Received</p>
        <p className={styles.doneTitle}>Thank you, {draft.name?.split(" ")[0]}.</p>
        <p className="t-body">
          I read every enquiry myself and I&rsquo;ll reply to {draft.email} to set up a time for the call.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby="form-note">
      <div className={styles.row}>
        <Field label="Your name" name="name" autoComplete="name" error={errors.name} required />
        <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} required />
      </div>
      <Field label="Business or current website" name="business" autoComplete="organization" hint="Optional" />

      <fieldset className={styles.fieldset} aria-invalid={!!errors.need} aria-describedby={errors.need ? "need-error" : undefined}>
        <legend className={styles.label}>What are you looking for?</legend>
        <div className={styles.options}>
          {needs.map((n) => (
            <label key={n} className={styles.option}>
              <input type="radio" name="need" value={n} />
              <span>{n}</span>
            </label>
          ))}
        </div>
        {errors.need && <p id="need-error" className={styles.error}>{errors.need}</p>}
      </fieldset>

      <Field
        label="Tell me about the business"
        name="message"
        textarea
        error={errors.message}
        required
        hint="What you do, who your customers are, and what isn't working."
      />

      {/* Honeypot */}
      <div className={styles.hp} aria-hidden="true">
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "fallback" && (
        <div className={styles.fallback} role="alert">
          <p className="t-small">
            The form couldn&rsquo;t send just now. Your message is ready to go as an email instead:
          </p>
          <a href={enquiryMailto(site.email, draft)} className={styles.fallbackLink}>
            Open it in your email app <Arrow />
          </a>
        </div>
      )}

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={status === "sending"} data-track="enquiry_attempt">
          <span>{status === "sending" ? "Sending…" : "Request a discovery call"}</span>
          <Arrow />
        </button>
        <p id="form-note" className={`t-small ${styles.note}`}>
          No obligation. Your details are only used to reply to you.
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof Enquiry;
  type?: string;
  textarea?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({ label, name, type = "text", textarea, error, hint, required, autoComplete }: FieldProps) {
  const id = `f-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name,
    required,
    autoComplete,
    "aria-invalid": !!error,
    "aria-describedby": describedBy,
    className: styles.input,
  };
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {hint && !textarea && <span id={`${id}-hint`} className={styles.hint}>{hint}</span>}
      </label>
      {textarea ? <textarea rows={5} {...common} /> : <input type={type} {...common} />}
      {hint && textarea && <p id={`${id}-hint`} className={styles.hint}>{hint}</p>}
      {error && <p id={`${id}-error`} className={styles.error}>{error}</p>}
    </div>
  );
}
