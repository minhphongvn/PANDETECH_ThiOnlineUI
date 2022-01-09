import axiosClient from './axiosClient';

const auth = {
  login: ({phonenumber, password}) => {
    const url = '/api/auth/login';
    return axiosClient.post(url, {
      phonenumber,
      password
    })
  },
  register: ({type, hoten, phonenumber, password}) => {
    const url = '/api/auth/register';
    return axiosClient.post(url, {
      type,
      hoten,
      phonenumber,
      password
    })
  },
}

export default auth;