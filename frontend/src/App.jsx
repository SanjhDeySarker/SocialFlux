import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import all pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Scheduler from "./pages/Scheduler";
import Analytics from "./pages/Analytics";
import AiChat from "./pages/AiChat";

// Floating AI Chat Widget
import FloatingChat from "./components/FloatingChat";

// A route wrapper that only allows access if user is logged in
const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          {/* Application Routes */}
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/scheduler"
              element={
                <PrivateRoute>
                  <Scheduler />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route
              path="/ai"
              element={
                <PrivateRoute>
                  <AiChat />
                </PrivateRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Global floating AI chat widget (available on all pages) */}
          <FloatingChat />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
