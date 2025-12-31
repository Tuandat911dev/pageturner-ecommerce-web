import { App, Modal, Table, Upload, type TableProps, type UploadFile, type UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";
import { useState } from "react";
import { createMultiUserAPI } from "@/services/api";
import type { ActionType } from "@ant-design/pro-components";
import templateFile from "assets/templates/demo_data.xlsx?url";

interface IProps {
  openModalImport: boolean;
  setOpenModalImport: (v: boolean) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const ImportUser = (props: IProps) => {
  const { openModalImport, setOpenModalImport, actionRef } = props;
  const { message } = App.useApp();
  const [importData, setImportData] = useState<IRegister[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(async () => {
      if (importData) {
        const res = await createMultiUserAPI(importData);
        if (res.data?.countError === 0) {
          message.success("Import account successfully!");
          setOpenModalImport(false);
          setFileList([]);
          setImportData([]);
          actionRef.current?.reload();
        } else {
          message.error("Import failed");
        }
        setLoading(false);
      }
    }, 1500);
  };

  const handleCancel = () => {
    setOpenModalImport(false);
    setImportData([]);
    setFileList([]);
  };

  const data: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    fileList: fileList,

    onChange: (info) => {
      const newFileList = [...info.fileList];
      setFileList(newFileList);
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      }
    },

    onRemove: () => {
      setFileList([]);
      setImportData([]);
    },

    accept: ".svg, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    beforeUpload: async (file) => {
      //validate file extension
      const isSvg = file.type === "image/svg+xml";
      const isXlsx =
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx");

      if (!isSvg && !isXlsx) {
        message.error(`${file.name} is not a .svg or .xlsx file`);
        return Upload.LIST_IGNORE;
      }

      if (isXlsx) {
        try {
          // convert file to buffer
          const arrayBuffer = await file.arrayBuffer();
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(arrayBuffer);

          // handle data
          const worksheet = workbook.getWorksheet(1);
          const jsonData: IRegister[] = [];
          const headerRow = worksheet?.getRow(1).values as string[];
          const REQUIRED_COLUMNS: (keyof IRegister)[] = ["email", "phone", "fullName", "password"];
          const excelHeaders = headerRow.filter(Boolean);
          const isMatch = REQUIRED_COLUMNS.every((key) => excelHeaders.includes(key));

          if (!isMatch) {
            const missing = REQUIRED_COLUMNS.filter((key) => !excelHeaders.includes(key));
            message.error(`File Excel sai cấu trúc. Thiếu cột: ${missing.join(", ")}`);
            return Upload.LIST_IGNORE;
          } else {
            worksheet?.eachRow((row, rowNumber) => {
              if (rowNumber > 1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rowData: any = {};
                row.eachCell((cell, colNumber) => {
                  const headerName = headerRow[colNumber];
                  if (headerName) {
                    rowData[headerName] = String(cell.value);
                  }
                });

                jsonData.push(rowData);
              }
            });
          }
          setImportData(jsonData);
          message.success(`File uploaded successfully.`);
        } catch (error) {
          console.error("Lỗi khi đọc file Excel:", error);
          message.error("Không thể đọc file Excel!");
        }
      }

      return false;
    },
  };

  const columns: TableProps<IRegister>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
  ];

  return (
    <>
      <Modal
        width="50vw"
        title="Import User"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModalImport}
        onOk={handleOk}
        okText={"Import Data"}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Dragger {...data}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for only .svg or .xlsx files. Maximum 1 file.</p>
          <a href={templateFile} download onClick={(e) => e.stopPropagation()}>
            Download sample file
          </a>
        </Dragger>
        <p style={{ fontSize: "1.5rem", textAlign: "center", padding: "20px", fontWeight: "500" }}>Review Data</p>
        <Table<IRegister> columns={columns} dataSource={importData} bordered rowKey="email" />
      </Modal>
    </>
  );
};

export default ImportUser;
