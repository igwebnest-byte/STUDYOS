"use client";

import { useCallback, useEffect, useState } from "react";

type Subject = {
  id: number | string;
  name: string;
  attended: number;
  total: number;
};

type AttendanceStats = {
  overallPercentage: number;
  belowThresholdCount: number;
};

type RawAttendanceStats = {
  overallPercentage?: number;
  belowThresholdCount?: number;
  belowThresholdSubjects?: Subject[];
  subjectsBelow75?: Subject[];
  subjectsBelow75Count?: number;
};

const EMPTY_STATS: AttendanceStats = {
  overallPercentage: 0,
  belowThresholdCount: 0,
};

const percentage = (attended: number, total: number) => {
  if (!total) return 0;
  return (attended / total) * 100;
};

const primaryButtonClass =
  "rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500";
const dangerButtonClass =
  "rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500";

export function AttendanceView() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [stats, setStats] = useState<AttendanceStats>(EMPTY_STATS);
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(true);

  const loadAttendance = useCallback(async () => {
    try {
      const attendanceModule = await import("../../../lib/attendance.js");
      const list: Subject[] = attendanceModule.getSubjects?.() ?? [];
      const rawStats: RawAttendanceStats = attendanceModule.getAttendanceStats?.() ?? {};

      const overallValue = Number(rawStats.overallPercentage ?? 0);

      const belowFromArray = Array.isArray(rawStats.belowThresholdSubjects)
        ? rawStats.belowThresholdSubjects.length
        : Array.isArray(rawStats.subjectsBelow75)
          ? rawStats.subjectsBelow75.length
          : 0;

      const belowRaw = rawStats.belowThresholdCount ?? rawStats.subjectsBelow75Count ?? belowFromArray;
      const belowValue = Number(belowRaw ?? 0);

      setSubjects(Array.isArray(list) ? list : []);
      setStats({
        overallPercentage: Number.isFinite(overallValue) ? overallValue : 0,
        belowThresholdCount: Number.isFinite(belowValue) ? belowValue : 0,
      });
    } catch {
      setSubjects([]);
      setStats(EMPTY_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  const handleAddSubject = async () => {
    const name = newSubject.trim();
    if (!name) return;

    try {
      const attendanceModule = await import("../../../lib/attendance.js");
      const result = attendanceModule.addSubject?.(name);

      if (result?.success === false) {
        alert(result?.message ?? "Unable to add subject.");
        return;
      }

      setNewSubject("");
      await loadAttendance();
    } catch {
      alert("Unable to add subject.");
    }
  };

  const markAttended = async (id: number | string) => {
    try {
      const attendanceModule = await import("../../../lib/attendance.js");
      attendanceModule.markPresent?.(id);
      await loadAttendance();
    } catch {
      alert("Unable to update attendance.");
    }
  };

  const markBunked = async (id: number | string) => {
    try {
      const attendanceModule = await import("../../../lib/attendance.js");
      attendanceModule.markAbsent?.(id);
      await loadAttendance();
    } catch {
      alert("Unable to update attendance.");
    }
  };

  if (loading) {
    return <p className="text-sm text-zinc-400">Loading attendance...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Attendance</h1>
        <p className="text-sm text-zinc-400">Track attendance by subject with real-time updates.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Summary</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 transition hover:border-blue-500/50">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Overall Attendance</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-100">{stats.overallPercentage.toFixed(1)}%</p>
          </article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 transition hover:border-blue-500/50">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Below 75%</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-100">{stats.belowThresholdCount}</p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Manage Subjects</h2>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/85 p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="e.g. Computer Networks"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
            />
            <button type="button" onClick={handleAddSubject} className={primaryButtonClass}>
              Add Subject
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Subject List</h2>
        <div className="space-y-3">
          {subjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 p-6 text-center text-sm text-zinc-400">
              No subjects added yet.
            </div>
          ) : (
            subjects.map((subject) => {
              const attended = Number(subject.attended || 0);
              const total = Number(subject.total || 0);
              const pct = percentage(attended, total);

              return (
                <article
                  key={subject.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 transition duration-200 hover:border-blue-500/40"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-base font-medium text-zinc-100">{subject.name}</h3>
                      <p className="text-sm text-zinc-400">
                        {attended}/{total} classes attended
                      </p>
                    </div>
                    <div className="text-sm font-medium text-zinc-200">{pct.toFixed(1)}%</div>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        pct >= 75 ? "bg-blue-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                    />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => markAttended(subject.id)} className={primaryButtonClass}>
                      Mark Attended
                    </button>
                    <button type="button" onClick={() => markBunked(subject.id)} className={dangerButtonClass}>
                      Mark Bunked
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}

export default AttendanceView;
