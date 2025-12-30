import DetailUser from "@/components/admin/user/detail.user";
import TableUser from "@/components/admin/user/table.user";
import { useState } from "react";

const ManageUserPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [detailUser, setDetailUser] = useState<IUserTable | null>(null);

  return (
    <div>
      <TableUser openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setDetailUser={setDetailUser} />
      <DetailUser
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        detailUser={detailUser}
        setDetailUser={setDetailUser}
      />
    </div>
  );
};

export default ManageUserPage;
