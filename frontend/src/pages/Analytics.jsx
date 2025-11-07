import { useEffect, useState } from "react";
import { getMetrics } from "../api/backend";

export default function Analytics() {
  const [metrics, setMetrics] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMetrics();
      setMetrics(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">System Metrics</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
        {metrics}
      </pre>
    </div>
  );
}
