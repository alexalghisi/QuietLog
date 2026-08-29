import { create } from "zustand";
import { OPENING, type Incident, type Kind } from "@/lib/noise";

export type QuietScreen = "log" | "pack";

interface QuietState {
  screen: QuietScreen;
  incidents: Incident[];
  setScreen: (screen: QuietScreen) => void;
  add: (kind: Kind) => void;
  reset: () => void;
}

let next = 1;

export const useQuietStore = create<QuietState>((set) => ({
  screen: "log",
  incidents: OPENING,
  setScreen: (screen) => set({ screen }),
  add: (kind) =>
    set((state) => ({
      incidents: [
        ...state.incidents,
        {
          id: `new-${String(next++)}`,
          at: "2026-08-28T23:05:00",
          kind,
          minutes: 35,
          db: 70,
        },
      ],
    })),
  reset: () => set({ incidents: OPENING, screen: "log" }),
}));
