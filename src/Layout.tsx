import { PropsWithChildren } from "react";
import ConnectWalletButton from "./components/ConnectWalletButton";
import { $page } from "./stores/auth";
import { useStore } from "@nanostores/react";
import classNames from "classnames";

export default function Layout({ children }: PropsWithChildren) {
  const page = useStore($page);
  return (
    <div>
      <nav className="">
        <div className="container flex justify-between items-center py-4">
          <div className="flex gap-4">
            <h3
              onClick={() => $page.set("/home")}
              className={classNames("text-xl font-medium  cursor-pointer", {
                "text-blue-500": page === "/home",
              })}
            >
              Home
            </h3>
            <h3
              onClick={() => $page.set("/claim")}
              className={classNames("text-xl font-medium  cursor-pointer", {
                "text-blue-500": page === "/claim",
              })}
            >
              Claim
            </h3>
          </div>

          <ConnectWalletButton />
        </div>
      </nav>

      {children}
    </div>
  );
}
