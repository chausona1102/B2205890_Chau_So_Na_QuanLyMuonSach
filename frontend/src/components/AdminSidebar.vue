<template>
    <div class="admin-sidebar d-flex flex-column justify-content-between text-white p-3">
        <div>
            <div class="text-center mb-4">
                <div class="avatar">
                    <i class="fa fa-user"></i>
                </div>
                <p class="fs-4 mt-3 fw-bold">Quản trị viên</p>
            </div>

            <ul class="list-unstyled admin-menu">
                <li>
                    <router-link to="/admin/nhanvien">
                        <i class="fa-solid fa-user-tie me-2"></i> Nhân viên
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/docgia">
                        <i class="fa-solid fa-user me-2"></i> Độc giả
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/sach">
                        <i class="fa-solid fa-book-open me-2"></i> Sách
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/nhaxuatban">
                        <i class="fa-solid fa-newspaper me-2"></i> NXB
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/muon">
                        <i class="fa-solid fa-file-signature me-2"></i> Phiếu mượn
                    </router-link>
                </li>
            </ul>
        </div>

        <!-- Logout -->
        <div class="text-center">
            <button @click="logout" class="btn btn-light w-100 logout-btn">Đăng xuất</button>
        </div>
    </div>
</template>


<script>
import logo from "@/assets/logo.png";
import "@/assets/styles/layout_admin.css";
export default {
    data() {
        return { logo };
    },
    methods: {
        logout() {
            const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
            if (confirmLogout) {
                localStorage.removeItem("user");
                this.$router.push("/login");
            }
        },
    },
};
</script>
