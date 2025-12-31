import { Button } from "antd";
import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";

interface IProps {
  currentData: IUserTable[];
}

const ExportUser = (props: IProps) => {
  const { currentData } = props;

  const headers = [
    { label: "Id", key: "_id" },
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Role", key: "role" },
    { label: "Status", key: "isActive" },
    { label: "Created At", key: "createdAt" },
  ];

  return (
    <>
      <Button icon={<DownloadOutlined />} type="primary">
        <CSVLink data={currentData} headers={headers} filename={"accounts.csv"} target="_blank">
          Export
        </CSVLink>
      </Button>
    </>
  );
};

export default ExportUser;
