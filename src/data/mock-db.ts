import type {
  AttendanceSubject,
  AuthUser,
  CalendarEvent,
  College,
  CollegeRequest,
  NoteAsset,
  ScheduleItem,
  UserAccount,
} from "@/types";

export const mockColleges: College[] = [
  { id: "clg-1", name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu" },
  { id: "clg-2", name: "IIT Bombay", city: "Mumbai", state: "Maharashtra" },
  { id: "clg-3", name: "Delhi Technological University", city: "New Delhi", state: "Delhi" },
  { id: "clg-4", name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu" },
];

const users: UserAccount[] = [
  {
    id: "user-1",
    name: "Aarav Sharma",
    email: "student@studyos.app",
    password: "password123",
    collegeId: "clg-4",
  },
];

const collegeSelectionByUser: Record<string, string> = {
  "student@studyos.app": "clg-4",
};

const collegeRequests: CollegeRequest[] = [
  {
    id: "cr-1",
    name: "Government Engineering College",
    city: "Jaipur",
    state: "Rajasthan",
    requestedBy: "student@studyos.app",
    requestedAt: "2026-03-30",
    status: "pending",
  },
];

const attendanceSubjects: AttendanceSubject[] = [
  {
    id: "sub-1",
    name: "Mathematics IV",
    code: "MA402",
    faculty: "Prof. Rao",
    totalClasses: 42,
    attendedClasses: 37,
    records: [
      { id: "m1", date: "2026-03-24", topic: "Laplace Transforms", status: "present" },
      { id: "m2", date: "2026-03-26", topic: "Fourier Series", status: "present" },
      { id: "m3", date: "2026-03-28", topic: "PDE Applications", status: "absent" },
      { id: "m4", date: "2026-03-31", topic: "Numerical Methods", status: "present" },
      { id: "m5", date: "2026-04-01", topic: "Tutorial", status: "bunked" },
    ],
  },
  {
    id: "sub-2",
    name: "Operating Systems",
    code: "CS408",
    faculty: "Dr. Sen",
    totalClasses: 39,
    attendedClasses: 33,
    records: [
      { id: "o1", date: "2026-03-23", topic: "Process Scheduling", status: "present" },
      { id: "o2", date: "2026-03-25", topic: "Deadlocks", status: "present" },
      { id: "o3", date: "2026-03-27", topic: "Memory Management", status: "absent" },
      { id: "o4", date: "2026-03-30", topic: "Virtual Memory", status: "present" },
      { id: "o5", date: "2026-04-01", topic: "File Systems", status: "present" },
    ],
  },
  {
    id: "sub-3",
    name: "Database Systems",
    code: "CS406",
    faculty: "Prof. Mehta",
    totalClasses: 36,
    attendedClasses: 31,
    records: [
      { id: "d1", date: "2026-03-22", topic: "Normalization", status: "present" },
      { id: "d2", date: "2026-03-24", topic: "Transactions", status: "present" },
      { id: "d3", date: "2026-03-29", topic: "Indexing", status: "bunked" },
      { id: "d4", date: "2026-03-31", topic: "Recovery", status: "present" },
      { id: "d5", date: "2026-04-01", topic: "Query Optimization", status: "present" },
    ],
  },
];

const todaySchedule: ScheduleItem[] = [
  { id: "sch-1", subject: "Mathematics IV", time: "09:00 AM - 10:00 AM", room: "A-203", type: "class" },
  { id: "sch-2", subject: "Operating Systems", time: "10:15 AM - 11:15 AM", room: "C-102", type: "class" },
  { id: "sch-3", subject: "DBMS Lab", time: "01:30 PM - 03:30 PM", room: "Lab-4", type: "lab" },
  { id: "sch-4", subject: "Microprocessor Quiz", time: "04:00 PM - 04:30 PM", room: "Online", type: "exam" },
];

const calendarEvents: CalendarEvent[] = [
  { id: "ev-1", date: "2026-04-03", title: "Ram Navami", type: "holiday", description: "Institute holiday" },
  { id: "ev-2", date: "2026-04-05", title: "Bunked Operating Systems", type: "bunk", description: "Skipped class" },
  { id: "ev-3", date: "2026-04-10", title: "Mid-Sem DBMS", type: "exam", description: "Room C-210" },
  { id: "ev-4", date: "2026-04-14", title: "Institute Fest", type: "event", description: "No regular classes" },
];

const noteAssets: NoteAsset[] = [
  {
    id: "n-1",
    title: "OS Unit 3 Notes",
    type: "note",
    subject: "Operating Systems",
    uploadedAt: "2026-03-29",
    fileUrl: "https://example.com/mock/os-unit-3.pdf",
  },
  {
    id: "n-2",
    title: "DBMS PYQ 2023",
    type: "pyq",
    subject: "Database Systems",
    uploadedAt: "2026-03-30",
    fileUrl: "https://example.com/mock/dbms-pyq-2023.pdf",
  },
];

export function listUsers() {
  return users;
}

export function addUser(user: UserAccount) {
  users.push(user);
  return user;
}

export function findUserByEmail(email: string) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function getSafeUser(account: UserAccount): AuthUser {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    collegeId: account.collegeId,
  };
}

export function listAttendanceSubjects() {
  return attendanceSubjects;
}

export function listTodaySchedule() {
  return todaySchedule;
}

export function listCalendarEvents() {
  return calendarEvents;
}

export function listNotes() {
  return noteAssets;
}

export function addNote(asset: NoteAsset) {
  noteAssets.unshift(asset);
  return asset;
}

export function listColleges() {
  return mockColleges;
}

export function listCollegeRequests() {
  return collegeRequests;
}

export function addCollegeRequest(request: CollegeRequest) {
  collegeRequests.unshift(request);
  return request;
}

export function getSelectedCollegeForUser(email: string) {
  return collegeSelectionByUser[email.toLowerCase()];
}

export function setSelectedCollegeForUser(email: string, collegeId: string) {
  collegeSelectionByUser[email.toLowerCase()] = collegeId;
}
