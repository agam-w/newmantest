import { expect, test } from "vitest";
import { createJwtToken, findUserByAddress } from "./user";

test("createJwtToken", () => {
  expect(createJwtToken({ id: 1, address: "0x123456" })).toBeTypeOf("string");
});

test("findUserByAddress", async () => {
  const user = await findUserByAddress("0x12356");
  expect(user).toBeUndefined();
});
