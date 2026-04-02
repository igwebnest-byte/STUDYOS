"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type Note = {
  id: number | string;
  title: string;
  subject: string;
  type: string;
  url: string;
  createdAt: string;
};

type NoteFormState = {
  title: string;
  subject: string;
  type: string;
  url: string;
};

const INITIAL_FORM: NoteFormState = {
  title: "",
  subject: "",
  type: "Notes",
  url: "",
};

const primaryButtonClass =
  "rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500";
const dangerButtonClass =
  "rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500";

export function NotesView() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState<NoteFormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(true);

  const loadNotes = useCallback(async () => {
    try {
      const notesModule = await import("../../../lib/notes.js");
      const list = notesModule.getNotes?.() ?? [];
      setNotes(Array.isArray(list) ? list : []);
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.subject.trim()) {
      alert("Please provide title and subject.");
      return;
    }

    try {
      const notesModule = await import("../../../lib/notes.js");
      const result = notesModule.addNote?.({
        title: form.title.trim(),
        subject: form.subject.trim(),
        type: form.type.trim() || "Notes",
        url: form.url.trim(),
        createdAt: new Date().toISOString(),
      });

      if (result?.success === false) {
        alert(result?.message ?? "Unable to save note.");
        return;
      }

      setForm(INITIAL_FORM);
      await loadNotes();
    } catch {
      alert("Unable to save note.");
    }
  };

  const removeNote = async (id: number | string) => {
    try {
      const notesModule = await import("../../../lib/notes.js");
      const result = notesModule.deleteNote?.(id);

      if (result?.success === false) {
        alert(result?.message ?? "Unable to delete note.");
        return;
      }

      await loadNotes();
    } catch {
      alert("Unable to delete note.");
    }
  };

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }, [notes]);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Notes & PYQs</h1>
        <p className="text-sm text-zinc-400">Centralized study material with quick access and cleanup controls.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Add Resource</h2>
        <form onSubmit={onSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/85 p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Resource title"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Subject</label>
              <input
                value={form.subject}
                onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Subject name"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Notes">Notes</option>
                <option value="PYQ">PYQ</option>
                <option value="Reference">Reference</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">URL (optional)</label>
              <input
                value={form.url}
                onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <button type="submit" className={`mt-4 ${primaryButtonClass}`}>
            Add Note
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Saved Notes</h2>
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-zinc-400">Loading notes...</p>
          ) : sortedNotes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 p-6 text-center text-sm text-zinc-400">
              No notes added yet.
            </div>
          ) : (
            sortedNotes.map((note) => (
              <article
                key={note.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 transition duration-200 hover:border-blue-500/40"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-zinc-100">{note.title}</h3>
                    <p className="text-sm text-zinc-400">
                      {note.subject} • {note.type}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Added {new Date(note.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                    {note.url ? (
                      <a
                        href={note.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block text-xs font-medium text-blue-400 transition hover:text-blue-300"
                      >
                        Open Resource
                      </a>
                    ) : null}
                  </div>

                  <button type="button" onClick={() => removeNote(note.id)} className={dangerButtonClass}>
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default NotesView;
