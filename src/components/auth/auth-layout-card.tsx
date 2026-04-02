import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayoutCard({ title, subtitle, children }: AuthLayoutCardProps) {
  return (
    <Card className="w-full max-w-md border-border/80 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
