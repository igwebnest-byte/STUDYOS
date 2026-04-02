"use client";

import { useEffect, useState } from "react";

export default function CollegeSelectionView() {
  const [collegeName, setCollegeName] = useState("");
  const [savedCollege, setSavedCollege] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadCollege = async () => {
      try {
        const collegeModule = await import("../../../lib/college.js");
        const currentCollege = collegeModule.getCollege?.();

        if (mounted && typeof currentCollege === "string") {
          setSavedCollege(currentCollege);
          setCollegeName(currentCollege);
        }
      } catch {
        if (mounted) {
          setSavedCollege("");
        }
      }
    };

    loadCollege();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async () => {
    const value = collegeName.trim();
    if (!value) {
      alert("Please enter a college name.");
      return;
    }

    setSaving(true);
    try {
      const collegeModule = await import("../../../lib/college.js");
      const result = collegeModule.setCollege?.(value);

      if (result?.success === false) {
        alert(result?.message ?? "Unable to save college.");
        return;
      }

      setSavedCollege(value);
      alert("College saved successfully.");
    } catch {
      alert("Unable to save college.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">College Setup</h1>
        <p className="text-sm text-zinc-400">Set your college name for your StudyOS profile.</p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/85 p-5">
        <label htmlFor="college" className="mb-2 block text-sm font-medium text-zinc-200">
          College Name
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="college"
            type="text"
            value={collegeName}
            onChange={(event) => setCollegeName(event.target.value)}
            placeholder="Enter college name"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
        <p className="mt-3 text-sm text-zinc-400">
          {savedCollege ? `Saved college: ${savedCollege}` : "No college saved yet."}
        </p>
      </div>
    </section>
  );
}
