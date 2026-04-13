import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export default function MainLayout() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100dvh",
      overflow: "hidden",
      background: "var(--bg)",
    }}>
      <Navbar />
      <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
