import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Footer from "@/components/shared/Footer";

const RootLayout = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      <Topbar />

      <div className="flex flex-1 w-full">
        <LeftSidebar />

        <section className="flex-1 overflow-y-auto">
          <Outlet />
        </section>
      </div>

      <div className="block md:hidden">
        <Bottombar />
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
