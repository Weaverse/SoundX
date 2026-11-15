"use client";

import type { FormEvent } from "react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { InputUnderline } from "@/components/ui/input-underline";
import { cn } from "@/lib/cn";

import type { FooterNewsletter as FooterNewsletterContent } from "./types";

type FooterNewsletterProps = {
  newsletter: FooterNewsletterContent;
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
};

export default function FooterNewsletter({
  newsletter,
  onSubscribe,
  className,
}: FooterNewsletterProps) {
  let emailId = useId();
  let headingId = useId();
  let feedbackId = useId();

  let [email, setEmail] = useState("");
  let [error, setError] = useState("");
  let [success, setSuccess] = useState(false);
  let [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    let form = event.currentTarget;
    let emailInput = form.elements.namedItem("email");

    if (!(emailInput instanceof HTMLInputElement)) {
      return;
    }

    let normalizedEmail = email.trim();

    setSuccess(false);

    if (!normalizedEmail) {
      setError(newsletter.requiredMessage);
      emailInput.focus();
      return;
    }

    emailInput.value = normalizedEmail;
    setEmail(normalizedEmail);

    if (!emailInput.validity.valid) {
      setError(newsletter.invalidMessage);
      emailInput.focus();
      return;
    }

    setError("");

    // Subscription is available once a real submission handler is supplied.
    if (!onSubscribe) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubscribe(normalizedEmail);
      setSuccess(true);
      setEmail("");
    } catch {
      setError(newsletter.errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn("flex min-w-0 flex-col font-body", className)}
    >
      <div className="flex min-h-[257px] flex-col justify-center gap-4 px-6 pt-20 pb-14 min-[430px]:px-14">
        <p className="m-0 font-sans text-[11px] leading-normal font-bold text-text-subtle uppercase lg:text-footer-text">
          {newsletter.eyebrow}
        </p>

        <p className="m-0 text-[24px] leading-[1.3] font-normal text-footer-text">
          {newsletter.description}
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={submitting}
        className={cn(
          "flex min-h-[311px] flex-1 flex-col justify-between gap-8",
          "bg-[#503C8C] p-6 min-[430px]:p-14",
          "lg:rounded-2xl",
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 font-sans text-[10px] leading-normal font-medium text-text-subtle uppercase lg:text-footer-text">
          <p className="m-0">{newsletter.formLabel}</p>
          <p className="m-0">{newsletter.frequency}</p>
        </div>

        <h2
          id={headingId}
          className="m-0 font-heading text-[32px] leading-[1.2] font-medium text-white"
        >
          {newsletter.heading}
        </h2>

        <div>
          <div className="flex items-end gap-4">
            <div className="min-w-0 flex-1">
              <label htmlFor={emailId} className="sr-only">
                {newsletter.emailLabel}
              </label>

              <InputUnderline
                id={emailId}
                name="email"
                type="email"
                autoComplete="off"
                required
                value={email}
                readOnly={submitting}
                placeholder={newsletter.emailPlaceholder}
                aria-invalid={Boolean(error)}
                aria-describedby={error || success ? feedbackId : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setSuccess(false);
                }}
                className={cn(
                  "placeholder:text-text-subtle! lg:placeholder:text-footer-text!",
                  error &&
                    "[box-shadow:inset_0_-1px_0_0_#fecaca]! enabled:hover:[box-shadow:inset_0_-2px_0_0_#fecaca]! focus-visible:[box-shadow:inset_0_-2px_0_0_#fecaca]!",
                )}
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              withBorder={false}
              disabled={submitting}
              className={cn(
                "w-[128px]! md:w-[200px]! lg:w-[160px]!",
                "duration-400!",
                "focus-visible:outline-offset-4 focus-visible:outline-white!",
                "disabled:cursor-wait",
              )}
            >
              {submitting ? newsletter.submittingLabel : newsletter.submitLabel}
            </Button>
          </div>

          <div
            id={feedbackId}
            aria-live="polite"
            aria-atomic="true"
            className="font-sans text-[13px] leading-normal text-footer-text"
          >
            {error || success ? (
              <p className="mt-3 mb-0">{error || newsletter.successMessage}</p>
            ) : null}
          </div>
        </div>
      </form>
    </section>
  );
}
