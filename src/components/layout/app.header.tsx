import { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart, FiBook, FiUser, FiLogOut, FiLayout } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { Divider, Badge, Drawer, Avatar, Input, Button, Dropdown, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useCurrentApp } from "components/context/app.context";
import { logoutAPI } from "@/services/api";
import ProductCart from "components/client/product/product.cart";

const { Search } = Input;

const AppHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isAuthenticated, user, setUser, setIsAuthenticated } = useCurrentApp();
  const navigate = useNavigate();
  const { cart } = useCurrentApp();

  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
      setOpenDrawer(false);
      navigate("/");
    }
  };

  const userMenuItems = [
    {
      label: "Quản lý tài khoản",
      key: "account",
      icon: <FiUser />,
      onClick: () => navigate("/account"),
    },
    {
      label: <Link to="/history">Lịch sử mua hàng</Link>,
      key: "history",
      icon: <FiBook />,
    },
    ...(user?.role === "ADMIN"
      ? [{ label: <Link to="/admin">Trang quản trị</Link>, key: "admin", icon: <FiLayout /> }]
      : []),
    { type: "divider" as const },
    {
      label: "Đăng xuất",
      key: "logout",
      icon: <FiLogOut />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

  return (
    <>
      <div className="header-container">
        <header className="page-header">
          {/* LEFT: LOGO & NAVIGATION */}
          <div className="page-header__left">
            <div className="logo" onClick={() => navigate("/")}>
              <FaReact className="icon-react" />
              <span>PageTurner</span>
            </div>
          </div>

          {/* CENTER: SEARCH */}
          <div className="page-header__center">
            <Search
              placeholder="Tìm cuốn sách bạn yêu thích..."
              allowClear
              onSearch={(v) => console.log("Search:", v)}
              size="middle"
            />
          </div>

          {/* RIGHT: CART & AUTH */}
          <div className="page-header__right">
            {isAuthenticated && (
              <ProductCart>
                <div className="desktop-cart">
                  <Badge count={cart.length > 0 ? cart.length : 0} size="small" showZero>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </div>
              </ProductCart>
            )}

            <div className="user-section">
              {!isAuthenticated ? (
                <Space>
                  <Button type="text" onClick={() => navigate("/login")}>
                    Đăng nhập
                  </Button>
                  <Button type="primary" onClick={() => navigate("/register")}>
                    Đăng ký
                  </Button>
                </Space>
              ) : (
                <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="bottomRight">
                  <Space style={{ cursor: "pointer" }}>
                    <Avatar src={urlAvatar} />
                    <span className="user-name">{user?.fullName}</span>
                  </Space>
                </Dropdown>
              )}
            </div>

            <AiOutlineMenu className="mobile-menu-btn" onClick={() => setOpenDrawer(true)} />
          </div>
        </header>
      </div>

      {/* MOBILE DRAWER */}
      <Drawer title="PageTurner" placement="right" onClose={() => setOpenDrawer(false)} open={openDrawer} width={280}>
        <div className="drawer-content">
          <Search placeholder="Tìm kiếm..." style={{ marginBottom: 20 }} />

          <ul className="drawer-menu-list">
            <Divider style={{ margin: "10px 0" }} />

            {isAuthenticated ? (
              <>
                <li
                  onClick={() => {
                    navigate("/order");
                    setOpenDrawer(false);
                  }}
                >
                  <Badge count={cart.length > 0 ? cart.length : 0} size="small">
                    <FiShoppingCart style={{ fontSize: 18 }} />
                  </Badge>
                  <span>Giỏ hàng</span>
                </li>

                <li onClick={() => setOpenDrawer(false)}>
                  <Link to="/history">Lịch sử mua hàng</Link>
                </li>
                {user?.role === "ADMIN" && (
                  <li onClick={() => setOpenDrawer(false)}>
                    <Link to="/admin">Trang quản trị</Link>
                  </li>
                )}
                <Divider />
                <li onClick={handleLogout} style={{ color: "#ff4d4f" }}>
                  <FiLogOut /> Đăng xuất
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={() => {
                    navigate("/login");
                    setOpenDrawer(false);
                  }}
                >
                  Đăng nhập
                </li>
                <li
                  onClick={() => {
                    navigate("/register");
                    setOpenDrawer(false);
                  }}
                >
                  Đăng ký
                </li>
              </>
            )}
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default AppHeader;
