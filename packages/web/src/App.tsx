import { BrowserRouter, Routes, Route } from "react-router";
import { Nav } from "@/components/landing/nav";
import { HomePage } from "@/pages/home";
import { VaultsPage } from "@/pages/vaults";
import { ActivityPage } from "@/pages/activity";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vaults" element={<VaultsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
