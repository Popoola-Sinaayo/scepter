"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";
import { Button } from "./Button";

const initialState: SubscribeState = { status: "idle" };

export function SubscribeForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);

  return (
    <form action={formAction} className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby="footer-email-status"
          className="h-14 min-w-0 flex-1 rounded-full border border-cream/20 bg-transparent px-6 text-base text-cream outline-none placeholder:text-cream/45 focus:border-cream/60"
        />
        <Button type="submit" disabled={pending} className="h-14 shrink-0">
          {pending ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      <p
        id="footer-email-status"
        aria-live="polite"
        className={`mt-3 min-h-5 text-sm ${state.status === "error" ? "text-[#f3a6a6]" : "text-cream/70"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
