import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Footer } from "./components/main/Footer";
import { BlogPage } from "./pages/BlogPage";
import { DocumentPage } from "./pages/DocumentPage";
import { ExamPage } from "./pages/ExamPage";
import { UploadPage } from "./pages/UploadPage";
import { Header } from "./components/main/Header";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {

  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Routes>
          <Route path="/" element={<><HomePage /></>} />
          <Route path="/blogs" element={<><Header /><BlogPage /><Footer /></>} />
          <Route path="/documents" element={<><Header /><DocumentPage /><Footer /></>} />
          <Route path="/exams" element={<><Header /><ExamPage /><Footer /></>} />
          <Route path="/register" element={<><RegisterPage /><Footer /></>} />
          <Route path="/login" element={<><LoginPage /><Footer /></>} />
          <Route path="/profile" element={<><Header /><ProfilePage /><Footer /></>} />
          <Route path="/upload" element={<><Header /><UploadPage /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App