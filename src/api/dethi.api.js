import axiosClient from './axiosClient';

const dethiApi = {
  TaoDeThi: ({ten, phonenumber,noidung}) => {
    const url = '/api/dethi/TaoDeThi';
    return axiosClient.post(url, {
      ten,
      phonenumber,
      noidung
    })
  },
  layDanhSach: () => {
    const url = `/api/dethi/LayDanhSach`;
    return axiosClient.get(url)
  },
  layThongTinDeThi: (id) => {
    const url = `/api/dethi/ThongTinDethi/${id}`;
    return axiosClient.get(url)
  },
  
}

export default dethiApi;