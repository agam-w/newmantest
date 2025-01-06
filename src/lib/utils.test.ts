import { test, expect } from "vitest";
import { cn } from "./utils";

test("cn", () => {
  expect(cn("flex", "items-center", "justify-center")).toBe(
    "flex items-center justify-center",
  );

  expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
});
