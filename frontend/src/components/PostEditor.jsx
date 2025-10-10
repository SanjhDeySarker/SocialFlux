import React, { useState } from "react";
import { createPost } from "../api/backend";

const PostEditor = () => {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const handlePost = async () => {
    try {
      await createPost({ content });
      setStatus("Post created successfully!");
      setContent("");
    } catch (err) {
      setStatus("Error creating post");
    }
  };

  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Create Post</h2>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here..."
      ></textarea>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handlePost}
      >
        Publish
      </button>
      {status && <p className="mt-2 text-green-600">{status}</p>}
    </div>
  );
};

export default PostEditor;
