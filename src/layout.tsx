import { Outlet } from "react-router-dom";
import AppHeader from "components/layout/app.header";
import AppFooter from "components/layout/app.footer";
import { useEffect } from "react";
import { fetchAccountAPI } from "./services/api";
import { useCurrentApp } from "./components/context/app.context";
function Layout() {
  const { setUser, setIsAuthenticated, setIsAppLoading } = useCurrentApp();

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      if (res.data) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
      setIsAppLoading(false);
    };

    fetchAccount();
  }, [setUser, setIsAuthenticated, setIsAppLoading]);

  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
}

export default Layout;
