import CartTable from "@/components/client/cart/cart.table";
import { Button, Steps } from "antd";
import { useState } from "react";
import { BankOutlined, FileDoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const OrderPage = () => {
  const [current, setCurrent] = useState(0);

  const handleNextStep = () => {
    setCurrent(current + 1);
  };

  const handlePrevStep = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Giỏ Hàng",
      content: <CartTable handleNextStep={handleNextStep} />,
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Tạo Đơn Hàng",
      content: "Second-content",
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
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => handleNextStep()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => alert("done")}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => handlePrevStep()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default OrderPage;
