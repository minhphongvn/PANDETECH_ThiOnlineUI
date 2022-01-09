import Vue from "vue";
import VueRouter from "vue-router";
import Introduce from "../pages/Introduce.vue";
import store from "../store";
import instance from "../api/axiosClient";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Introduce",
    component: Introduce,
    beforeEnter: (to, from, next) => {
      let localStorageUserData = JSON.parse(localStorage.getItem("awt"));
      store.commit("setToken", localStorageUserData);
      instance.defaults.headers["awt"] = localStorageUserData;
      if (!store.state.user.isAuthenticated) {
        next();
        return;
      }
      next({ name: "Admin" });
    },
  },
  {
    meta: {
      title: "Đăng nhập",
    },
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
        next();
        return;
      }
      next({ name: "Admin" });
    },
  },
  {
    meta: {
      title: "Đăng ký",
    },
    path: "/register",
    name: "Register",
    component: () => import("../pages/Register.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
        next();
        return;
      }
      next({ name: "Admin" });
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../pages/Admin.vue"),
    redirect: "/admin",
    children: [
      {
        meta: {
          title: "Trang quản lý",
        },
        path: "/",
        name: "home",
        component: () => import("../components/DanhSachUngDung.vue"),
      },
      {
        meta: {
          title: "Phòng thi",
        },
        path: "phongthi",
        name: "phongthi",
        component: () => import("../views/PhongThi"),
      },
      {
        meta: {
          title: "Đề thi",
        },
        path: "dethi",
        name: "dethi",
        component: () => import("../views/DeThi"),
      },
      {
        meta: {
          title: "Danh sách lớp",
        },
        path: "danhsachlop",
        name: "Danhsachlop",
        component: () => import("../views/DanhSachLop"),
      },
      {
        meta: {
          title: "Chỉnh sửa lớp",
        },
        path: "class-details/:id",
        name: "chinhsualop",
        component: () => import("../views/DanhSachLop/Lop.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      let localStorageUserData = JSON.parse(localStorage.getItem("awt"));
      store.commit("setToken", localStorageUserData);
      store.commit("setUser", JSON.parse(localStorage.getItem("userInfo")));

      instance.defaults.headers["awt"] = localStorageUserData;
      if (!store.state.user.isAuthenticated) {
        next({ name: "Login" });
        return;
      }
      next();
    },
  },
  {
    meta: {
      title: "Tham gia thi",
    },
    path: "/thi/:id",
    name: "Register",
    component: () => import("../pages/Thi.vue"),
  },
  {
    meta: {
      title: "Phát hiện vi phạm",
    },
    path: "/thi/:id/error",
    name: "ViPham",
    component: () => import("../pages/ViPham.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
