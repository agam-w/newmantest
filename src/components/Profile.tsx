import { $profile } from "@/stores/auth";
import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { Star, Bird, HandMetal, Share2 } from "lucide-react";
import ProfileEditor from "./ProfileEditor";
import { useMemo } from "react";
import { QuestType } from "@/types";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { getBadgeByQuestType } from "@/utils/quests";

export default function Profile() {
  const profile = useStore($profile);

  const badges: QuestType[] = useMemo(() => {
    if (!profile?.userStats) {
      return [];
    }
    const { questConnectClaimed, questProfileNameClaimed, questShareClaimed } =
      profile.userStats;

    return [
      questConnectClaimed ? "connect" : null,
      questProfileNameClaimed ? "profileName" : null,
      questShareClaimed ? "share" : null,
    ].filter(Boolean) as QuestType[];
  }, [profile]);

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                      "p-2 rounded-full shadow-lg",
                      badge === "connect" &&
                        "bg-gradient-to-r from-yellow-400 to-pink-600",
                      badge === "profileName" &&
                        "bg-gradient-to-r from-green-400 to-blue-600",
                      badge === "share" &&
                        "bg-gradient-to-r from-blue-400 to-purple-600"
                    )}
                  >
                    {badge === "connect" && (
                      <Bird className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                    {badge === "profileName" && (
                      <HandMetal className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                    {badge === "share" && (
                      <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                    <span className="sr-only">{badge}</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>{getBadgeByQuestType(badge)}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <ProfileEditor />
    </div>
  );
}
