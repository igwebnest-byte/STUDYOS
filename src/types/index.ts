export type ThemeMode = "dark" | "light";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  collegeId?: string;
}

export interface UserAccount extends AuthUser {
  password: string;
}

export interface SubjectClassRecord {
  id: string;
  date: string;
  topic: string;
  status: "present" | "absent" | "bunked";
}

export interface AttendanceSubject {
  id: string;
  name: string;
  code: string;
  faculty: string;
  totalClasses: number;
  attendedClasses: number;
  records: SubjectClassRecord[];
}

export interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  room: string;
  type: "class" | "lab" | "exam";
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: "holiday" | "bunk" | "exam" | "event";
  description?: string;
}

export interface NoteAsset {
  id: string;
  title: string;
  type: "note" | "pyq";
  subject: string;
  uploadedAt: string;
  fileUrl: string;
}

export interface College {
  id: string;
  name: string;
  city: string;
  state: string;
}

export interface CollegeRequest {
  id: string;
  name: string;
  city: string;
  state: string;
  requestedBy: string;
  requestedAt: string;
  status: "pending" | "approved";
}

export interface AttendanceSubjectSummary {
  id: string;
  name: string;
  percentage: number;
  totalClasses: number;
  attendedClasses: number;
}

export interface DashboardPayload {
  overallAttendance: number;
  attendanceBySubject: AttendanceSubjectSummary[];
  todaySchedule: ScheduleItem[];
}
