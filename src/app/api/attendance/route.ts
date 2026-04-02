import { NextResponse } from "next/server";

import { listAttendanceSubjects } from "@/data/mock-db";
import { calculateAttendancePercentage, getClassesNeededForSafeAttendance } from "@/utils/attendance";

export async function GET() {
  const subjects = listAttendanceSubjects().map((subject) => {
    const percentage = calculateAttendancePercentage(subject.attendedClasses, subject.totalClasses);

    return {
      ...subject,
      percentage,
      classesNeededFor75: getClassesNeededForSafeAttendance(
        subject.attendedClasses,
        subject.totalClasses,
        75,
      ),
    };
  });

  return NextResponse.json({ subjects });
}
