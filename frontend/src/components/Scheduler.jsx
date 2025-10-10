import React, { useEffect, useState } from "react";
import { getScheduledPosts } from "../api/backend";

const Scheduler = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getScheduledPosts().then(res => setPosts(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Scheduled Posts</h2>
      {posts.length === 0 ? (
        <p>No scheduled posts</p>
      ) : (
        <ul className="list-disc pl-5">
          {posts.map((p, i) => (
            <li key={i}>{p.content} — {new Date(p.scheduled_at).toLocaleString()}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scheduler;
