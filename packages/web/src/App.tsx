import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "@/lib/theme-context";
import { Nav } from "@/components/landing/nav";
import { PasswordGate } from "@/components/password-gate";
import { HomePage } from "@/pages/home";
import { VaultsPage } from "@/pages/vaults";
import { VaultDetailPage } from "@/pages/vault-detail";
import { ActivityPage } from "@/pages/activity";
import { LimitlessOfferPage } from "@/pages/limitless-offer";
import { DeckPage } from "@/pages/deck";
import { OnePagerPage } from "@/pages/one-pager";
function App() {
  return (
    <BrowserRouter>
      <PasswordGate>
      <Routes>
        <Route path="/deck" element={<DeckPage />} />
        <Route path="/limitless-offer" element={<LimitlessOfferPage />} />
        <Route path="/one-pager" element={<OnePagerPage />} />
        <Route
          path="*"
          element={
            <ThemeProvider>
              <div className="min-h-screen overflow-x-hidden">
                <Nav />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/vaults" element={<VaultsPage />} />
                  <Route path="/vaults/:id" element={<VaultDetailPage />} />
                  <Route path="/activity" element={<ActivityPage />} />
                </Routes>
              </div>
            </ThemeProvider>
          }
        />
      </Routes>
      </PasswordGate>
    </BrowserRouter>
  );
}

export default App;
