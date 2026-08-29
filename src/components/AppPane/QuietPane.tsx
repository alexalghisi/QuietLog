import { Button } from "@/components/ui/button";
import { evidence, inQuietHours } from "@/lib/noise";
import { useQuietStore } from "@/store/quietStore";

export function QuietPane() {
  const screen = useQuietStore((state) => state.screen);
  const incidents = useQuietStore((state) => state.incidents);
  const add = useQuietStore((state) => state.add);
  const pack = evidence(incidents);

  if (screen === "pack") {
    return (
      <div
        className="flex min-h-0 flex-1 flex-col justify-center gap-4 p-8"
        data-testid="evidence-pack"
      >
        <p className="text-[13px] text-muted-foreground">For the landlord, not the stairwell.</p>
        <p className="text-[28px] font-semibold tracking-tight">
          {String(pack.nightCount)} quiet-hours nights
        </p>
        <p className="text-[15px]" data-testid="pack-minutes">
          {String(pack.totalMinutes)} minutes across {String(pack.count)} incidents
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex gap-1 border-b border-border px-4 py-2">
        <Button
          size="sm"
          className="h-8 rounded-full px-3 text-[12px]"
          data-testid="add-party"
          onClick={() => add("party")}
        >
          Log party
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full px-3 text-[12px]"
          data-testid="add-drill"
          onClick={() => add("drill")}
        >
          Log drill
        </Button>
      </div>
      <ul className="min-h-0 flex-1 overflow-auto p-3">
        {incidents.map((item) => (
          <li
            key={item.id}
            data-testid={`incident-${item.id}`}
            className="flex items-center justify-between border-b border-border/70 py-3 text-[14px]"
          >
            <span>
              {item.at.replace("T", " ").slice(0, 16)} · {item.kind}
            </span>
            <span className="text-[12px] text-muted-foreground">
              {String(item.minutes)} min · {String(item.db)} dB
              {inQuietHours(item.at) ? " · quiet hours" : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
