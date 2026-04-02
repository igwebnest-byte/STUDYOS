import { BookOpen, CalendarClock, GraduationCap, Percent, Upload } from "lucide-react";

const features = [
  {
    title: "Attendance intelligence",
    description: "Track subject-wise attendance percentages and see safe bunk limits before they become risky.",
    icon: Percent,
  },
  {
    title: "Smart schedule dashboard",
    description: "See today\'s classes, labs, and exams in one clean schedule timeline.",
    icon: CalendarClock,
  },
  {
    title: "Notes + PYQ vault",
    description: "Upload and organize notes and previous year questions with subject filtering.",
    icon: Upload,
  },
  {
    title: "College-aware setup",
    description: "Select your college during onboarding or request your college if unavailable.",
    icon: GraduationCap,
  },
  {
    title: "Calendar with bunks",
    description: "Visualize holidays and bunked classes to make better attendance decisions.",
    icon: BookOpen,
  },
];

export function FeatureSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Core Features</p>
          <h2 className="mt-2 text-3xl font-semibold">Built for serious students, designed like modern SaaS.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            StudyOS keeps your daily academic operations focused and scalable, with architecture ready for future AI features.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="glass-panel p-5">
                <div className="inline-flex rounded-lg border border-border bg-muted p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
