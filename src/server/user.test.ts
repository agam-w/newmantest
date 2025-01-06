import { expect, test } from "vitest";
import { createJwtToken } from "./user";

test("createJwtToken", () => {
  expect(createJwtToken({ id: 1, address: "0x123456" })).toBeTypeOf("string");
});
