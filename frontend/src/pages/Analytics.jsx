import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getAnalytics } from "../api/analytics";
import ChartCard from "../components/ChartCard";
import { motion } from "framer-motion";

const COLORS = ["#2563eb", "#4f46e5", "#10b981", "#f59e0b"];

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics().then((res) => setData(res));
  }, []);

  if (!data)
    return (
      <div className="p-6 text-center">
        <p className="text-lg opacity-80">Loading analytics…</p>
      </div>
    );

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold mb-4">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Posts Per Day */}
        <ChartCard title="Posts Published Per Day">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.postsPerDay}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Posts by Platform */}
        <ChartCard title="Posts by Platform">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.postsByPlatform}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label
              >
                {data.postsByPlatform.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Engagement Trend */}
        <ChartCard title="Engagement Trend (Likes & Comments)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="likes"
                stroke="#2563eb"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="comments"
                stroke="#f59e0b"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.div>
  );
}
