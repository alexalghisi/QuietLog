export type Kind = "party" | "drill" | "bass";

export type Incident = {
  id: string;
  at: string;
  kind: Kind;
  minutes: number;
  db: number;
};

export const QUIET_START = 22;
export const QUIET_END = 8;

export function hourOf(iso: string): number {
  return Number(iso.slice(11, 13));
}

export function inQuietHours(iso: string): boolean {
  const hour = hourOf(iso);
  return hour >= QUIET_START || hour < QUIET_END;
}

export type Evidence = {
  count: number;
  nightCount: number;
  totalMinutes: number;
};

export function evidence(incidents: Incident[]): Evidence {
  return {
    count: incidents.length,
    nightCount: incidents.filter((item) => inQuietHours(item.at)).length,
    totalMinutes: incidents.reduce((sum, item) => sum + item.minutes, 0),
  };
}

export const OPENING: Incident[] = [
  { id: "sat", at: "2026-08-22T23:40:00", kind: "party", minutes: 90, db: 68 },
  { id: "sun", at: "2026-08-23T14:10:00", kind: "drill", minutes: 40, db: 74 },
  { id: "wed", at: "2026-08-26T00:15:00", kind: "bass", minutes: 55, db: 71 },
];
