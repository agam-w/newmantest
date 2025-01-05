import { $profile } from "@/stores/auth";
import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { Star, Medal } from "lucide-react";
import ProfileEditor from "./ProfileEditor";

interface ProfileProps {
  badges: string[];
}

export default function Profile({ badges }: ProfileProps) {
  const profile = useStore($profile);

  return (
    <div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Profile
        </h2>
        <div className="flex items-center mb-4">
          <Star className="text-yellow-400 mr-2 w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-lg sm:text-xl">
            {profile?.userStats.totalPoints} Points
          </span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full shadow-lg"
            >
              <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="sr-only">{badge}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <ProfileEditor />
    </div>
  );
}
