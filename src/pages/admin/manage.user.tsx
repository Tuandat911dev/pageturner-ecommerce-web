import CreateUser from "@/components/admin/user/create.user";
import DetailUser from "@/components/admin/user/detail.user";
import ImportUser from "@/components/admin/user/import.user";
import TableUser from "@/components/admin/user/table.user";
import type { ActionType } from "@ant-design/pro-components";
import { useRef, useState } from "react";

const ManageUserPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
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
        setOpenModalImport={setOpenModalImport}
      />
      <DetailUser
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        detailUser={detailUser}
        setDetailUser={setDetailUser}
      />
      <CreateUser openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} actionRef={actionRef} />
      <ImportUser openModalImport={openModalImport} setOpenModalImport={setOpenModalImport} />
    </div>
  );
};

export default ManageUserPage;
