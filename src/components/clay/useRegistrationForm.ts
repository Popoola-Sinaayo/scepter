"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import type { RegistrationState } from "@/app/clay/actions";

type RegistrationAction = (state: RegistrationState, formData: FormData) => Promise<RegistrationState>;

/**
 * Submits through `onSubmit` instead of `<form action>` so React does not reset the
 * form afterwards; answers stay filled in when the server returns validation errors.
 */
export function useRegistrationForm(action: RegistrationAction) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (state.status !== "error") return;

    const firstInvalid = formRef.current?.querySelector<HTMLElement>("[data-invalid]");
    const target = firstInvalid ?? formRef.current?.querySelector<HTMLElement>("[role=alert]");
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalid
      ?.querySelector<HTMLElement>("input:not([disabled]), select, textarea")
      ?.focus({ preventScroll: true });
  }, [state]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  // `formAction` still goes on `<form action>` so a submit before hydration POSTs to the
  // server action instead of falling back to a GET with answers in the URL.
  return { state, pending, formRef, resultRef, formAction, onSubmit, errors: state.errors ?? {} };
}
