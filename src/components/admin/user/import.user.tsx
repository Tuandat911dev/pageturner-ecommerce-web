import { App, Modal, Table, Upload, type TableProps, type UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

interface IProps {
  openModalImport: boolean;
  setOpenModalImport: (v: boolean) => void;
}

const ImportUser = (props: IProps) => {
  const { openModalImport, setOpenModalImport } = props;
  const { message } = App.useApp();

  const handleOk = () => {
    setOpenModalImport(false);
  };

  const handleCancel = () => {
    setOpenModalImport(false);
  };

  const data: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,

    accept: ".svg, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    beforeUpload: (file) => {
      const isSvg = file.type === "image/svg+xml";
      const isXlsx =
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx");

      if (!isSvg && !isXlsx) {
        message.error(`${file.name} is not a .svg or .xlsx file`);
        return Upload.LIST_IGNORE;
      }

      return true;
    },

    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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

  const demoData: IRegister[] = [
    {
      email: "user@gmail.com",
      phone: "113",
      fullName: "super user do",
      password: "123456",
    },
    {
      email: "user@gmail.com",
      phone: "113",
      fullName: "super user do",
      password: "123456",
    },
    {
      email: "user@gmail.com",
      phone: "113",
      fullName: "super user do",
      password: "123456",
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
      >
        <Dragger {...data}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for only .svg or .xlsx files. Maximum 1 file.</p>
        </Dragger>
        <p style={{ fontSize: "1.5rem", textAlign: "center", padding: "20px", fontWeight: "500" }}>Review Data</p>
        <Table<IRegister> columns={columns} dataSource={demoData} bordered />
      </Modal>
    </>
  );
};

export default ImportUser;
