import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, Medal, Trophy, ChevronRight, Loader2 } from 'lucide-react'
import Profile from './components/Profile'
import ProfileEditor from './components/ProfileEditor'
import NFTDisplay from './components/NFTDisplay'
import Quests from './components/Quests'

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [userBadges, setUserBadges] = useState([])
  const [userInfo, setUserInfo] = useState({
    name: 'Crypto Enthusiast',
    bio: 'I love collecting NFTs and earning rewards!'
  })

  const connectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnecting(false)
    setIsWalletConnected(true)
  }

  const completeQuest = (points: number, badge: string) => {
    setUserPoints(prevPoints => prevPoints + points)
    setUserBadges(prevBadges => [...prevBadges, badge])
  }

  const saveUserInfo = (newUserInfo: { name: string; bio: string }) => {
    setUserInfo(newUserInfo)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
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
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          NFT Membership Portal
        </h1>
        
        <AnimatePresence mode="wait">
          {!isWalletConnected ? (
            <motion.div
              key="not-connected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8 sm:space-y-12"
            >
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Unlock the World of Digital Collectibles
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                  Connect your wallet to dive into a universe of exclusive NFTs, thrilling quests, and amazing rewards.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center space-x-3 mx-auto"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                {!isConnecting && <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              </motion.button>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-16">
                <FeatureCard
                  icon={<Medal className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />}
                  title="Earn Badges"
                  description="Complete quests and showcase your unique achievements in the NFT world"
                />
                <FeatureCard
                  icon={<Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-green-400" />}
                  title="Collect Rewards"
                  description="Accumulate points and redeem them for exclusive NFTs and perks"
                />
                <FeatureCard
                  icon={<Wallet className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />}
                  title="Manage NFTs"
                  description="View, organize, and showcase your digital assets in one place"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="connected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20"
                >
                  <Profile points={userPoints} badges={userBadges} />
                  <ProfileEditor initialUserInfo={userInfo} onSave={saveUserInfo} />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20"
                >
                  <NFTDisplay />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20"
              >
                <Quests onComplete={completeQuest} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="fixed bottom-4 right-4 flex space-x-2 sm:space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <IconButton icon={<Wallet className="w-5 h-5 sm:w-6 sm:h-6" />} color="bg-purple-500" />
          <IconButton icon={<Medal className="w-5 h-5 sm:w-6 sm:h-6" />} color="bg-pink-500" />
          <IconButton icon={<Trophy className="w-5 h-5 sm:w-6 sm:h-6" />} color="bg-blue-500" />
        </motion.div>
      </motion.div>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-10 p-6 sm:p-8 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20 text-center"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 sm:mb-6"
      >
        {icon}
      </motion.div>
      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-sm sm:text-base text-gray-300"
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

function IconButton({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`${color} p-2 sm:p-3 rounded-full shadow-lg`}
    >
      {icon}
    </motion.div>
  )
}

