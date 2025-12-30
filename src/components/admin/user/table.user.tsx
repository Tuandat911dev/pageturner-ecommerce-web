import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import { useRef } from "react";

type IssueItem = {
  id: number;
  title: string;
  labels: { name: string; color: string }[];
  state: string;
  created_at: string;
};

const mockData: IssueItem[] = [
  {
    id: 1,
    title: "Support dark mode for the dashboard",
    state: "open",
    created_at: "2024-03-20 10:00:00",
    labels: [
      { name: "feature", color: "blue" },
      { name: "ui", color: "magenta" },
    ],
  },
  {
    id: 2,
    title: "Fix login button alignment on mobile",
    state: "closed",
    created_at: "2024-03-19 14:30:00",
    labels: [{ name: "bug", color: "red" }],
  },
  {
    id: 3,
    title: "Update documentation for API v2",
    state: "processing",
    created_at: "2024-03-18 09:15:00",
    labels: [{ name: "docs", color: "green" }],
  },
];

const columns: ProColumns<IssueItem>[] = [
  {
    title: "ID",
    dataIndex: "id",
    valueType: "indexBorder",
    width: 60,
  },
  {
    title: "Title",
    dataIndex: "title",
    copyable: true,
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "state",
    valueType: "select",
    valueEnum: {
      open: { text: "Open", status: "Error" },
      closed: { text: "Closed", status: "Success" },
      processing: { text: "Processing", status: "Processing" },
    },
  },
  {
    title: "Labels",
    dataIndex: "labels",
    search: false,
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    valueType: "dateTime",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "Action",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a key="edit" onClick={() => action?.startEditable?.(record.id)}>
        Edit
      </a>,
      <a key="delete" style={{ color: "red" }}>
        Delete
      </a>,
    ],
  },
];

const TableUser = () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<IssueItem>
      headerTitle="Issue Management"
      columns={columns}
      actionRef={actionRef}
      rowKey="id"
      cardBordered
      dataSource={mockData}
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
        pageSize: 5,
      }}
      dateFormatter="string"
    />
  );
};

export default TableUser;
