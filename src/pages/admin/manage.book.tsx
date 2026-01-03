import CreateBook from "@/components/admin/book/create.book";
import DetailBook from "@/components/admin/book/detail.book";
import TableBook from "@/components/admin/book/table.book";
import UpdateBook from "@/components/admin/book/update.book";
import type { ActionType } from "@ant-design/pro-components";
import { useRef, useState } from "react";

const ManageBookPage = () => {
  const [openBookDetail, setOpenBookDetail] = useState<boolean>(false);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<IBookTable | null>(null);
  const actionRef = useRef<ActionType>();
  return (
    <>
      <TableBook
        setOpenBookDetail={setOpenBookDetail}
        setCurrentBook={setCurrentBook}
        setOpenModalCreate={setOpenModalCreate}
        setOpenModalUpdate={setOpenModalUpdate}
        actionRef={actionRef}
      />
      <DetailBook
        setOpenBookDetail={setOpenBookDetail}
        setCurrentBook={setCurrentBook}
        openBookDetail={openBookDetail}
        currentBook={currentBook}
      />
      <CreateBook openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} actionRef={actionRef} />
      <UpdateBook
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        actionRef={actionRef}
        currentBook={currentBook}
        setCurrentBook={setCurrentBook}
      />
    </>
  );
};

export default ManageBookPage;
