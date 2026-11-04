"use client";

import { ArrowUpRight, Check, Copy, LoaderCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { validateContact, type ContactErrors } from "@/lib/contact-validation";

export function ContactForm({
  email,
  configured,
  topics,
}: {
  email: string;
  configured: boolean;
  topics: readonly string[];
}) {
  const form = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "draft"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const fields = new FormData(event.currentTarget);
    const payload = Object.fromEntries(fields.entries());
    const { data, errors: fieldErrors } = validateContact({
      ...payload,
      startedAt: startedAt.current,
    });
    setErrors(fieldErrors);
    if (!data) {
      setStatus("error");
      setFeedback(
        fieldErrors.startedAt || "Please check the highlighted fields.",
      );
      const firstField = Object.keys(fieldErrors)[0];
      form.current
        ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
        ?.focus();
      return;
    }
    if (!configured) {
      const subject = encodeURIComponent(`${data.topic} — ${data.name}`);
      const body = encodeURIComponent(
        `Hi Aaron,\n\n${data.message}\n\n${data.name}\n${data.email}`,
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus("draft");
      setFeedback(
        "Your email draft is ready. Send it from your email app. If it didn’t open, use the email address below.",
      );
      return;
    }
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        throw new Error(result.error || "Unable to send your message.");
      }
      setStatus("success");
      setFeedback(result.message);
      form.current?.reset();
      startedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please email me directly.",
      );
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFeedback(`Copy this address: ${email}`);
    }
  }

  return (
    <div className="contact-form-wrap">
      <form
        className="contact-form"
        ref={form}
        onSubmit={submit}
        noValidate
        aria-label="Contact Aaron"
      >
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contact-name">
              Your name <span>*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              placeholder="Alex Morgan"
              autoComplete="name"
              required
              maxLength={80}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span className="field-error" id="name-error">
                {errors.name}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">
              Email address <span>*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="alex@company.com"
              autoComplete="email"
              required
              maxLength={254}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span className="field-error" id="email-error">
                {errors.email}
              </span>
            )}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="contact-topic">
            What’s on your mind? <span>*</span>
          </label>
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? "topic-error" : undefined}
          >
            <option value="" disabled>
              Select a conversation
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.topic && (
            <span className="field-error" id="topic-error">
              {errors.topic}
            </span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">
            Your message <span>*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="A little about the role, the project, or what you’d like to build…"
            rows={5}
            required
            minLength={20}
            maxLength={4000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
          />
          <span id="message-hint" className="form-hint">
            20–4,000 characters. Please avoid sensitive information.
          </span>
          {errors.message && (
            <span className="field-error" id="message-error">
              {errors.message}
            </span>
          )}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="form-submit">
          <button
            className="button button-primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                Sending
                <LoaderCircle className="spinner" size={17} />
              </>
            ) : configured ? (
              <>
                Send message
                <Send size={16} />
              </>
            ) : (
              <>
                Open email draft
                <ArrowUpRight size={17} />
              </>
            )}
          </button>
          <span className="form-hint">
            {configured
              ? "Sent directly to my inbox."
              : "Send through your preferred email app."}
          </span>
        </div>
        <p
          className={`form-feedback ${status}`}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {feedback}
        </p>
      </form>
      <div className="direct-email">
        <span>Or keep it simple.</span>
        <a href={`mailto:${email}`}>
          {email}
          <ArrowUpRight size={14} />
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email address copied" : "Copy email address"}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <span className="sr-only" role="status">
          {copied ? "Email address copied" : ""}
        </span>
      </div>
    </div>
  );
}
