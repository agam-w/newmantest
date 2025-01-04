import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { authGetToken, getProfile } from "./utils/api.client";
import { $jwtToken, $page, $profile } from "./stores/auth";
import { useStore } from "@nanostores/react";
import Popup from "./components/Popup";
import { Button } from "@headlessui/react";

export default function HomePage() {
  const account = useAccount();
  const jwtToken = useStore($jwtToken);
  const profile = useStore($profile);
  const page = useStore($page);
  const [visible, setVisible] = useState(false);

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
        // console.log("data", data);
        $profile.set(data.user);
      });
    }
  }, [jwtToken]);

  return (
    <div className="container">
      {page === "/home" && (
        <div>
          {!account.isConnected && (
            <div className="py-4">
              <p className="">
                Please connect wallet to complete task and earn points
              </p>
            </div>
          )}
          {account.isConnected && (
            <div className="py-4">
              <p className="font-medium">Connected Wallet:</p>
              <p className="text">wallet address: {account.address}</p>
              <br />
              <p className="font-medium">Profile:</p>
              <p className="text">name: {profile?.name}</p>
              <p className="text">address: {profile?.walletAddress}</p>
            </div>
          )}
        </div>
      )}
      {page === "/claim" && (
        <div>
          claim page
          <Button
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
            onClick={() => setVisible(true)}
          >
            claim
          </Button>
          <div className="hidden md:block">
            <Popup
              visible={visible}
              onClickClose={() => setVisible(false)}
              showCloseButton={true}
            >
              <div className="bg-white">check claim</div>
            </Popup>
          </div>
        </div>
      )}
    </div>
  );
}
