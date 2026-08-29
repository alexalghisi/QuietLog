import { OPENING } from "@/lib/noise";
import { useQuietStore } from "./quietStore";

test("logging a party appends a quiet-hours row", () => {
  useQuietStore.setState({ incidents: OPENING });
  useQuietStore.getState().add("party");
  expect(useQuietStore.getState().incidents).toHaveLength(4);
  useQuietStore.getState().reset();
  expect(useQuietStore.getState().incidents).toHaveLength(3);
});
