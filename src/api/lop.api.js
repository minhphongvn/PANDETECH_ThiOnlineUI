import axiosClient from './axiosClient';

const lop = {
  taoLop: ({tenlop, phonenumber,namhoc}) => {
    const url = '/api/lophoc/taoLop';
    return axiosClient.post(url, {
      tenlop,
      phonenumber,
      namhoc
    })
  },
  layDanhSach: () => {
    const url = `/api/lophoc/LayDanhSach`;
    return axiosClient.get(url)
  },
  themDanhSachHocSinh: (id, danhsach) => {
    const url = `/api/lophoc/ThemHocSinh/${id}`;
    return axiosClient.post(url, {danhsach: JSON.stringify(danhsach)})
  },
  layThongTinLop: (id) => {
    const url = `/api/lophoc/ThongTinLop/${id}`;
    return axiosClient.get(url)
  },
  
}

export default lop;