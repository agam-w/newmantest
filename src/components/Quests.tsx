import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import { $isProfileEditing, $profile } from "@/stores/auth";
import { questDone, claimQuest } from "@/utils/api.client";
import {
  getBadgeByQuestType,
  getQuestClaimed,
  getQuestCompleted,
  quests,
} from "@/utils/quests";
import { useStore } from "@nanostores/react";
import { getProfileData } from "@/utils/action";
import { useToast } from "@/hooks/use-toast";

export default function Quests() {
  const profile = useStore($profile);
  const { toast } = useToast();

  const shareQuest = async () => {
    const url = window.location.href;
    // copy to clipboard
    await navigator.clipboard.writeText(url);
    toast({ description: "Link copied to clipboard" });
  };

  const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(
    null,
  );

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Quests
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {quests.map((quest) => {
          const completed = profile?.userStats
            ? getQuestCompleted(quest, profile.userStats)
            : undefined;
          const claimed = profile?.userStats
            ? getQuestClaimed(quest, profile.userStats)
            : undefined;
          return (
            <motion.div
              key={quest.type}
              whileHover={{ scale: 1.02 }}
              className="bg-white bg-opacity-10 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-white border-opacity-20 relative overflow-hidden"
            >
              <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-base sm:text-lg">
                  {quest.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  {quest.description}
                </p>
                <p className="text-sm">
                  <span className="text-yellow-300">{quest.points}</span> points
                  {" - "}
                  <span className="text-pink-300">
                    {getBadgeByQuestType(quest.type)}
                  </span>{" "}
                  badge
                </p>
              </div>
              <div className="flex gap-4">
                <div>
                  {profile?.userStats && (
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold flex items-center space-x-2 text-xs sm:text-sm ${
                          completed?.isCompleted
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        }`}
                        onClick={() => {
                          if (quest.type === "share") {
                            shareQuest();
                            setTimeout(() => {
                              questDone(quest.type).then(() => {
                                // refresh
                                getProfileData();
                              });
                            }, 3000);
                          } else if (quest.type === "profileName") {
                            $isProfileEditing.set(true);
                          }
                        }}
                        disabled={completed?.isCompleted}
                      >
                        {completed?.isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <span>{quest.type === "share" ? "Share" : "Go"}</span>
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>
                <div>
                  {profile?.userStats && (
                    <div>
                      {/* not claimed */}
                      {completed?.isCompleted && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold flex items-center space-x-2 text-xs sm:text-sm ${
                            claimed?.isClaimed
                              ? "bg-green-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          }`}
                          onClick={() => {
                            claimQuest(quest.type).then(() => {
                              setRecentlyCompleted(quest.type);
                              setTimeout(
                                () => setRecentlyCompleted(null),
                                2000,
                              );
                              // refresh
                              getProfileData();
                            });
                          }}
                          disabled={claimed?.isClaimed}
                        >
                          {claimed?.isClaimed ? (
                            <>
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Claimed</span>
                            </>
                          ) : (
                            <span>Claim Reward</span>
                          )}
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {recentlyCompleted === quest.type && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
