import { Drawer } from "antd";
import HomeSidebar from "components/client/home/home.sidebar";

interface IProps {
  setQueryFilter: (v: string) => void;
  queryFilter: string;
  openMobileFilter: boolean;
  setOpenMobileFilter: (v: boolean) => void;
}

const ProductMobileFilter = (props: IProps) => {
  const { setQueryFilter, queryFilter, openMobileFilter, setOpenMobileFilter } = props;

  const onClose = () => {
    setOpenMobileFilter(false);
  };

  return (
    <>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={openMobileFilter}
        width="80vw"
      >
        <HomeSidebar setQueryFilter={setQueryFilter} queryFilter={queryFilter} />
      </Drawer>
    </>
  );
};

export default ProductMobileFilter;
