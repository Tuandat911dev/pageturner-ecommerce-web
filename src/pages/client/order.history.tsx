import { useEffect, useState } from "react";
import { Table, Badge, Drawer, Descriptions, Divider, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatDate, formatVND } from "@/services/helper";
import { orderHistoryAPI } from "@/services/api";

const { Text, Title } = Typography;

const OrderHistory = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [dataHistory, setDataHistory] = useState<IOrderHistory[]>([]);
  const [dataDetail, setDataDetail] = useState<IOrderHistory | null>(null);

  useEffect(() => {
    const getOrderHistory = async () => {
      const res = await orderHistoryAPI();
      if (res.data) {
        setDataHistory(res.data);
      }
    };

    getOrderHistory();
  }, []);

  //   const getImage = (imageName: string) => {
  //     return `${import.meta.env.VITE_BACKEND_URL}/images/book/${imageName}`;
  //   };

  const columns: ColumnsType<IOrderHistory> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      render: (text, record) => (
        <a
          className="order-id-link"
          onClick={() => {
            setDataDetail(record);
            setIsDrawerOpen(true);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Thời gian đặt",
      dataIndex: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (text) => <Text strong>{formatVND(text)}</Text>,
    },
    {
      title: "Trạng thái",
      key: "status",
      render: () => <Badge status="success" text="Thành công" />,
    },
  ];

  return (
    <div className="order-history-page">
      <div className="container">
        <Title level={4} className="page-header">
          Lịch sử đơn hàng
        </Title>

        <Table columns={columns} dataSource={dataHistory} rowKey="_id" pagination={{ pageSize: 5 }} bordered />

        <Drawer
          title="Chi tiết đơn hàng"
          width={window.innerWidth > 768 ? 650 : "100%"}
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          destroyOnClose
        >
          {dataDetail && (
            <div className="drawer-order-detail">
              <Descriptions title="Thông tin khách hàng" bordered column={1} size="small">
                <Descriptions.Item label="Người nhận">{dataDetail.name}</Descriptions.Item>
                <Descriptions.Item label="Điện thoại">{dataDetail.phone}</Descriptions.Item>
                <Descriptions.Item label="Email">{dataDetail.email}</Descriptions.Item>
              </Descriptions>

              <Divider />

              <Title level={5}>Sản phẩm đã mua</Title>
              <div className="product-list">
                {dataDetail.detail.map((item, index) => (
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
                  <span>{formatVND(dataDetail.totalPrice)}</span>
                </div>
                <div className="summary-line total">
                  <span>Tổng cộng:</span>
                  <span className="price">{formatVND(dataDetail.totalPrice)}</span>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default OrderHistory;
