import { useCurrentApp } from "components/context/app.context";
import { Button, Result } from "antd";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {
  const { isAuthenticated, user } = useCurrentApp();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("admin");

  if (isAdminRoute) {
    if (isAuthenticated) {
      const role = user?.role;
      if (role === "ADMIN") {
        return <>{props.children}</>;
      } else {
        return (
          <Result
            status="403"
            title="403"
            subTitle="Rất tiếc, bạn không có quyền truy cập tài nguyên này."
            extra={
              <Link to="/">
                <Button type="primary">Trang chủ</Button>
              </Link>
            }
          />
        );
      }
    } else {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Rất tiếc, bạn không có quyền truy cập tài nguyên này."
          extra={
            <Link to="/">
              <Button type="primary">Trang chủ</Button>
            </Link>
          }
        />
      );
    }
  } else {
    if (isAuthenticated) {
      return <>{props.children}</>;
    } else {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Rất tiếc, bạn cần đăng nhập để truy cập chức năng này."
          extra={
            <Link to="/">
              <Button type="primary">Trang chủ</Button>
            </Link>
          }
        />
      );
    }
  }
};

export default ProtectedRoute;
