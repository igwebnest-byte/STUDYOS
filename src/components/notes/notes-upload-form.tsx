"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NoteAsset } from "@/types";

interface NotesUploadFormProps {
  onAdded: (note: NoteAsset) => void;
}

export function NotesUploadForm({ onAdded }: NotesUploadFormProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState<"note" | "pyq">("note");
  const [fileUrl, setFileUrl] = useState("#");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!title.trim() || !subject.trim()) {
      setError("Title and subject are required.");
      return;
    }

    setIsSubmitting(true);

    const note: NoteAsset = {
      id: `note-${crypto.randomUUID()}`,
      title: title.trim(),
      subject: subject.trim(),
      type,
      fileUrl,
      uploadedAt: new Date().toISOString().slice(0, 10),
    };

    onAdded(note);
    setTitle("");
    setSubject("");
    setType("note");
    setFileUrl("#");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card grid gap-3 p-5">
      <div>
        <h3 className="text-sm font-semibold tracking-tight">Add note or PYQ</h3>
        <p className="mt-1 text-xs text-muted-foreground">UI-only upload flow with local mock state.</p>
      </div>

      <label className="grid gap-1 text-sm">
        Title
        <Input value={title} onChange={(event) => setTitle(event.target.value)} required />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Subject
          <Input value={subject} onChange={(event) => setSubject(event.target.value)} required />
        </label>

        <label className="grid gap-1 text-sm">
          Type
          <select
            value={type}
            onChange={(event) => setType(event.target.value as "note" | "pyq")}
            className="h-10 rounded-xl border border-border/90 bg-background/90 px-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/35"
          >
            <option value="note">Notes</option>
            <option value="pyq">PYQ</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1 text-sm">
        File URL (optional)
        <Input value={fileUrl} onChange={(event) => setFileUrl(event.target.value)} />
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add resource"}
      </Button>
    </form>
  );
}
