import { AuthLayoutCard } from "@/components/auth/auth-layout-card";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthLayoutCard title="Create your account" subtitle="Get your StudyOS workspace ready in under a minute.">
      <SignupForm />
    </AuthLayoutCard>
  );
}
