import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm, Tag } from "antd";
import { useRef } from "react";
import { Image } from "antd";
import { dateRangeValidate, formatDate, formatVND } from "@/services/helper";
import { getBookAPI } from "@/services/api";

const columns: ProColumns<IBookTable>[] = [
  {
    title: "ID",
    dataIndex: "_id",
    hideInSearch: true,
    render: (_, record) => <a href="#!">{record._id}</a>,
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    hideInSearch: true,
    render: (_, record) => {
      const thumbnail = `${import.meta.env.VITE_BACKEND_URL}/images/book/${record.thumbnail}`;

      return <Image width={120} alt={record.mainText} src={thumbnail} />;
    },
  },
  {
    title: "Title",
    dataIndex: "mainText",
    copyable: true,
    width: 250,
    sorter: true,
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (_, record) => <Tag color="cyan">{record.category}</Tag>,
    hideInSearch: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    hideInSearch: true,
    sorter: true,
    render: (_, record) => formatVND(record.price),
  },
  {
    title: "Sold",
    dataIndex: "sold",
    hideInSearch: true,
    sorter: true,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: true,
  },
  {
    title: "Created At",
    valueType: "date",
    sorter: true,
    dataIndex: "createdAt",
    hideInSearch: true,
    render: (_, record) => formatDate(record.createdAt),
  },
  {
    title: "Created At",
    valueType: "dateRange",
    dataIndex: "createAtRange",
    hideInTable: true,
  },
  {
    title: "Action",
    valueType: "option",
    key: "option",
    render: (_, record) => (
      <>
        <Popconfirm
          placement="bottomRight"
          title={"Bạn chắc chắn muốn xoá?"}
          description={"Xoá tài khoản này"}
          okText="OK"
          cancelText="Cancel"
          onConfirm={() => console.log("Delete")}
        >
          <Button key="delete" type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            console.log("edit");
          }}
        >
          Edit
        </Button>
      </>
    ),
  },
];

const TableBook = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<IBookTable>
      rowKey="_id"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      scroll={{ y: "calc(100vh - 320px)" }}
      sticky={{
        offsetHeader: 0,
      }}
      request={async (params, sort) => {
        const { current, pageSize, mainText, author, createAtRange } = params;

        let query = "";
        if (params) {
          query += `current=${current}&pageSize=${[pageSize]}`;
          if (mainText) {
            query += `&mainText=/${mainText}/i`;
          }
          if (author) {
            query += `&author=/${author}/i`;
          }

          const createDateRange = dateRangeValidate(createAtRange);
          if (createDateRange) {
            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
          }
        }

        // default sort
        let sortValue = "-createdAt";
        if (sort && sort.createdAt) {
          const option = sort.createdAt === "ascend" ? "" : "-";
          sortValue = `${option}createdAt`;
        }
        query += `&sort=${sortValue}`;

        if (sort && sort.mainText) {
          const option = sort.mainText === "ascend" ? "" : "-";
          query += `&sort=${option}mainText`;
        }

        if (sort && sort.author) {
          const option = sort.author === "ascend" ? "" : "-";
          query += `&sort=${option}author`;
        }

        if (sort && sort.price) {
          const option = sort.price === "ascend" ? "" : "-";
          query += `&sort=${option}price`;
        }

        if (sort && sort.sold) {
          const option = sort.sold === "ascend" ? "" : "-";
          query += `&sort=${option}sold`;
        }

        const res = await getBookAPI(query);

        return {
          data: res.data?.result,
          success: true,
          total: res.data?.meta.total || 5,
        };
      }}
      editable={{
        type: "multiple",
      }}
      search={{
        labelWidth: "auto",
      }}
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 5,
        defaultCurrent: 1,
        pageSizeOptions: [5, 10, 15, 20, 25],
        showSizeChanger: true,
      }}
      dateFormatter="string"
      headerTitle="Manage Book"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          Thêm mới
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: "1st item",
                key: "1",
              },
              {
                label: "2nd item",
                key: "2",
              },
              {
                label: "3rd item",
                key: "3",
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default TableBook;
