import { getUserAPI } from "@/services/api";
import { dateRangeValidate, formatDate } from "@/services/helper";
import { PlusOutlined, EditOutlined, DeleteOutlined, CloudUploadOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import ExportUser from "./export.user";
import { useState } from "react";

type TSearch = {
  fullName: string;
  email: string;
  createAt: string;
  createAtRange: string[];
};

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (v: boolean) => void;
  setDetailUser: (v: IUserTable) => void;
  setOpenModalCreate: (v: boolean) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setOpenModalImport: (v: boolean) => void;
  setOpenModalUpdate: (v: boolean) => void;
}

const TableUser = (props: IProps) => {
  const { setOpenDrawer, setDetailUser, setOpenModalCreate, actionRef, setOpenModalImport, setOpenModalUpdate } = props;
  const [currentData, setCurrentData] = useState<IUserTable[]>([]);

  const columns: ProColumns<IUserTable>[] = [
    {
      title: "ID",
      dataIndex: "_id",
      hideInSearch: true,
      render: (_, record) => (
        <a
          href="#!"
          onClick={() => {
            setDetailUser(record);
            setOpenDrawer(true);
          }}
        >
          {record._id}
        </a>
      ),
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
      hideInSearch: true,
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
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setDetailUser(record);
            setOpenModalUpdate(true);
          }}
        >
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
      actionRef={actionRef}
      request={async (params, sort) => {
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

        // default sort
        let sortValue = "-createdAt";
        if (sort && sort.createdAt) {
          const option = sort.createdAt === "ascend" ? "" : "-";
          sortValue = `${option}createdAt`;
        }
        query += `&sort=${sortValue}`;

        const res = await getUserAPI(query);

        if (res.data) {
          setCurrentData(res.data.result);
        }

        return {
          data: res.data?.result,
          success: true,
          total: res.data?.meta.total || 5,
        };
      }}
      toolBarRender={() => [
        <>
          <ExportUser currentData={currentData} />
          <Button key="import" icon={<CloudUploadOutlined />} type="primary" onClick={() => setOpenModalImport(true)}>
            Import
          </Button>
          <Button key="add" icon={<PlusOutlined />} type="primary" onClick={() => setOpenModalCreate(true)}>
            Add New
          </Button>
        </>,
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
