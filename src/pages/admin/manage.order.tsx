import DetailOrder from "@/components/admin/order/detail.order";
import TableOrder from "@/components/admin/order/table.order";
import { useState } from "react";

const ManageOrderPage = () => {
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false);
  return (
    <>
      <TableOrder setCurrentOrder={setCurrentOrder} setOpenOrderDetail={setOpenOrderDetail} />
      <DetailOrder
        openOrderDetail={openOrderDetail}
        currentOrder={currentOrder}
        setCurrenOrder={setCurrentOrder}
        setOpenOrderDetail={setOpenOrderDetail}
      />
    </>
  );
};

export default ManageOrderPage;
