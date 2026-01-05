interface IProps {
  children: React.ReactNode;
}

const ProductCart = (props: IProps) => {
  const { children } = props;
  return (
    <>
      <div className="cart-btn">
        {children}
        <div className="cart-preview">
          <p className="cart-message">Chưa Có Sản Phẩm</p>
        </div>
      </div>
    </>
  );
};

export default ProductCart;
