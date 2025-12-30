import CreateUser from "@/components/admin/user/create.user";
import DetailUser from "@/components/admin/user/detail.user";
import TableUser from "@/components/admin/user/table.user";
import type { ActionType } from "@ant-design/pro-components";
import { useRef, useState } from "react";

const ManageUserPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [detailUser, setDetailUser] = useState<IUserTable | null>(null);
  const actionRef = useRef<ActionType>();

  return (
    <div>
      <TableUser
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        setDetailUser={setDetailUser}
        setOpenModalCreate={setOpenModalCreate}
        actionRef={actionRef}
      />
      <DetailUser
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        detailUser={detailUser}
        setDetailUser={setDetailUser}
      />
      <CreateUser openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} actionRef={actionRef} />
    </div>
  );
};

export default ManageUserPage;
