import axiosClient from "./axiosClient";

const phongthiApi = {

  layDanhSach: () => {
    const url = `/api/phongthi/HocSinh/LayDanhSach`;
    return axiosClient.get(url);
  },
};

export default phongthiApi;
