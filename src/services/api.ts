import axios from "services/axios.customize";

export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password, delay: 1500 });
};

export const logoutAPI = () => {
  const urlBackend = "/api/v1/auth/logout";
  return axios.post<IBackendRes<ILogin>>(urlBackend);
};

export const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
  const urlBackend = "/api/v1/user/register";
  return axios.post<IBackendRes<IRegister>>(urlBackend, { fullName, email, password, phone });
};

export const refreshTokenAPI = () => {
  const urlBackend = "/api/v1/auth/refresh";
  return axios.get<IBackendRes<ILogin>>(urlBackend);
};

export const fetchAccountAPI = () => {
  const urlBackend = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend, {
    headers: {
      delay: 3000,
    },
  });
};

/* ADMIN: Manage User */
export const getUserAPI = (query: string) => {
  const urlBackend = `/api/v1/user?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend);
};

export const createUserAPI = (fullName: string, password: string, email: string, phone: string) => {
  const urlBackend = "/api/v1/user";
  return axios.post<IBackendRes<IRegister>>(urlBackend, { fullName, password, email, phone });
};

export const createMultiUserAPI = (value: IRegister[]) => {
  const urlBackend = "/api/v1/user/bulk-create";
  return axios.post<IBackendRes<ICreateMultiUser>>(urlBackend, value);
};

export const updateUserAPI = (_id: string, fullName: string, phone: string) => {
  const urlBackend = "/api/v1/user";
  return axios.put<IBackendRes<string>>(urlBackend, { _id, fullName, phone });
};

export const deleteUserAPI = (_id: string) => {
  const urlBackend = `/api/v1/user/${_id}`;
  return axios.delete<IBackendRes<string>>(urlBackend);
};

/* ADMIN: Manage Book */
export const getBookAPI = (query: string) => {
  const urlBackend = `/api/v1/book?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend);
};

export const getBookCategory = () => {
  const urlBackend = `/api/v1/database/category`;
  return axios.get<IBackendRes<string[]>>(urlBackend);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callUploadImageBook = (file: any) => {
  const urlBackend = `/api/v1/file/upload`;
  const body = new FormData();
  body.append("fileImg", file);

  return axios.post<IBackendRes<string>>(urlBackend, body, {
    headers: {
      "upload-type": "book",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createBookAPI = (data: {
  thumbnail: string;
  slider: string[];
  mainText: string;
  author: string;
  price: number;
  sold: number;
  quantity: number;
  category: string;
}) => {
  const urlBackend = `/api/v1/book`;
  return axios.post<IBackendRes<IBookTable>>(urlBackend, data);
};

export const updateBookAPI = (
  data: {
    thumbnail: string;
    slider: string[];
    mainText: string;
    author: string;
    price: number;
    sold: number;
    quantity: number;
    category: string;
  },
  _id: string
) => {
  const urlBackend = `/api/v1/book/${_id}`;
  return axios.put<IBackendRes<IBookTable>>(urlBackend, data);
};

export const deleteBookAPI = (_id: string) => {
  const urlBackend = `/api/v1/book/${_id}`;
  return axios.delete<IBackendRes<string>>(urlBackend);
};

/* Client */
export const getBookByIdAPI = (_id: string) => {
  const urlBackend = `/api/v1/book/${_id}`;
  return axios.get<IBackendRes<IBookTable>>(urlBackend, {
    headers: {
      delay: 3000,
    },
  });
};

// order
export const orderAPI = (data: {
  name: string;
  address: string;
  phone: string;
  totalPrice: number;
  detail: {
    bookName: string;
    quantity: number;
    _id: string;
  }[];
}) => {
  const urlBackend = "/api/v1/order";
  return axios.post<IBackendRes<string>>(urlBackend, data);
};

export const orderHistoryAPI = () => {
  const urlBackend = "/api/v1/history";
  return axios.get<IBackendRes<IOrderHistory[]>>(urlBackend);
};

// account management
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callUploadImageAvatar = (file: any) => {
  const urlBackend = "/api/v1/file/upload";
  const body = new FormData();
  body.append("fileImg", file);

  return axios.post<IBackendRes<string>>(urlBackend, body, {
    headers: {
      "upload-type": "avatar",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateAccountAPI = (data: { fullName: string; phone: string; avatar: string; _id: string }) => {
  const urlBackend = "/api/v1/user";
  return axios.put<IBackendRes<string>>(urlBackend, data);
};

export const changePasswordAPI = (data: { email: string; oldpass: string; newpass: string }) => {
  const urlBackend = "/api/v1/user/change-password";
  return axios.post<IBackendRes<string>>(urlBackend, data);
};
