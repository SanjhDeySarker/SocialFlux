import { motion } from "framer-motion";
import PostEditor from "../components/PostEditor";
import Scheduler from "../components/Scheduler";
import AIChat from "../components/AIChat";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-5 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold mb-3">Create Post</h2>
        <PostEditor />
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-5 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold mb-3">Schedule Posts</h2>
        <Scheduler />
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="md:col-span-2 bg-white p-5 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold mb-3">AI Insights</h2>
        <AIChat />
      </motion.div>
    </motion.div>
  );
}
