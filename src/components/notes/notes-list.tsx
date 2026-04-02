import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NoteAsset } from "@/types";

export function NotesList({ items }: { items: NoteAsset[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-xl border border-border/85 bg-muted/22 p-4 text-sm text-muted-foreground">
            No resources match the current filter.
          </p>
        ) : null}

        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-border/90 bg-muted/22 p-3 transition-all duration-200 hover:border-primary/35 hover:bg-muted/32">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold tracking-tight">{item.title}</p>
              <Badge variant={item.type === "note" ? "success" : "warning"}>
                {item.type.toUpperCase()}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.subject} - Uploaded on {item.uploadedAt}
            </p>

            <button
              type="button"
              className="mt-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-violet-300"
              onClick={() => {
                // Mock interaction for UI-only phase.
                window.alert(`Opening ${item.title} (mock preview)`);
              }}
            >
              Open resource
            </button>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
