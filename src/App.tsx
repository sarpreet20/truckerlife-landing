import { Route, Routes } from "react-router-dom";
import { Footer, Nav } from "./Chrome";
import { MobileCTABar } from "./shared";
import Home from "./pages/Home";
import FeaturesPage from "./pages/FeaturesPage";
import CalculatorPage from "./pages/CalculatorPage";
import IftaPage from "./pages/IftaPage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import StoryPage from "./pages/StoryPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="grain bg-paper text-ink font-body antialiased">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/ifta" element={<IftaPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}
