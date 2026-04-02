import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel bg-gradient-to-br from-primary/25 via-card/90 to-indigo-500/20 p-8 sm:p-10">
          <h2 className="text-3xl font-semibold">Ready to take control of your semester?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Create your account, select your college, and start tracking attendance and resources with a product built to scale.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/signup">
              <Button size="lg">Start With StudyOS</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
