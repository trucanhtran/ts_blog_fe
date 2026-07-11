"use client";

import { useState, useCallback } from "react";

export function useCreatePost(onSubmit: (content: string) => Promise<void>) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    const trimmed = content.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(trimmed);
      setContent("");
    } catch {
      setError("Cannot post right now.");
    } finally {
      setSubmitting(false);
    }
  }, [content, submitting, onSubmit]);

  return { content, setContent, submit, submitting, error };
}
