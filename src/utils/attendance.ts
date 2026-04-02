import type { AttendanceSubject } from "@/types";

export function calculateAttendancePercentage(attendedClasses: number, totalClasses: number) {
  if (!totalClasses) {
    return 0;
  }

  return Math.round((attendedClasses / totalClasses) * 100);
}

export function getOverallAttendance(subjects: AttendanceSubject[]) {
  const totals = subjects.reduce(
    (acc, subject) => {
      acc.attended += subject.attendedClasses;
      acc.total += subject.totalClasses;
      return acc;
    },
    { attended: 0, total: 0 },
  );

  return calculateAttendancePercentage(totals.attended, totals.total);
}

export function getClassesNeededForSafeAttendance(
  attendedClasses: number,
  totalClasses: number,
  targetPercentage = 75,
) {
  if (totalClasses === 0) {
    return 0;
  }

  if ((attendedClasses / totalClasses) * 100 >= targetPercentage) {
    return 0;
  }

  let needed = 0;
  let attended = attendedClasses;
  let total = totalClasses;

  while ((attended / total) * 100 < targetPercentage) {
    attended += 1;
    total += 1;
    needed += 1;

    if (needed > 500) {
      break;
    }
  }

  return needed;
}

export function getSafeBunkCount(
  attendedClasses: number,
  totalClasses: number,
  targetPercentage = 75,
) {
  if (totalClasses === 0) {
    return 0;
  }

  if ((attendedClasses / totalClasses) * 100 < targetPercentage) {
    return 0;
  }

  let safeBunks = 0;

  // Simulate future absences until crossing below target.
  while (((attendedClasses / (totalClasses + safeBunks + 1)) * 100) >= targetPercentage) {
    safeBunks += 1;

    if (safeBunks > 500) {
      break;
    }
  }

  return safeBunks;
}
