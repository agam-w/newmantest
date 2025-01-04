import { Address } from "viem";
import { $jwtToken } from "../stores/auth";
import { User } from "../types";

export async function authGetToken(address: Address) {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });
  const data = (await res.json()) as { token: string };
  return data.token;
}

export async function getProfile() {
  const token = $jwtToken.get();

  const res = await fetch("/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await res.json()) as { user: User };
  return data;
}
