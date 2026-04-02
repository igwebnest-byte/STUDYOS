import { AppShell } from "@/components/common/app-shell";
import { AuthGuard } from "@/components/common/auth-guard";

export default function ProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
