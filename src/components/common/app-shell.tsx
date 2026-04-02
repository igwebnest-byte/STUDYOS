import { MobileNav, Sidebar } from "@/components/common/sidebar";
import { Navbar } from "@/components/common/navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen w-full max-w-[1320px] grid-cols-1 md:grid-cols-[288px_1fr]">
        <Sidebar />

        <div className="relative flex min-h-screen flex-col">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_4%,rgba(148,93,255,0.22),transparent_24%)]" />
          <Navbar />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <MobileNav />
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
