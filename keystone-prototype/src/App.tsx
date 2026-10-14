import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { CasePage } from "./pages/Case";
import { HcrPage } from "./pages/Hcr";
import { Home } from "./pages/Home";
import { InstructPage } from "./pages/Instruct";
import { MiPage } from "./pages/Mi";
import { OverridePage } from "./pages/Override";
import { Queue } from "./pages/Queue";
import { RulesPage } from "./pages/Rules";
import { CaseProvider } from "./state";

export default function App() {
  return (
    <CaseProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="queue" element={<Queue />} />
            <Route path="rules" element={<RulesPage />} />
            <Route path="mi" element={<MiPage />} />
            <Route path="case/:caseId" element={<CasePage />} />
            <Route path="case/:caseId/hcr" element={<HcrPage />} />
            <Route path="case/:caseId/override" element={<OverridePage />} />
            <Route path="case/:caseId/instruct" element={<InstructPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CaseProvider>
  );
}
