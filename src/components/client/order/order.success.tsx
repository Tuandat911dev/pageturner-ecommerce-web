import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const OrderSuccessResult = () => {
  return (
    <>
      <Result
        status="success"
        title="Đặt Hàng Thành Công"
        subTitle="Đơn hàng của bạn đã được tạo thành công! Cảm ơn bạn đã mua sắm. Bạn có thể theo dõi trạng thái đơn hàng trong mục 'Lịch sử mua hàng'. Chúng tôi sẽ sớm giao hàng đến bạn!"
        extra={[
          <Button type="primary" key="home">
            <Link to={"/"}>Trang Chủ</Link>
          </Button>,
          <Button key="history">Theo Dõi Đơn Hàng</Button>,
        ]}
      />
    </>
  );
};

export default OrderSuccessResult;
