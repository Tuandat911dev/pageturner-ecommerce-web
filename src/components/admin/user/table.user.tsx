import { getUserAPI } from "@/services/api";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import { useRef } from "react";

const TableUser = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<IUserTable>[] = [
    {
      title: "ID",
      dataIndex: "_id",
      copyable: true,
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
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      valueType: "select",
      valueEnum: {
        USER: { text: "User", status: "Default" },
        ADMIN: { text: "Admin", status: "Success" },
      },
      render: (_, record) => <Tag color={record.role === "ADMIN" ? "gold" : "cyan"}>{record.role}</Tag>,
    },
    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: (text, record) => [
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
    <ProTable<IUserTable>
      headerTitle="User Management"
      actionRef={actionRef}
      columns={columns}
      rowKey="_id"
      cardBordered
      request={async (params, sort, filter) => {
        console.log("Query Params:", params, sort, filter);
        const res = await getUserAPI();
        console.log(res);

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
        pageSize: 10,
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
