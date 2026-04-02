"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

type DashboardState = {
  attendancePercentage: number;
  totalSubjects: number;
  notesCount: number;
  belowThresholdCount: number;
};

type BackupPayload = {
  user: unknown;
  attendance: unknown;
  notes: unknown;
  college: unknown;
};

const INITIAL_STATE: DashboardState = {
  attendancePercentage: 0,
  totalSubjects: 0,
  notesCount: 0,
  belowThresholdCount: 0,
};

const primaryButtonClass =
  "rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500";
const outlineButtonClass =
  "rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-500/20";

export function DashboardView() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<DashboardState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      const authModule = await import("../../../lib/auth.js");
      if (!authModule.isAuthenticated()) {
        router.replace("/login");
        return;
      }

      const attendanceModule = await import("../../../lib/attendance.js");
      const notesModule = await import("../../../lib/notes.js");

      const stats = attendanceModule.getAttendanceStats?.() ?? {};
      const subjects = attendanceModule.getSubjects?.() ?? [];
      const notes = notesModule.getNotes?.() ?? [];

      const attendancePercentage = Number(
        stats.overallPercentage ??
          stats.attendancePercentage ??
          stats.overallAttendance ??
          stats.overall ??
          0,
      );

      const totalSubjects = Number(stats.totalSubjects ?? subjects.length ?? 0);

      const belowThresholdFromArray = Array.isArray(stats.belowThresholdSubjects)
        ? stats.belowThresholdSubjects.length
        : Array.isArray(stats.subjectsBelow75)
          ? stats.subjectsBelow75.length
          : 0;

      const belowThresholdRaw =
        stats.belowThresholdCount ?? stats.subjectsBelow75Count ?? belowThresholdFromArray;

      setData({
        attendancePercentage: Number.isFinite(attendancePercentage) ? attendancePercentage : 0,
        totalSubjects: Number.isFinite(totalSubjects) ? totalSubjects : 0,
        notesCount: Array.isArray(notes) ? notes.length : 0,
        belowThresholdCount: Number.isFinite(Number(belowThresholdRaw)) ? Number(belowThresholdRaw) : 0,
      });
    } catch {
      setData(INITIAL_STATE);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleExportData = async () => {
    try {
      const storageModule = await import("../../../lib/storage.js");
      const attendanceModule = await import("../../../lib/attendance.js");
      const notesModule = await import("../../../lib/notes.js");
      const collegeModule = await import("../../../lib/college.js");

      const payload: BackupPayload = {
        user: storageModule.getData?.("user"),
        attendance: attendanceModule.getSubjects?.() ?? [],
        notes: notesModule.getNotes?.() ?? [],
        college: collegeModule.getCollege?.() ?? "",
      };

      const fileData = JSON.stringify(payload, null, 2);
      const blob = new Blob([fileData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const dateStamp = new Date().toISOString().slice(0, 10);

      anchor.href = url;
      anchor.download = `studyos-backup-${dateStamp}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      alert("Data exported successfully.");
    } catch {
      alert("Unable to export data.");
    }
  };

  const handleImportData = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as Partial<BackupPayload>;
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid backup format.");
      }

      const storageModule = await import("../../../lib/storage.js");

      const user = parsed.user && typeof parsed.user === "object" ? parsed.user : null;
      const attendance = Array.isArray(parsed.attendance) ? parsed.attendance : [];
      const notes = Array.isArray(parsed.notes) ? parsed.notes : [];
      const college = typeof parsed.college === "string" ? parsed.college : "";

      const wroteUser = storageModule.setData?.("user", user);
      const wroteAttendance = storageModule.setData?.("subjects", attendance);
      const wroteNotes = storageModule.setData?.("notes", notes);
      const wroteCollege = storageModule.setData?.("college", college);

      if (!wroteUser || !wroteAttendance || !wroteNotes || !wroteCollege) {
        throw new Error("Failed to write imported data.");
      }

      if (user && typeof (user as { email?: unknown }).email === "string") {
        storageModule.setData?.("loggedIn", {
          email: (user as { email: string }).email,
          loggedInAt: new Date().toISOString(),
        });
      }

      await loadDashboard();
      alert("Data imported successfully.");
    } catch {
      alert("Import failed. Please upload a valid StudyOS backup file.");
    } finally {
      event.target.value = "";
    }
  };

  if (loading) {
    return <p className="text-sm text-zinc-400">Loading dashboard...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Dashboard</h1>
        <p className="text-sm text-zinc-400">A clean overview of your academic progress and resources.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Overview</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/50">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Attendance %</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-100">{data.attendancePercentage.toFixed(1)}%</p>
            <p className="mt-1 text-xs text-zinc-500">Overall across all subjects</p>
          </article>

          <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/50">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Total Subjects</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-100">{data.totalSubjects}</p>
            <p className="mt-1 text-xs text-zinc-500">Tracked this semester</p>
          </article>

          <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/50">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Notes Count</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-100">{data.notesCount}</p>
            <p className="mt-1 text-xs text-zinc-500">Saved resources and PYQs</p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Backup</h2>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-medium text-zinc-100">Data Backup</h3>
              <p className="mt-1 text-sm text-zinc-400">Export or restore your StudyOS local data.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={handleExportData} className={outlineButtonClass}>
                Export Data
              </button>
              <button type="button" onClick={() => fileInputRef.current?.click()} className={primaryButtonClass}>
                Import Data
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleImportData}
                className="hidden"
              />
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
            <h3 className="text-base font-medium text-zinc-100">Attendance Health</h3>
            <p className="mt-2 text-sm text-zinc-300">
              {data.belowThresholdCount > 0
                ? `${data.belowThresholdCount} subject(s) are below 75%.`
                : "All tracked subjects are currently above the 75% threshold."}
            </p>
            <Link href="/attendance" className={`mt-4 inline-flex ${primaryButtonClass}`}>
              Open Attendance
            </Link>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
            <h3 className="text-base font-medium text-zinc-100">Today Preview</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">09:00 AM - Data Structures</li>
              <li className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">11:00 AM - DBMS Lab</li>
              <li className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">02:00 PM - Operating Systems</li>
            </ul>
          </article>
        </div>
      </section>
    </section>
  );
}

export default DashboardView;
