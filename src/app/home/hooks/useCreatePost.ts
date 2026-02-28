"use client";

import { useState, useCallback } from "react";

export function useCreatePost(onSubmit: (content: string) => void) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = useCallback(async () => {
    const trimmed = content.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      onSubmit(trimmed);
      setContent("");
    } finally {
      setSubmitting(false);
    }
  }, [content, submitting, onSubmit]);

  return { content, setContent, submit, submitting };
}
