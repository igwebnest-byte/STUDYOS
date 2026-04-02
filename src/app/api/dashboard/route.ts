import { NextResponse } from "next/server";

import { listAttendanceSubjects, listTodaySchedule } from "@/data/mock-db";
import { calculateAttendancePercentage, getOverallAttendance } from "@/utils/attendance";

export async function GET() {
  const subjects = listAttendanceSubjects();
  const todaySchedule = listTodaySchedule();

  const attendanceBySubject = subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    totalClasses: subject.totalClasses,
    attendedClasses: subject.attendedClasses,
    percentage: calculateAttendancePercentage(subject.attendedClasses, subject.totalClasses),
  }));

  return NextResponse.json({
    overallAttendance: getOverallAttendance(subjects),
    attendanceBySubject,
    todaySchedule,
  });
}
