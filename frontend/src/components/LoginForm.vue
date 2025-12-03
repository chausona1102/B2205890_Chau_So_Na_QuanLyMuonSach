<template>
    <div class="container login-background d-flex justify-content-center" style="max-width: 100vw; height: 100vh;">
        <div class="card p-4 shadow" style="width: 400px; margin-top: auto; margin-bottom: auto;">
            <h3 class="mb-4 text-center heading">Đăng nhập</h3>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <form @submit.prevent="onLogin">
                <div class="mb-3">
                    <label for="username" class="form-label">
                        <i class="fa fa-user"></i>
                        Mã đăng nhập
                    </label>
                    <input v-model="form.username" type="text" id="username" class="form-control" required />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">
                        <i class="fa fa-key"></i>
                        Mật khẩu
                    </label>
                    <input v-model="form.password" type="password" id="password" class="form-control" required />
                </div>

                <button type="submit" class="btn btn-primary w-100 mb-2">Đăng nhập</button>

                <button type="button" class="btn btn-outline-secondary w-100" @click="$emit('go-register')">
                    Đăng ký tài khoản
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: String,
    },
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        onLogin() {
            this.$emit("login", this.form);
        },
    },
};
</script>
