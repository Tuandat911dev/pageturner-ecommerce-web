import { formatVND } from "@/services/helper";
import { Descriptions, Divider, Drawer, Typography } from "antd";

interface IProps {
  openOrderDetail: boolean;
  currentOrder: IOrder | null;
  setOpenOrderDetail: (v: boolean) => void;
  setCurrenOrder: (v: IOrder | null) => void;
}

const DetailOrder = (props: IProps) => {
  const { Text, Title } = Typography;
  const { currentOrder, openOrderDetail, setOpenOrderDetail, setCurrenOrder } = props;
  return (
    <Drawer
      title="Chi tiết đơn hàng"
      width={window.innerWidth > 768 ? 650 : "100%"}
      onClose={() => {
        setOpenOrderDetail(false);
        setCurrenOrder(null);
      }}
      open={openOrderDetail}
      destroyOnClose
    >
      {currentOrder && (
        <div className="drawer-order-detail">
          <Descriptions title="Thông tin khách hàng" bordered column={1} size="small">
            <Descriptions.Item label="Người nhận">{currentOrder.name}</Descriptions.Item>
            <Descriptions.Item label="Điện thoại">{currentOrder.phone}</Descriptions.Item>
          </Descriptions>

          <Divider />

          <Title level={5}>Sản phẩm đã mua</Title>
          <div className="product-list">
            {currentOrder.detail.map((item, index) => (
              <div className="product-item" key={item._id || index}>
                {/* <img src={getImage(item.thumbnail)} alt={item.bookName} className="product-img" /> */}
                <div className="product-info">
                  <Text className="product-name" strong>
                    {item.bookName}
                  </Text>
                  <Text className="product-qty">Số lượng: {item.quantity}</Text>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="summary-line">
              <span>Tạm tính:</span>
              <span>{formatVND(currentOrder.totalPrice)}</span>
            </div>
            <div className="summary-line total">
              <span>Tổng cộng:</span>
              <span className="price">{formatVND(currentOrder.totalPrice)}</span>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default DetailOrder;
