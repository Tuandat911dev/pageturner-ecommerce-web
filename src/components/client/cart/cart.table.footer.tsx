import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface IProps {
  checkAllBox: boolean;
  setCheckAllBox: (v: boolean) => void;
}

const CartTableFooter = (props: IProps) => {
  const { checkAllBox, setCheckAllBox } = props;

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckAllBox(isChecked);
  };
  return (
    <>
      <div className="cart-table-footer">
        <div className="cart-table-footer__checkbox">
          <input id="cartCheck" type="checkbox" hidden onChange={handleCheckBox} checked={checkAllBox} />
          <label htmlFor="cartCheck"></label>
        </div>
        <div className="cart-table-footer__action">
          <span className="cart-table-footer__action-all">Chọn Tất Cả</span>
          <span className="cart-table-footer__action-delete">
            <DeleteOutlined />
            Xoá
          </span>
        </div>
        <div className="cart-table-footer__product">
          <span className="cart-table-footer__product-total">Tổng cộng (2 sản phẩm): </span>
          <span className="cart-table-footer__product-price">478.000đ</span>
        </div>
        <div className="cart-table-footer__cta">
          <Button type="primary" className="cart-table-footer__cta-btn">
            Mua Hàng
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartTableFooter;
