import { fetchAccountAPI } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  isAppLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setIsAppLoading: (loading: boolean) => void;
}

type TProps = {
  children: React.ReactNode;
};

const CurrentAppContext = createContext<IAppContext | null>(null);

const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

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
      }, 1500);
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
      <CurrentAppContext value={{ isAuthenticated, user, isAppLoading, setUser, setIsAuthenticated, setIsAppLoading }}>
        {props.children}
      </CurrentAppContext>
    </>
  );
};

const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error("useCurrentApp has to be used within <CurrentAppContext>");
  }

  return currentAppContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, useCurrentApp };
