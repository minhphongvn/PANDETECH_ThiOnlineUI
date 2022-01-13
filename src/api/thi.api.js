import axiosClient from "./axiosClient";

const thiApi = {
  KiemTraTrangThai: (id) => {
    const url = `/api/phongthi/KiemTraTrangThai/${id}`;
    return axiosClient.get(url);
  },
  VaoPhongThi: (data) => {
    const url = `/api/phongthi/VaoPhong`;
    return axiosClient.post(url, data);
  },
  DiemDanh: (data) => {
    const url = `/api/phongthi/DiemDanh`;
    return axiosClient.post(url, data);
  },
  NopBai: (data) => {
    const url = `/api/phongthi/NopBai`;
    return axiosClient.post(url, data);
  },
  BatLoi: (data) => {
    const url = `/api/phongthi/BatLoi`;
    return axiosClient.post(url, data);
  },
};

export default thiApi;
