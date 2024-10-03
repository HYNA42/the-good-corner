import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => (
  <main className="main-content">
    <Header />
    <Outlet />
  </main>
);

export default Layout;