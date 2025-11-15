import { motion } from "framer-motion";

export default function EditPostModal({ post, onClose, onSave }) {
  if (!post) return null;

  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    onSave({ ...post, content });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[400px] shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold">Edit Post</h2>

        <textarea
          className="w-full p-3 border bg-transparent rounded dark:border-gray-700"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
