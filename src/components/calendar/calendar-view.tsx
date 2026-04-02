"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calendarEventsMock } from "@/data/mock-ui";
import type { CalendarEvent } from "@/types";

function toDateKey(year: number, month: number, day: number) {
  const mm = `${month + 1}`.padStart(2, "0");
  const dd = `${day}`.padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

const eventVariantMap: Record<CalendarEvent["type"], "default" | "success" | "warning" | "danger"> = {
  holiday: "success",
  bunk: "warning",
  exam: "danger",
  event: "default",
};

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = new Date(year, month, 1).getDay();

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();

    for (const event of calendarEventsMock) {
      if (!map.has(event.date)) {
        map.set(event.date, []);
      }

      map.get(event.date)?.push(event);
    }

    return map;
  }, []);

  const dayCells: Array<number | null> = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const selectedEvents = selectedDate ? eventsByDate.get(selectedDate) ?? [] : [];

  return (
    <div className="grid gap-5">
      <section>
        <p className="kpi-label">Calendar</p>
        <h1 className="section-heading mt-1">Monthly Planner</h1>
        <p className="section-caption mt-1">Track holidays, exams, events, and bunks with a clean visual calendar.</p>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Monthly calendar</CardTitle>
            <p className="section-caption">UI-only calendar for holidays, exams, events, and bunks.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {dayCells.map((day, index) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="h-24 rounded-lg border border-dashed border-border/60"
                    />
                  );
                }

                const dateKey = toDateKey(year, month, day);
                const dayEvents = eventsByDate.get(dateKey) ?? [];
                const isSelected = selectedDate === dateKey;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() => setSelectedDate(dateKey)}
                    className={`h-24 rounded-lg border p-1.5 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-primary/55 bg-primary/14 shadow-[0_10px_24px_-18px_rgba(133,77,255,0.98)]"
                        : "border-border/90 bg-muted/22 hover:border-primary/35 hover:bg-muted/35"
                    }`}
                  >
                    <p className="text-xs font-semibold">{day}</p>
                    <div className="mt-1 grid gap-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <Badge
                          key={event.id}
                          variant={eventVariantMap[event.type]}
                          className="truncate text-[10px]"
                        >
                          {event.title}
                        </Badge>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Badge variant="success">Holiday</Badge>
              <Badge variant="warning">Bunk</Badge>
              <Badge variant="danger">Exam</Badge>
              <Badge variant="default">Event</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedDate ? `Events on ${selectedDate}` : "Upcoming events"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(selectedDate ? selectedEvents : calendarEventsMock).slice(0, 6).map((event) => (
              <article key={event.id} className="rounded-xl border border-border/90 bg-muted/24 p-3 transition-all duration-200 hover:border-primary/35 hover:bg-muted/33">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold tracking-tight">{event.title}</p>
                  <Badge variant={eventVariantMap[event.type]}>{event.type}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{event.date}</p>
                {event.description ? (
                  <p className="mt-1 text-xs text-muted-foreground">{event.description}</p>
                ) : null}
              </article>
            ))}

            {(selectedDate ? selectedEvents : calendarEventsMock).length === 0 ? (
              <p className="text-sm text-muted-foreground">No events for selected date.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
