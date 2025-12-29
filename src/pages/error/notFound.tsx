import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, tài nguyên không tồn tại."
      extra={
        <Link to="/">
          <Button type="primary">Trang chủ</Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
