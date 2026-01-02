export const APP_MESSAGES = {
  USER: {
    CREATE_SUCCESS: "Tạo người dùng thành công.",
    CREATE_FAILED: "Tạo người dùng thất bại.",
    UPDATE_SUCCESS: "Cập nhật thông tin người dùng thành công.",
    UPDATE_FAILED: "Cập nhật thông tin người dùng không thành công.",
    DELETE_SUCCESS: (account: string) => `Xoá tài khoản ${account || ""} thành công`,
    DELETE_FAILED: (account: string) => `Không thể xoá tài khoản ${account || "này"}`,
    IMPORT_SUCCESS: "Import dữ liệu thành công",
    IMPORT_FAILED: "Import dữ liệu thất bại",
    NOT_FOUND: "Không tìm thấy người dùng này.",

    VALIDATION: {
      REQUIRED: {
        FULLNAME: "Tên không được để trống",
        PASSWORD: "Mật khẩu không được để trống",
        EMAIL: "Email không được để trống",
        PHONE: "Số điện thoại không được để trống",
      },
      INVALID: {
        EMAIL: "Email không đúng định dạng",
      },
      EXISTED: {
        EMAIL: "Email đã tồn tại trong hệ thống, vui lòng sử dụng email khác",
      },
    },
  },
  BOOK: {
    CREATE_SUCCESS: "Tạo sách thành công.",
    CREATE_FAILED: "Tạo sách thất bại.",
    UPDATE_SUCCESS: "Cập nhật thông tin sách thành công.",
    UPDATE_FAILED: "Cập nhật thông tin sách không thành công.",
    DELETE_SUCCESS: (name: string) => `Xoá sách ${name || ""} thành công`,
    DELETE_FAILED: (name: string) => `Không thể xoá sách ${name || "này"}`,

    VALIDATION: {
      REQUIRED: {
        MAIN_TEXT: "Tên sách không được để trống",
        AUTHOR: "Tác giả không được để trống",
        PRICE: "Giá tiền không được để trống",
        QUANTITY: "Số lượng không được để trống",
        CATEGORY: "Thể loại không được để trống",
        THUMBNAIL: "Vui lòng upload ảnh đại diện",
        SLIDER: "Vui lòng upload ít nhất một ảnh slider",
      },
    },
  },
  FILE: {
    UPLOAD_SUCCESS: "Tải lên file thành công",
    UPLOAD_FAILED: "Tải lên file thất bại",
  },
  COMMON: {
    SUCCESS_TITLE: "Thành công",
    ERROR_TITLE: "Có lỗi xảy ra",
    FETCH_DATA_ERROR: "Lấy dữ liệu thất bại.",
  },
  AUTH: {
    LOGIN_SUCCESS_TITLE: "Đăng nhập thành công",
    LOGIN_SUCCESS_MESSAGE: (name: string) => `Chào mừng ${name || "bạn"}`,
    REGISTER_SUCCESS_MESSAGE: "Đăng ký tài khoản thành công",
    REGISTER_FAILED_MESSAGE: "Đăng ký tài khoản không thành công",
  },
};
