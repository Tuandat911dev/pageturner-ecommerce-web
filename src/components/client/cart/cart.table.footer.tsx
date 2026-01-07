import { useCurrentApp } from "@/components/context/app.context";
import { formatVND } from "@/services/helper";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useMemo } from "react";

interface ICart {
  detail: IBookTable;
  quantity: number;
  _id: string;
}

interface IProps {
  checkAllBox: boolean;
  handleToggleAll: (v: boolean) => void;
  cartListChecked: ICart[];
  handleDeleteSelectedCart: () => void;
}

const CartTableFooter = (props: IProps) => {
  const { checkAllBox, handleToggleAll, cartListChecked, handleDeleteSelectedCart } = props;
  const { cart } = useCurrentApp();

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    handleToggleAll(isChecked);
  };

  const totalPrice = useMemo(() => {
    const cartsChecked = new Set(cartListChecked.map((item) => item._id));
    const carts = cart.filter((item) => cartsChecked.has(item._id));

    const total: number = carts.reduce((sum, num) => {
      return sum + num.quantity * num.detail.price;
    }, 0);

    return total;
  }, [cartListChecked, cart]);

  return (
    <>
      <div className="cart-table-footer">
        <div className="cart-table-footer__checkbox">
          <input id="cartCheck" type="checkbox" hidden onChange={handleCheckBox} checked={checkAllBox} />
          <label htmlFor="cartCheck"></label>
        </div>
        <div className="cart-table-footer__action">
          <span className="cart-table-footer__action-all">Chọn Tất Cả</span>
          <Button
            className="cart-table-footer__action-delete"
            icon={<DeleteOutlined />}
            onClick={handleDeleteSelectedCart}
            disabled={cartListChecked.length === 0}
          >
            Xoá
          </Button>
        </div>
        <div className="cart-table-footer__product">
          <span className="cart-table-footer__product-total">Tổng cộng ({cartListChecked.length} sản phẩm): </span>
          <span className="cart-table-footer__product-price">{formatVND(totalPrice)}</span>
        </div>
        <div className="cart-table-footer__cta">
          <Button
            variant="outlined"
            className="cart-table-footer__cta-btn"
            disabled={cartListChecked.length === 0}
            color="blue"
          >
            Mua Hàng
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartTableFooter;
