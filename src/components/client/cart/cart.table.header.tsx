const CartTableHeader = () => {
  return (
    <>
      <div className="cart-table-header">
        <div className="cart-table-header__checkbox">
          <input id="cartCheck" type="checkbox" hidden />
          <label htmlFor="cartCheck"></label>
        </div>
        <div className="cart-table-header__product">Sản Phẩm</div>
        <div className="cart-table-header__price">Đơn Giá</div>
        <div className="cart-table-header__quantity">Số Lượng</div>
        <div className="cart-table-header__total-price">Số Tiền</div>
        <div className="cart-table-header__action">Thao Tác</div>
      </div>
    </>
  );
};

export default CartTableHeader;
