import { Outlet } from "react-router-dom";
import Sidebar from "../compoents/layout/Sidebar";
import Topbar from "../compoents/layout/Topbar";
export default function DashboardLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
