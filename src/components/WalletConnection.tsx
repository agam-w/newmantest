import { motion } from 'framer-motion'

interface WalletConnectionProps {
  isConnected: boolean
  onConnect: () => void
}

export default function WalletConnection({ isConnected, onConnect }: WalletConnectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Wallet Connection</h2>
      {isConnected ? (
        <p className="text-green-400">Wallet Connected</p>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          onClick={onConnect}
        >
          Connect Wallet
        </motion.button>
      )}
    </div>
  )
}

