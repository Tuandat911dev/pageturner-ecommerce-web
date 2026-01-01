import CreateUser from "@/components/admin/user/create.user";
import DetailUser from "@/components/admin/user/detail.user";
import ImportUser from "@/components/admin/user/import.user";
import TableUser from "@/components/admin/user/table.user";
import UpdateUser from "@/components/admin/user/update.user";
import { APP_MESSAGES } from "@/constants";
import { deleteUserAPI } from "@/services/api";
import type { ActionType } from "@ant-design/pro-components";
import { App } from "antd";
import { useRef, useState } from "react";

const ManageUserPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [detailUser, setDetailUser] = useState<IUserTable | null>(null);
  const actionRef = useRef<ActionType>();
  const { notification } = App.useApp();

  const handleDeleteUser = async (_id: string, fullName: string) => {
    const res = await deleteUserAPI(_id);
    if (res.data) {
      notification.success({
        message: APP_MESSAGES.COMMON.SUCCESS_TITLE,
        description: APP_MESSAGES.USER.DELETE_SUCCESS(fullName),
      });
      actionRef.current?.reload();
    } else {
      notification.error({
        message: APP_MESSAGES.COMMON.ERROR_TITLE,
        description: APP_MESSAGES.USER.DELETE_FAILED(fullName),
      });
    }
  };

  return (
    <div>
      <TableUser
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        setDetailUser={setDetailUser}
        setOpenModalCreate={setOpenModalCreate}
        actionRef={actionRef}
        setOpenModalImport={setOpenModalImport}
        setOpenModalUpdate={setOpenModalUpdate}
        handleDeleteUser={handleDeleteUser}
      />
      <DetailUser
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        detailUser={detailUser}
        setDetailUser={setDetailUser}
      />
      <CreateUser openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} actionRef={actionRef} />
      <UpdateUser
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        actionRef={actionRef}
        detailUser={detailUser}
        setDetailUser={setDetailUser}
      />
      <ImportUser openModalImport={openModalImport} setOpenModalImport={setOpenModalImport} actionRef={actionRef} />
    </div>
  );
};

export default ManageUserPage;
