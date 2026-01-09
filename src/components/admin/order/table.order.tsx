import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { dateRangeValidate, formatDate, formatVND } from "@/services/helper";
import { getOrderAdminAPI } from "@/services/api";
import { Tag } from "antd";

interface IProps {
  setCurrentOrder: (v: IOrder | null) => void;
  setOpenOrderDetail: (v: boolean) => void;
}

const TableOrder = (props: IProps) => {
  const { setCurrentOrder, setOpenOrderDetail } = props;
  const columns: ProColumns<IOrder>[] = [
    {
      title: "ID",
      dataIndex: "_id",
      hideInSearch: true,
      render: (_, record) => (
        <a
          href="#!"
          onClick={() => {
            setCurrentOrder(record);
            setOpenOrderDetail(true);
          }}
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      copyable: true,
      width: 250,
      sorter: true,
    },
    {
      title: "Thanh toán",
      dataIndex: "type",
      render: (_, record) => <Tag color="cyan">{record.type}</Tag>,
      hideInSearch: true,
    },
    {
      title: "Đơn giá",
      dataIndex: "totalPrice",
      hideInSearch: true,
      sorter: true,
      render: (_, record) => formatVND(record.totalPrice),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Ngày đặt",
      valueType: "date",
      sorter: true,
      dataIndex: "createdAt",
      hideInSearch: true,
      render: (_, record) => formatDate(record.createdAt),
    },
    {
      title: "Ngày đặt",
      valueType: "dateRange",
      dataIndex: "createAtRange",
      hideInTable: true,
    },
  ];

  return (
    <ProTable<IOrder>
      search={{
        searchText: "Lọc",
        resetText: "Làm mới",
        collapseRender: (collapsed) => {
          return collapsed ? <span>Mở rộng</span> : <span>Thu gọn</span>;
        },
      }}
      rowKey="_id"
      columns={columns}
      cardBordered
      scroll={{ y: "calc(100vh - 320px)" }}
      sticky={{
        offsetHeader: 0,
      }}
      request={async (params, sort) => {
        const { current, pageSize, createAtRange, phone, address, name } = params;

        let query = "";
        if (params) {
          query += `current=${current}&pageSize=${[pageSize]}`;

          const createDateRange = dateRangeValidate(createAtRange);
          if (createDateRange) {
            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
          }

          if (phone) {
            query += `&phone=${phone}`;
          }
          if (address) {
            query += `&address=${address}`;
          }
          if (name) {
            query += `&name=${name}`;
          }
        }

        // default sort
        let sortValue = "-createdAt";
        if (sort && sort.createdAt) {
          const option = sort.createdAt === "ascend" ? "" : "-";
          sortValue = `${option}createdAt`;
        }
        query += `&sort=${sortValue}`;

        if (sort && sort.name) {
          const option = sort.name === "ascend" ? "" : "-";
          query += `&sort=${option}name`;
        }

        if (sort && sort.address) {
          const option = sort.address === "ascend" ? "" : "-";
          query += `&sort=${option}address`;
        }

        if (sort && sort.totalPrice) {
          const option = sort.totalPrice === "ascend" ? "" : "-";
          query += `&sort=${option}totalPrice`;
        }

        const res = await getOrderAdminAPI(query);

        return {
          data: res.data?.result,
          success: true,
          total: res.data?.meta.total || 5,
        };
      }}
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 5,
        defaultCurrent: 1,
        pageSizeOptions: [5, 10, 15, 20, 25],
        showSizeChanger: true,
      }}
      dateFormatter="string"
      headerTitle="Quản lý đơn hàng"
    />
  );
};

export default TableOrder;
