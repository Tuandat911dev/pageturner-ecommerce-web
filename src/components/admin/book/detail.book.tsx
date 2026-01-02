import { formatDate, formatVND } from "@/services/helper";
import { Descriptions, Divider, Image, Drawer, Tag, type DescriptionsProps } from "antd";

interface IProps {
  setOpenBookDetail: (v: boolean) => void;
  setCurrentBook: (v: null | IBookTable) => void;
  openBookDetail: boolean;
  currentBook: null | IBookTable;
}

const DetailBook = (props: IProps) => {
  const { setOpenBookDetail, setCurrentBook, openBookDetail, currentBook } = props;

  const onClose = () => {
    setOpenBookDetail(false);
    setCurrentBook(null);
  };

  const getImage = (imageName: string) => {
    return `${import.meta.env.VITE_BACKEND_URL}/images/book/${imageName}`;
  };

  const items: DescriptionsProps["items"] = [
    {
      label: "Mã sách",
      children: currentBook?._id,
    },
    {
      label: "Tên sách",
      span: "filled",
      children: currentBook?.mainText,
    },
    {
      label: "Tác giả",
      children: currentBook?.author,
    },
    {
      label: "Thể loại",
      span: "filled",
      children: <Tag color="cyan">{currentBook?.category}</Tag>,
    },
    {
      label: "Giá",
      children: formatVND(currentBook?.price || 0),
    },
    {
      label: "Đã bán",
      children: currentBook?.sold,
    },
    {
      label: "Số lượng",
      children: currentBook?.quantity,
      span: "filled",
    },
    {
      label: "Ngày tạo",
      children: formatDate(currentBook?.createdAt || new Date()),
    },
    {
      label: "Ngày sửa đổi",
      children: formatDate(currentBook?.updatedAt || new Date()),
    },
  ];
  return (
    <>
      <Drawer
        title="Chi tiết sách"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openBookDetail}
        width={"70vw"}
      >
        <Descriptions bordered items={items} />
        <Divider orientation="left">Hình ảnh sản phẩm</Divider>

        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {currentBook?.thumbnail !== undefined ? (
            <Image
              width={200}
              height={250}
              style={{ objectFit: "cover" }}
              src={getImage(currentBook.thumbnail)}
              alt={currentBook.mainText}
            />
          ) : null}

          {currentBook?.slider.length || 0 > 0
            ? currentBook?.slider.map((slider) => {
                return (
                  <Image
                    width={200}
                    height={250}
                    style={{ objectFit: "cover" }}
                    src={getImage(slider)}
                    alt={currentBook.mainText}
                  />
                );
              })
            : null}
        </Image.PreviewGroup>
      </Drawer>
    </>
  );
};

export default DetailBook;
