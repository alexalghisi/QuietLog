import { OPENING, evidence, inQuietHours } from "./noise";

test("23:40 and 00:15 are quiet hours; a Sunday drill is not", () => {
  expect(inQuietHours("2026-08-22T23:40:00")).toBe(true);
  expect(inQuietHours("2026-08-26T00:15:00")).toBe(true);
  expect(inQuietHours("2026-08-23T14:10:00")).toBe(false);
});

test("the opening pack is two nights and 185 minutes", () => {
  expect(evidence(OPENING)).toEqual({ count: 3, nightCount: 2, totalMinutes: 185 });
});
