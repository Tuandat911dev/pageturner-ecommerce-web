import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const OrderErrorResult = () => {
  return (
    <>
      <Result
        status="error"
        title="Có Lỗi Xảy Ra"
        subTitle="Đặt hàng không thành công. Hệ thống đang gặp sự cố tạm thời, bạn vui lòng kiểm tra lại kết nối internet hoặc thử lại sau nhé!"
        extra={[
          <Button type="primary" key="home">
            <Link to={"/"}>Trang Chủ</Link>
          </Button>,
          <Button key="buy">
            <Link to={"/order"}>Tạo Lại Đơn Hàng</Link>
          </Button>,
        ]}
      ></Result>
    </>
  );
};

export default OrderErrorResult;
