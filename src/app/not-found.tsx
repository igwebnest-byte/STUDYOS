import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel max-w-md p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This page is not available in your StudyOS workspace.</p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-primary">
          Go to home
        </Link>
      </div>
    </main>
  );
}
