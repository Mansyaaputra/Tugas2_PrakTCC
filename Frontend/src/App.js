import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ListNote from "./components/ListNote";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // Fungsi ProtectedRoute
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ListNote />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;