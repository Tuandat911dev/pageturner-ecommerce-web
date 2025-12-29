import { useCurrentApp } from "components/context/app.context";

const AppHeader = () => {
  const { user } = useCurrentApp();

  return (
    <>
      <div>App Header</div>
      <div>{JSON.stringify(user)}</div>
    </>
  );
};

export default AppHeader;
