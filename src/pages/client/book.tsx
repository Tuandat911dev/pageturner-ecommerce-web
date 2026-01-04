import { getBookAPI } from "@/services/api";
import { App } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookPage = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState<IBookTable | null>(null);
  const navigate = useNavigate();
  const { message } = App.useApp();

  useEffect(() => {
    const getBook = async () => {
      const query = `current=1&pageSize=1&_id=${bookId}`;
      const res = await getBookAPI(query);
      if (res.data) {
        setBookData(res.data.result[0]);
      } else {
        message.error("Sản phẩm không tồn tại");
        navigate("/");
      }
    };

    getBook();
  }, []);

  return (
    <>
      <div>Book Page: {JSON.stringify(bookData)}</div>
    </>
  );
};

export default BookPage;
