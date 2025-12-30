import { Avatar, Drawer, Tag } from "antd";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { formatDate } from "@/services/helper";

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: (v: boolean) => void;
  detailUser: IUserTable | null;
  setDetailUser: (v: IUserTable | null) => void;
}

const DetailUser = (props: IProps) => {
  const { openDrawer, setOpenDrawer, detailUser, setDetailUser } = props;
  let items: DescriptionsProps["items"] = [];
  if (detailUser) {
    const userAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${detailUser.avatar}`;
    items = [
      {
        key: "0",
        label: "Avatar",
        children: <Avatar size={64} src={userAvatar} alt={detailUser.fullName} />,
        span: 3,
      },
      {
        key: "1",
        label: "ID",
        children: `${detailUser._id}`,
        span: 3,
      },
      {
        key: "2",
        label: "Fullname",
        children: `${detailUser.fullName}`,
        span: 3,
      },
      {
        key: "3",
        label: "Email",
        children: `${detailUser.email}`,
        span: 3,
      },
      {
        key: "4",
        label: "Phone",
        children: `${detailUser.phone}`,
        span: 3,
      },
      {
        key: "5",
        label: "Role",
        children: <Tag color={detailUser.role === "ADMIN" ? "gold" : "cyan"}>{detailUser.role}</Tag>,
        span: 3,
      },
      {
        key: "7",
        label: "Created at",
        children: `${formatDate(detailUser.createdAt)}`,
        span: 3,
      },
      {
        key: "8",
        label: "Updated at",
        children: `${formatDate(detailUser.updatedAt)}`,
        span: 3,
      },
    ];
  }

  const onClose = () => {
    setOpenDrawer(false);
    setDetailUser(null);
  };

  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={openDrawer}
        size="large"
      >
        <Descriptions title="User Info" bordered items={items} />
      </Drawer>
    </>
  );
};

export default DetailUser;
