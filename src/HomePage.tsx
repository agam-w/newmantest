import { useEffect } from "react";
import { useAccount } from "wagmi";
import { authGetToken, getProfile } from "./utils/api.client";
import { $jwtToken } from "./stores/auth";
import { useStore } from "@nanostores/react";

export default function HomePage() {
  const account = useAccount();
  const jwtToken = useStore($jwtToken);

  useEffect(() => {
    if (account.address) {
      authGetToken(account.address).then((token) => {
        // console.log("token", token);
        $jwtToken.set(token);
      });
    }
  }, [account]);

  useEffect(() => {
    if (jwtToken) {
      getProfile().then((data) => {
        console.log("data", data);
      });
    }
  }, [jwtToken]);

  return (
    <div className="container">
      {!account.isConnected && (
        <div className="py-4">
          <p className="">Please connect wallet to earn points</p>
        </div>
      )}
      {account.isConnected && (
        <div className="py-4">
          <p className="font-medium">Connected Account:</p>
          <p className="text">wallet address: {account.address}</p>

          <p className="font-medium">Profile:</p>
          {/* <p className="text">name: {profile?.name}</p> */}
        </div>
      )}
    </div>
  );
}
