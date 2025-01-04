import { useAccount } from "wagmi";

export default function HomePage() {
  const account = useAccount();

  return (
    <div className="container">
      <div className="py-4">
        <p className="font-medium">Connected Account:</p>
        <p className="text">{account.address}</p>
      </div>
    </div>
  );
}
