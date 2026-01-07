interface IProps {
  checkAllBox: boolean;
  handleToggleAll: (v: boolean) => void;
}

const CartTableHeader = (props: IProps) => {
  const { checkAllBox, handleToggleAll } = props;

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    handleToggleAll(isChecked);
  };

  return (
    <>
      <div className="cart-table-header__wrapper">
        <div className="cart-table-header">
          <div className="cart-table-header__checkbox">
            <input id="cartCheck" type="checkbox" hidden onChange={handleCheckBox} checked={checkAllBox} />
            <label htmlFor="cartCheck"></label>
          </div>
          <div className="cart-table-header__product">Sản Phẩm</div>
          <div className="cart-table-header__price">Đơn Giá</div>
          <div className="cart-table-header__quantity">Số Lượng</div>
          <div className="cart-table-header__total-price">Số Tiền</div>
          <div className="cart-table-header__action">Thao Tác</div>
        </div>
      </div>
    </>
  );
};

export default CartTableHeader;
