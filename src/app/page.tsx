import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Clock3,
  NotebookPen,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Overall Attendance", value: "82%", hint: "Target 75%" },
  { label: "Classes Today", value: "4", hint: "2 theory + 1 lab + 1 quiz" },
  { label: "Notes + PYQ", value: "24", hint: "Resources in your library" },
];

const previewSchedule = [
  { time: "09:00", subject: "Mathematics IV", room: "A-203" },
  { time: "10:15", subject: "Operating Systems", room: "C-102" },
  { time: "01:30", subject: "DBMS Lab", room: "Lab-4" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="kpi-label">StudyOS</p>
            <h1 className="section-heading mt-1">Student Dashboard, Simplified</h1>
            <p className="section-caption mt-2 max-w-2xl">
              Track attendance, follow your timetable, and organize notes in one
              modern dark-first workspace.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.label} className="surface-card-hover">
              <CardContent className="space-y-2">
                <p className="kpi-label">{item.label}</p>
                <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenCheck className="h-4 w-4 text-primary" />
                Attendance Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <article className="rounded-xl border border-border/90 bg-muted/24 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">Operating Systems</p>
                  <Badge variant="success">85%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  34 / 40 classes attended · 2 safe bunks available
                </p>
              </article>
              <article className="rounded-xl border border-border/90 bg-muted/24 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">Microprocessors</p>
                  <Badge variant="warning">71%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Below threshold · attend next 3 classes to recover
                </p>
              </article>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Today&apos;s Timetable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {previewSchedule.map((slot) => (
                <div
                  key={`${slot.time}-${slot.subject}`}
                  className="flex items-center justify-between rounded-xl border border-border/90 bg-muted/24 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold">{slot.subject}</p>
                    <p className="text-xs text-muted-foreground">{slot.room}</p>
                  </div>
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    {slot.time}
                  </p>
                </div>
              ))}
              <div className="rounded-xl border border-border/90 bg-muted/24 px-3 py-2.5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold">
                  <NotebookPen className="h-4 w-4 text-primary" />
                  Notes + PYQ ready
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Open your library to revise subject-wise resources.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
