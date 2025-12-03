<template>
    <div class="user-layout">
        <nav class="navbar navbar-expand-lg navbar-light shadow-sm py-3"
            style="background: linear-gradient(135deg, #4e73df, #1cc7d0);">
            <div class="container">
                <router-link to="/" class="navbar-brand fw-bold text-white fs-4">
                    <i class="fa-solid fa-book-open-reader me-2"></i>Thư viện
                </router-link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div class="navbar-nav align-items-center">

                        <router-link to="/user/books" class="nav-link nav-btn">Danh sách sách</router-link>
                        <router-link to="/user/history" class="nav-link nav-btn">Lịch sử mượn</router-link>

                        <template v-if="isLoggedIn">
                            <button @click="logout" class="btn btn-light ms-3 px-3 rounded-pill shadow-sm">
                                Đăng xuất
                            </button>
                        </template>

                        <template v-else>
                            <router-link to="/login" class="btn btn-light ms-3 px-3 rounded-pill shadow-sm">
                                Đăng nhập
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>
        </nav>

        <main class="container py-5">
            <router-view />
        </main>
    </div>
</template>


<script>

import "@/assets/styles/main.css";
export default {
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem("user");
        },
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
