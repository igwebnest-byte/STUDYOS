import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
}

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold">{value}</p>
        {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
      </CardContent>
    </Card>
  );
}
