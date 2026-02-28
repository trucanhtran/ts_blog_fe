"use client";

interface CreatePostInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
  placeholder?: string;
}

const CreatePostInput = ({
  value,
  onChange,
  onSubmit,
  submitting = false,
  placeholder = "What's new?",
}: CreatePostInputProps) => (
  <div className="mt-3 flex items-start gap-3">
    <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-700" aria-hidden />
    <div className="min-w-0 flex-1">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder={placeholder}
        rows={2}
        className="w-full resize-none rounded-lg border border-zinc-700 bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      />
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!value.trim() || submitting}
          className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "..." : "Post"}
        </button>
      </div>
    </div>
  </div>
);

export default CreatePostInput;
