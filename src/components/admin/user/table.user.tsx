import { getUserAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helper";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Tag } from "antd";

type TSearch = {
  fullName: string;
  email: string;
  createAt: string;
  createAtRange: string[];
};

const TableUser = () => {
  const columns: ProColumns<IUserTable>[] = [
    {
      title: "ID",
      dataIndex: "_id",
      hideInSearch: true,
      render: (_, record) => <a href="#!">{record._id}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      copyable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      copyable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => <Tag color={record.role === "ADMIN" ? "gold" : "cyan"}>{record.role}</Tag>,
    },
    {
      title: "Created At",
      valueType: "date",
      sorter: true,
      dataIndex: "createdAt",
      hideInSearch: true,
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
      render: (_, record) => [
        <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => console.log("Edit:", record._id)}>
          Edit
        </Button>,
        <Button key="delete" type="link" danger icon={<DeleteOutlined />}>
          Delete
        </Button>,
      ],
    },
  ];

  return (
    <ProTable<IUserTable, TSearch>
      headerTitle="User Management"
      columns={columns}
      rowKey="_id"
      cardBordered
      request={async (params, sort, filter) => {
        const { current, pageSize, email, fullName, createAtRange } = params;

        let query = "";
        if (params) {
          query += `current=${current}&pageSize=${[pageSize]}`;
          if (email) {
            query += `&email=/${email}/i`;
          }
          if (fullName) {
            query += `&fullName=/${fullName}/i`;
          }

          const createDateRange = dateRangeValidate(createAtRange);
          if (createDateRange) {
            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
          }
        }

        const res = await getUserAPI(query);

        return {
          data: res.data?.result,
          success: true,
          total: res.data?.meta.total || 5,
        };
      }}
      toolBarRender={() => [
        <Button key="add" icon={<PlusOutlined />} type="primary">
          Add New
        </Button>,
      ]}
      search={{
        labelWidth: "auto",
        searchText: "Search",
        resetText: "Reset",
      }}
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 5,
        defaultCurrent: 1,
        pageSizeOptions: [5, 10, 15, 20, 25],
        showSizeChanger: true,
      }}
      dateFormatter="string"
      options={{
        reload: true,
        setting: true,
      }}
    />
  );
};

export default TableUser;
