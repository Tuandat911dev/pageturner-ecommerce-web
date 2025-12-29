import { Outlet } from "react-router-dom";
import AppHeader from "components/layout/app.header";
import AppFooter from "components/layout/app.footer";
import { useEffect } from "react";
import { fetchAccountAPI } from "./services/api";
import { useCurrentApp } from "./components/context/app.context";
import { FadeLoader } from "react-spinners";
function Layout() {
  const { setUser, setIsAuthenticated, setIsAppLoading, isAppLoading } = useCurrentApp();

  useEffect(() => {
    const fetchAccount = () => {
      setIsAppLoading(true);
      setTimeout(async () => {
        const res = await fetchAccountAPI();
        if (res.data) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        }
        setIsAppLoading(false);
      }, 3000);
    };

    fetchAccount();
  }, [setUser, setIsAuthenticated, setIsAppLoading]);

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          inset: 0,
          background: "#fff",
          zIndex: 9999,
          transition: "all 0.5s ease",
          opacity: isAppLoading ? 1 : 0,
          visibility: isAppLoading ? "visible" : "hidden",
          pointerEvents: isAppLoading ? "auto" : "none",
        }}
      >
        <FadeLoader color="#61DAFB" loading={true} height="15" />
      </div>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
}

export default Layout;
