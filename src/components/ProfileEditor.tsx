import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $isProfileEditing, $profile } from "@/stores/auth";
import { updateProfile } from "@/utils/api.client";
import { getProfileData } from "@/utils/action";
import { useToast } from "@/hooks/use-toast";

export default function ProfileEditor() {
  const isEditing = useStore($isProfileEditing);
  const [isSaving, setIsSaving] = useState(false);

  const profile = useStore($profile);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (!name) return;
    updateProfile(name as string).then(() => {
      // refresh
      getProfileData();
      setIsSaving(false);
      $isProfileEditing.set(false);
      toast({ description: "Profile updated successfully" });
    });
  };

  const walletAddressToShow = useMemo(() => {
    return `${profile?.walletAddress.substring(
      0,
      32
    )}...${profile?.walletAddress.slice(-3)}`;
  }, [profile?.walletAddress]);

  return (
    <div className="mt-4 sm:mt-6">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              {profile?.name || "-"}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              {walletAddressToShow}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center space-x-2 text-sm sm:text-base"
              onClick={() => $isProfileEditing.set(true)}
            >
              <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Edit Profile</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="edit"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={profile?.name}
                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
              />
            </div>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center space-x-2 text-sm sm:text-base"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span>{isSaving ? "Saving..." : "Save"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => $isProfileEditing.set(false)}
                className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center space-x-2 text-sm sm:text-base"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Cancel</span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
