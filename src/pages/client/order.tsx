import CartTab from "@/components/client/orderPageStep/cart.tab";
import { Steps } from "antd";
import { useState } from "react";
import { BankOutlined, FileDoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import OrderTab from "@/components/client/orderPageStep/order.tab";

const OrderPage = () => {
  const [current, setCurrent] = useState(0);

  const handleNextStep = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: "Giỏ Hàng",
      content: <CartTab handleNextStep={handleNextStep} />,
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Tạo Đơn Hàng",
      content: <OrderTab handleNextStep={handleNextStep} />,
      icon: <FileDoneOutlined />,
    },
    {
      title: "Thanh Toán",
      content: "Last-content",
      icon: <BankOutlined />,
    },
  ];

  const onChange = (value: number) => {
    if (value < current) {
      setCurrent(value);
    } else {
      return;
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));
  return (
    <>
      <div className="order-step__wrapper">
        <div className="order-step__step">
          <Steps current={current} items={items} onChange={onChange} responsive={true} />
        </div>
      </div>

      <div>{steps[current].content}</div>
    </>
  );
};

export default OrderPage;
