import { AuthLayoutCard } from "@/components/auth/auth-layout-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayoutCard title="Welcome back" subtitle="Sign in to continue managing your semester.">
      <LoginForm />
    </AuthLayoutCard>
  );
}
