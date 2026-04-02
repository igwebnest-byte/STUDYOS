import type {
  AttendanceSubject,
  CalendarEvent,
  NoteAsset,
  ScheduleItem,
} from "@/types";

export interface TimetableSlot {
  id: string;
  time: string;
  subject: string;
  room: string;
  type: "class" | "lab" | "exam";
}

export interface TimetableDay {
  id: string;
  day: string;
  slots: TimetableSlot[];
}

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");

function makeDate(day: number) {
  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

export const attendanceSubjectsMock: AttendanceSubject[] = [
  {
    id: "sub-1",
    name: "Operating Systems",
    code: "CS408",
    faculty: "Dr. Sen",
    totalClasses: 40,
    attendedClasses: 34,
    records: [
      { id: "os-1", date: makeDate(1), topic: "Process Scheduling", status: "present" },
      { id: "os-2", date: makeDate(2), topic: "Deadlocks", status: "present" },
      { id: "os-3", date: makeDate(3), topic: "Memory Management", status: "absent" },
      { id: "os-4", date: makeDate(4), topic: "Virtual Memory", status: "present" },
      { id: "os-5", date: makeDate(5), topic: "File Systems", status: "bunked" },
    ],
  },
  {
    id: "sub-2",
    name: "Database Systems",
    code: "CS406",
    faculty: "Prof. Mehta",
    totalClasses: 38,
    attendedClasses: 33,
    records: [
      { id: "db-1", date: makeDate(1), topic: "Normalization", status: "present" },
      { id: "db-2", date: makeDate(2), topic: "Transactions", status: "present" },
      { id: "db-3", date: makeDate(3), topic: "Indexing", status: "present" },
      { id: "db-4", date: makeDate(4), topic: "Recovery", status: "absent" },
      { id: "db-5", date: makeDate(5), topic: "Query Optimization", status: "present" },
    ],
  },
  {
    id: "sub-3",
    name: "Mathematics IV",
    code: "MA402",
    faculty: "Prof. Rao",
    totalClasses: 42,
    attendedClasses: 36,
    records: [
      { id: "ma-1", date: makeDate(1), topic: "Laplace Transforms", status: "present" },
      { id: "ma-2", date: makeDate(2), topic: "Fourier Series", status: "present" },
      { id: "ma-3", date: makeDate(3), topic: "PDE", status: "present" },
      { id: "ma-4", date: makeDate(4), topic: "Numerical Methods", status: "bunked" },
      { id: "ma-5", date: makeDate(5), topic: "Tutorial", status: "absent" },
    ],
  },
  {
    id: "sub-4",
    name: "Microprocessors",
    code: "EC404",
    faculty: "Dr. Kapoor",
    totalClasses: 34,
    attendedClasses: 24,
    records: [
      { id: "mp-1", date: makeDate(1), topic: "8086 Architecture", status: "present" },
      { id: "mp-2", date: makeDate(2), topic: "Addressing Modes", status: "absent" },
      { id: "mp-3", date: makeDate(3), topic: "Instruction Set", status: "bunked" },
      { id: "mp-4", date: makeDate(4), topic: "Assembler", status: "present" },
      { id: "mp-5", date: makeDate(5), topic: "Interfacing", status: "present" },
    ],
  },
];

export const todayScheduleMock: ScheduleItem[] = [
  {
    id: "sch-1",
    subject: "Mathematics IV",
    time: "09:00 AM - 10:00 AM",
    room: "A-203",
    type: "class",
  },
  {
    id: "sch-2",
    subject: "Operating Systems",
    time: "10:15 AM - 11:15 AM",
    room: "C-102",
    type: "class",
  },
  {
    id: "sch-3",
    subject: "DBMS Lab",
    time: "01:30 PM - 03:30 PM",
    room: "Lab-4",
    type: "lab",
  },
  {
    id: "sch-4",
    subject: "Microprocessor Quiz",
    time: "04:00 PM - 04:30 PM",
    room: "Online",
    type: "exam",
  },
];

export const weeklyTimetableMock: TimetableDay[] = [
  {
    id: "mon",
    day: "Mon",
    slots: [
      { id: "m1", time: "09:00", subject: "OS", room: "C-102", type: "class" },
      { id: "m2", time: "10:15", subject: "DBMS", room: "A-104", type: "class" },
      { id: "m3", time: "01:30", subject: "DBMS Lab", room: "Lab-4", type: "lab" },
    ],
  },
  {
    id: "tue",
    day: "Tue",
    slots: [
      { id: "t1", time: "09:00", subject: "Math IV", room: "A-203", type: "class" },
      { id: "t2", time: "11:30", subject: "Microprocessors", room: "E-201", type: "class" },
      { id: "t3", time: "03:00", subject: "OS Tutorial", room: "C-106", type: "class" },
    ],
  },
  {
    id: "wed",
    day: "Wed",
    slots: [
      { id: "w1", time: "10:00", subject: "DBMS", room: "A-104", type: "class" },
      { id: "w2", time: "12:00", subject: "Math IV", room: "A-203", type: "class" },
    ],
  },
  {
    id: "thu",
    day: "Thu",
    slots: [
      { id: "th1", time: "09:00", subject: "OS", room: "C-102", type: "class" },
      { id: "th2", time: "01:00", subject: "Microprocessor Lab", room: "Lab-2", type: "lab" },
    ],
  },
  {
    id: "fri",
    day: "Fri",
    slots: [
      { id: "f1", time: "09:30", subject: "Math IV", room: "A-203", type: "class" },
      { id: "f2", time: "11:30", subject: "OS", room: "C-102", type: "class" },
      { id: "f3", time: "02:00", subject: "Microprocessor Quiz", room: "Online", type: "exam" },
    ],
  },
];

export const calendarEventsMock: CalendarEvent[] = [
  {
    id: "event-1",
    date: makeDate(3),
    title: "Institute Holiday",
    type: "holiday",
    description: "Campus closed for local holiday",
  },
  {
    id: "event-2",
    date: makeDate(5),
    title: "Bunked OS Class",
    type: "bunk",
    description: "Skipped morning OS lecture",
  },
  {
    id: "event-3",
    date: makeDate(10),
    title: "DBMS Mid-Sem",
    type: "exam",
    description: "Room C-210",
  },
  {
    id: "event-4",
    date: makeDate(14),
    title: "College Fest",
    type: "event",
    description: "No regular afternoon classes",
  },
  {
    id: "event-5",
    date: makeDate(21),
    title: "Bunked Math Tutorial",
    type: "bunk",
    description: "Skipped remedial class",
  },
];

export const notesMock: NoteAsset[] = [
  {
    id: "note-1",
    title: "Operating Systems Unit 3 Notes",
    type: "note",
    subject: "Operating Systems",
    uploadedAt: makeDate(2),
    fileUrl: "#",
  },
  {
    id: "note-2",
    title: "DBMS PYQ 2023",
    type: "pyq",
    subject: "Database Systems",
    uploadedAt: makeDate(1),
    fileUrl: "#",
  },
  {
    id: "note-3",
    title: "Math IV Formula Sheet",
    type: "note",
    subject: "Mathematics IV",
    uploadedAt: makeDate(4),
    fileUrl: "#",
  },
  {
    id: "note-4",
    title: "Microprocessor PYQ 2022",
    type: "pyq",
    subject: "Microprocessors",
    uploadedAt: makeDate(5),
    fileUrl: "#",
  },
];
