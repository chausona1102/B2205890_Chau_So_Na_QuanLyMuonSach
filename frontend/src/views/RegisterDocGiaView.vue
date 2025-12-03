<template>
    <div class="container register-background d-flex justify-content-center"
        style="max-width: 100vw; min-height: 100vh;">
        <div class="card p-4 shadow" style="width: 500px; margin-top: auto; margin-bottom: auto;">
            <h3 class="mb-4 text-center">Đăng ký Tài khoản Độc giả</h3>

            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <div v-if="success" class="alert alert-success">
                {{ success }}
                <div class="mt-3 text-center">
                    <router-link to="/login" class="btn btn-outline-primary">Trở về Đăng nhập</router-link>
                </div>
            </div>

            <!-- Component Form -->
            <FormDangKyDocGia v-if="!success" v-model="form" @submit="register" @go-login="backToLogin" />
        </div>
    </div>
</template>

<script>
import FormDangKyDocGia from "@/components/FormDangKyDocGia.vue";
import DocGiaService from "@/services/docgia.service";

export default {
    components: {
        FormDangKyDocGia,
    },
    data() {
        return {
            form: {
                MaDocGia: "",
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "Nam",
                DiaChi: "",
                DienThoai: "",
                Password: "",
            },
            error: "",
            success: "",
        };
    },
    methods: {
        async register() {
            this.error = "";
            this.success = "";
            try {
                await DocGiaService.create(this.form);
                this.success = "Đăng ký thành công! Bạn có thể đăng nhập.";
            } catch (err) {
                this.error = err.response?.data?.message || "Đăng ký thất bại.";
            }
        },
        backToLogin() {
            this.$router.push("/login");
        }
    },
};
</script>
