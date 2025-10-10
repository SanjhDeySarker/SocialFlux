import React from "react";
import PostEditor from "../components/PostEditor";
import Scheduler from "../components/Scheduler";
import AIChat from "../components/AIChat";

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">SocialFlux Dashboard</h1>
      <PostEditor />
      <Scheduler />
      <AIChat />
    </div>
  );
};

export default Dashboard;
