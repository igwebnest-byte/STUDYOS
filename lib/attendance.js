import { getData, setData, updateData } from "./storage.js";

const SUBJECTS_KEY = "subjects";
const SAFE_ATTENDANCE_THRESHOLD = 75;

function sanitizeName(name) {
  return typeof name === "string" ? name.trim() : "";
}

function normalizeSubject(raw) {
  return {
    id: raw?.id ?? Date.now(),
    name: sanitizeName(raw?.name),
    attended: Number(raw?.attended ?? 0),
    total: Number(raw?.total ?? 0),
  };
}

export function calculatePercentage(attended, total) {
  try {
    const a = Number(attended ?? 0);
    const t = Number(total ?? 0);
    if (!t) return 0;
    return Number(((a / t) * 100).toFixed(2));
  } catch {
    return 0;
  }
}

export function getSubjects() {
  try {
    const subjects = getData(SUBJECTS_KEY);
    if (!Array.isArray(subjects)) {
      return [];
    }
    return subjects.map(normalizeSubject);
  } catch {
    return [];
  }
}

export function addSubject(name) {
  try {
    const subjectName = sanitizeName(name);
    if (!subjectName) {
      return { success: false, message: "Subject name is required." };
    }

    const existing = getSubjects();
    const duplicate = existing.some((subject) => subject.name.toLowerCase() === subjectName.toLowerCase());
    if (duplicate) {
      return { success: false, message: "Subject already exists." };
    }

    const next = [
      ...existing,
      normalizeSubject({
        id: Date.now(),
        name: subjectName,
        attended: 0,
        total: 0,
      }),
    ];

    const stored = setData(SUBJECTS_KEY, next);
    if (!stored) {
      return { success: false, message: "Unable to save subject." };
    }

    return { success: true, subjects: next };
  } catch {
    return { success: false, message: "Unable to add subject." };
  }
}

function updateSubjectById(id, updater) {
  try {
    const targetId = String(id);
    const next = updateData(SUBJECTS_KEY, (subjects) => {
      const list = Array.isArray(subjects) ? subjects.map(normalizeSubject) : [];
      return list.map((subject) => {
        if (String(subject.id) !== targetId) return subject;
        return normalizeSubject(updater(subject));
      });
    });

    return Array.isArray(next) ? next : getSubjects();
  } catch {
    return getSubjects();
  }
}

export function markPresent(id) {
  try {
    const subjects = updateSubjectById(id, (subject) => ({
      ...subject,
      attended: Number(subject.attended ?? 0) + 1,
      total: Number(subject.total ?? 0) + 1,
    }));
    return { success: true, subjects };
  } catch {
    return { success: false, message: "Unable to mark attended." };
  }
}

export function markAbsent(id) {
  try {
    const subjects = updateSubjectById(id, (subject) => ({
      ...subject,
      total: Number(subject.total ?? 0) + 1,
    }));
    return { success: true, subjects };
  } catch {
    return { success: false, message: "Unable to mark absent." };
  }
}

export function getAttendanceStats() {
  try {
    const subjects = getSubjects();

    const totals = subjects.reduce(
      (acc, subject) => {
        acc.attended += Number(subject.attended ?? 0);
        acc.total += Number(subject.total ?? 0);
        return acc;
      },
      { attended: 0, total: 0 },
    );

    const overallPercentage = calculatePercentage(totals.attended, totals.total);
    const belowThresholdSubjects = subjects.filter(
      (subject) => calculatePercentage(subject.attended, subject.total) < SAFE_ATTENDANCE_THRESHOLD,
    );

    return {
      overallPercentage,
      totalSubjects: subjects.length,
      belowThresholdCount: belowThresholdSubjects.length,
      belowThresholdSubjects,
      safeThreshold: SAFE_ATTENDANCE_THRESHOLD,
    };
  } catch {
    return {
      overallPercentage: 0,
      totalSubjects: 0,
      belowThresholdCount: 0,
      belowThresholdSubjects: [],
      safeThreshold: SAFE_ATTENDANCE_THRESHOLD,
    };
  }
}
