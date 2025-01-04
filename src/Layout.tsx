import { PropsWithChildren } from "react";
import ConnectWalletButton from "./components/ConnectWalletButton";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <nav className="">
        <div className="container flex justify-between items-center p-4">
          <h1 className="text-xl font-medium text-neutral-800 md:text-4xl">
            Newman
          </h1>

          <ConnectWalletButton />
        </div>
      </nav>

      {children}
    </div>
  );
}
