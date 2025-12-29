import { createContext, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  setUser: (user: IUser) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
}

type TProps = {
  children: React.ReactNode;
};

const CurrentAppContext = createContext<IAppContext | null>(null);

const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <>
      <CurrentAppContext value={{ isAuthenticated, user, setUser, setIsAuthenticated }}>
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
