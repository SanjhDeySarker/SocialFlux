import { MessageCircle, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between items-center px-6 py-3 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2">
        <MessageCircle size={22} className="text-blue-600" />
        <h1 className="text-xl font-semibold">SocialFlux</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
          <Calendar size={16} /> New Post
        </button>
        <div className="p-1 rounded-full border">
          <User size={20} />
        </div>
      </div>
    </motion.header>
  );
}
