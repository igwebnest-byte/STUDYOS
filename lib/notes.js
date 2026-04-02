import { getData, setData } from "./storage.js";

const NOTES_KEY = "notes";

function normalizeNote(raw) {
  return {
    id: raw?.id ?? Date.now(),
    title: typeof raw?.title === "string" ? raw.title.trim() : "",
    subject: typeof raw?.subject === "string" ? raw.subject.trim() : "",
    type: typeof raw?.type === "string" ? raw.type.trim() : "Notes",
    url: typeof raw?.url === "string" ? raw.url.trim() : "",
    createdAt: typeof raw?.createdAt === "string" ? raw.createdAt : new Date().toISOString(),
  };
}

export function getNotes() {
  try {
    const notes = getData(NOTES_KEY);
    if (!Array.isArray(notes)) return [];
    return notes.map(normalizeNote);
  } catch {
    return [];
  }
}

export function addNote(note) {
  try {
    const normalized = normalizeNote(note);
    if (!normalized.title || !normalized.subject) {
      return { success: false, message: "Title and subject are required." };
    }

    const existing = getNotes();
    const next = [{ ...normalized, id: Date.now() }, ...existing];

    const stored = setData(NOTES_KEY, next);
    if (!stored) {
      return { success: false, message: "Unable to save note." };
    }

    return { success: true, note: next[0] };
  } catch {
    return { success: false, message: "Unable to add note." };
  }
}

export function deleteNote(id) {
  try {
    const targetId = String(id);
    const existing = getNotes();
    const next = existing.filter((note) => String(note.id) !== targetId);

    const stored = setData(NOTES_KEY, next);
    if (!stored) {
      return { success: false, message: "Unable to delete note." };
    }

    return { success: true, notes: next };
  } catch {
    return { success: false, message: "Unable to delete note." };
  }
}
