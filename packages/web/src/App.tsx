import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "@/lib/theme-context";
import { Nav } from "@/components/landing/nav";
import { HomePage } from "@/pages/home";
import { VaultsPage } from "@/pages/vaults";
import { VaultDetailPage } from "@/pages/vault-detail";
import { ActivityPage } from "@/pages/activity";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen overflow-x-hidden">
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vaults" element={<VaultsPage />} />
            <Route path="/vaults/:id" element={<VaultDetailPage />} />
            <Route path="/activity" element={<ActivityPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
