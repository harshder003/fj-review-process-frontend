import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <div className="bg-navy">
      <Header />
      <main id="detail" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
