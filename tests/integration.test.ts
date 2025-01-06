import { test, expect } from "vitest";

const baseUrl = "http://localhost:5173";

async function getAuthToken(address: string) {
  const res = await fetch(baseUrl + "/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });
  const data = (await res.json()) as { token: string };
  return data.token;
}

test("getAuthToken", async () => {
  const token = await getAuthToken("0x123456");
  expect(token).toBeTypeOf("string");
});
