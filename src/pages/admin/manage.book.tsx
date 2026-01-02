import DetailBook from "@/components/admin/book/detail.book";
import TableBook from "@/components/admin/book/table.book";
import { useState } from "react";

const ManageBookPage = () => {
  const [openBookDetail, setOpenBookDetail] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<IBookTable | null>(null);
  return (
    <>
      <TableBook setOpenBookDetail={setOpenBookDetail} setCurrentBook={setCurrentBook} />
      <DetailBook
        setOpenBookDetail={setOpenBookDetail}
        setCurrentBook={setCurrentBook}
        openBookDetail={openBookDetail}
        currentBook={currentBook}
      />
    </>
  );
};

export default ManageBookPage;
