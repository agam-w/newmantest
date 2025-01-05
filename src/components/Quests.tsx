import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import { $profile } from "@/stores/auth";
import { questDone, claimQuest } from "@/utils/api.client";
import { getQuestClaimed, getQuestCompleted, quests } from "@/utils/quests";
import { useStore } from "@nanostores/react";

interface QuestsProps {
  onComplete: (points: number, badge: string) => void;
}

const localQuests = [
  { id: 1, name: "Daily Login", points: 10, badge: "Early Bird" },
  {
    id: 2,
    name: "Share on Social Media",
    points: 20,
    badge: "Social Butterfly",
  },
];

export default function Quests({ onComplete }: QuestsProps) {
  const profile = useStore($profile);

  const shareQuest = async () => {
    const url = window.location.href;
    // copy to clipboard
    await navigator.clipboard.writeText(url);
    console.log("url copied", url);
  };

  const [completedQuests, setCompletedQuests] = useState<number[]>([]);
  const [recentlyCompleted, setRecentlyCompleted] = useState<number | null>(
    null,
  );

  const handleCompleteQuest = (
    questId: number,
    points: number,
    badge: string,
  ) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests([...completedQuests, questId]);
      setRecentlyCompleted(questId);
      onComplete(points, badge);
      setTimeout(() => setRecentlyCompleted(null), 2000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Quests
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {localQuests.map((quest) => (
          <motion.div
            key={quest.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white bg-opacity-10 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-white border-opacity-20 relative overflow-hidden"
          >
            <div className="mb-2 sm:mb-0">
              <h3 className="font-bold text-base sm:text-lg">{quest.name}</h3>
              <p className="text-xs sm:text-sm text-gray-300">
                {quest.points} points - {quest.badge} badge
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold flex items-center space-x-2 text-xs sm:text-sm ${
                completedQuests.includes(quest.id)
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              }`}
              onClick={() =>
                handleCompleteQuest(quest.id, quest.points, quest.badge)
              }
              disabled={completedQuests.includes(quest.id)}
            >
              {completedQuests.includes(quest.id) ? (
                <>
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Completed</span>
                </>
              ) : (
                <span>Complete</span>
              )}
            </motion.button>
            <AnimatePresence>
              {recentlyCompleted === quest.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
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
        ))}

        <div className="space-y-2">
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
                <div>
                  <p className="font-medium">{quest.title}</p>
                  <p className="text">{quest.description}</p>
                  <p className="text-sm text-yellow-500">
                    Reward: {quest.points} points
                  </p>
                </div>
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
                                // refresh();
                              });
                            }, 3000);
                          } else if (quest.type === "profileName") {
                            // setShowEditProfile(true);
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
                      {claimed?.isClaimed && (
                        <p className="text-green-500">Claimed</p>
                      )}

                      {/* not claimed */}
                      {completed?.isCompleted && !claimed?.isClaimed && (
                        <button
                          className="rounded bg-green-600 py-2 px-4 text-sm text-white"
                          onClick={() => {
                            claimQuest(quest.type).then(() => {
                              // refresh();
                            });
                          }}
                        >
                          Claim Reward
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
