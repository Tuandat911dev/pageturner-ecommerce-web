import CreateBook from "@/components/admin/book/create.book";
import DetailBook from "@/components/admin/book/detail.book";
import TableBook from "@/components/admin/book/table.book";
import type { ActionType } from "@ant-design/pro-components";
import { useRef, useState } from "react";

const ManageBookPage = () => {
  const [openBookDetail, setOpenBookDetail] = useState<boolean>(false);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<IBookTable | null>(null);
  const actionRef = useRef<ActionType>();
  return (
    <>
      <TableBook
        setOpenBookDetail={setOpenBookDetail}
        setCurrentBook={setCurrentBook}
        setOpenModalCreate={setOpenModalCreate}
        actionRef={actionRef}
      />
      <DetailBook
        setOpenBookDetail={setOpenBookDetail}
        setCurrentBook={setCurrentBook}
        openBookDetail={openBookDetail}
        currentBook={currentBook}
      />
      <CreateBook openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} actionRef={actionRef} />
    </>
  );
};

export default ManageBookPage;
