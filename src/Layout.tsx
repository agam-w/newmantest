import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import ConnectWalletButton from "./components/ConnectWalletButton";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="hidden md:block absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white bg-opacity-5 rounded-full"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <nav className="container px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Newman
          </h1>

          <ConnectWalletButton />
        </div>
      </nav>

      <div className="py-6">{children}</div>
    </main>
  );
}
