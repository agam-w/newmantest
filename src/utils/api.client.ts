import { Address } from "viem";
import { $jwtToken } from "../stores/auth";
import { UserWithStats } from "../types";

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
  const data = (await res.json()) as { user: UserWithStats };
  return data;
}

export async function updateProfile(name: string) {
  const token = $jwtToken.get();

  const res = await fetch("/api/profile/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

      body: JSON.stringify({ fullname: name }),
    },
  });
  const data = (await res.json()) as { user: UserWithStats };
  return data;
}

export async function questDone(quest: string) {
  const token = $jwtToken.get();

  const res = await fetch("/api/quest-done", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quest }),
  });
  if (res.status !== 200) {
    console.log("res", res.statusText);
    throw new Error("Quest cannot be completed");
  }
  const data = (await res.json()) as { message: string };
  console.log("data", data);
}

export async function claimQuest(quest: string) {
  const token = $jwtToken.get();

  const res = await fetch("/api/claim", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quest }),
  });
  if (res.status !== 200) {
    console.log("res", res.statusText);
    // throw new Error("Quest cannot be claimed");
  }
  const data = (await res.json()) as { message: string };
  console.log("data", data);
}
