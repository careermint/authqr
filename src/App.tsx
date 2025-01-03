import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import VerifyProduct from "@/pages/verify/[productId]";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/verify/:productId" element={<VerifyProduct />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;