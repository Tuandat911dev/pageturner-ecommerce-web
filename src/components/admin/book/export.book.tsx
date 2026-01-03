import { Button } from "antd";
import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";

interface IProps {
  bookData: IBookTable[];
}

const ExportBook = (props: IProps) => {
  const { bookData } = props;

  const headers = [
    { label: "ID", key: "_id" },
    { label: "Tiêu đề", key: "mainText" },
    { label: "Tác giả", key: "author" },
    { label: "Giá", key: "price" },
    { label: "Đã bán", key: "sold" },
    { label: "Số lượng", key: "quantity" },
    { label: "Thể loại", key: "category" },
    { label: "Thời gian tạo", key: "createdAt" },
    { label: "Thời gian cập nhật", key: "updatedAt" },
  ];

  return (
    <>
      <Button icon={<DownloadOutlined />} type="primary">
        <CSVLink data={bookData} headers={headers} filename={"books.csv"} target="_blank">
          Export
        </CSVLink>
      </Button>
    </>
  );
};

export default ExportBook;
