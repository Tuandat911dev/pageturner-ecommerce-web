import CreateBook from "@/components/admin/book/create.book";
import DetailBook from "@/components/admin/book/detail.book";
import TableBook from "@/components/admin/book/table.book";
import UpdateBook from "@/components/admin/book/update.book";
import { APP_MESSAGES } from "@/constants";
import { deleteBookAPI } from "@/services/api";
import type { ActionType } from "@ant-design/pro-components";
import { App } from "antd";
import { useRef, useState } from "react";

const ManageBookPage = () => {
  const [openBookDetail, setOpenBookDetail] = useState<boolean>(false);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<IBookTable | null>(null);
  const actionRef = useRef<ActionType>();
  const { notification } = App.useApp();

  const handleDeleteBook = async (_id: string, mainText: string) => {
    const res = await deleteBookAPI(_id);
    if (res.data) {
      notification.success({
        message: APP_MESSAGES.COMMON.SUCCESS_TITLE,
        description: `${res.message || APP_MESSAGES.BOOK.DELETE_SUCCESS(mainText)}`,
      });
      actionRef.current?.reload();
    } else {
      notification.error({
        message: APP_MESSAGES.COMMON.ERROR_TITLE,
        description: `${res.message || APP_MESSAGES.BOOK.DELETE_FAILED(mainText)}`,
      });
    }
  };

  return (
    <>
      <TableBook
        setOpenBookDetail={setOpenBookDetail}
        setCurrentBook={setCurrentBook}
        setOpenModalCreate={setOpenModalCreate}
        setOpenModalUpdate={setOpenModalUpdate}
        actionRef={actionRef}
        handleDeleteBook={handleDeleteBook}
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
