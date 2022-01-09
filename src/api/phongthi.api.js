import axiosClient from "./axiosClient";

const phongthiApi = {
  TaoPhongThi: (data) => {
    const url = "/api/phongthi/TaoPhongThi";
    return axiosClient.post(url, data);
  },
  UpdatePhongThi: (id, data) => {
    const url = `/api/phongthi/UpdatePhongThi/${id}`;
    return axiosClient.post(url, data);
  },
  layDanhSach: () => {
    const url = `/api/phongthi/LayDanhSach`;
    return axiosClient.get(url);
  },
  layThongTinPhongThi: (id) => {
    const url = `/api/phongthi/ThongTinPhongThi/${id}`;
    return axiosClient.get(url);
  },
};

export default phongthiApi;
