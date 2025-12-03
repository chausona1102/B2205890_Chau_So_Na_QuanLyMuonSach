import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";

import NhanVienManager from "@/views/Admin/NhanVienManager.vue";
import DocGiaManager from "@/views/Admin/DocGiaManager.vue";
import SachManager from "@/views/Admin/SachManager.vue";
import NXBManager from "@/views/Admin/NXBManager.vue";
import MuonSachManager from "@/views/Admin/MuonSachManager.vue";
import BookList from "@/views/User/BookList.vue";
import BorrowHistory from "@/views/User/BorrowHistory.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: UserLayout,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterDocGiaView.vue"),
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, role: "admin" },
    children: [
      { path: "nhanvien", component: NhanVienManager },
      { path: "docgia", component: DocGiaManager },
      { path: "sach", component: SachManager },
      { path: "nhaxuatban", component: NXBManager },
      { path: "muon", component: MuonSachManager },
      { path: "", redirect: "/admin/nhanvien" },
    ],
  },
  {
    path: "/user",
    component: UserLayout,
    meta: { requiresAuth: true, role: "user" },
    children: [
      { path: "books", component: BookList },
      { path: "history", component: BorrowHistory },
      { path: "", redirect: "/user/books" },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.requiresAuth) {
    if (!user) {
      return next({ name: "login" });
    }

    if (to.meta.role && to.meta.role !== user.role) {
      return next({ name: "login" });
    }
  }

  next();
});

export default router;
