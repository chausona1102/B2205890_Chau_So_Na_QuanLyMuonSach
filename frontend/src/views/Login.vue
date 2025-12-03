<template>
    <LoginForm :error="error" @login="handleLogin" @go-register="goToRegister" />
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import LoginService from "@/services/login.service";

export default {
    components: { LoginForm },
    data() {
        return {
            error: "",
        };
    },
    methods: {
        async handleLogin(form) {
            try {
                const res = await LoginService.login(form.username, form.password);
                const user = res;

                localStorage.setItem("user", JSON.stringify(user));

                if (user.role === "admin") {
                    this.$router.push("/admin");
                } else if (user.role === "user") {
                    this.$router.push("/user");
                } else {
                    this.error = "Không xác định được vai trò người dùng.";
                }
            } catch (err) {
                this.error = err.response?.data?.message || "Đăng nhập thất bại";
            }
        },
        goToRegister() {
            this.$router.push("/register");
        },
    },
};
</script>
