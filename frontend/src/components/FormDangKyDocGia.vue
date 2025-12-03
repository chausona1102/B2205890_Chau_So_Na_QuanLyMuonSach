<template>
    <Form :validation-schema="schema" @submit="onSubmit" class="row g-3 mb-4">
        <div class="col-md-6">
            <label>Mã Độc Giả</label>
            <Field name="MaDocGia" v-model="form.MaDocGia" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="MaDocGia" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Họ và tên lót</label>
            <Field name="HoLot" v-model="form.HoLot" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="HoLot" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Tên</label>
            <Field name="Ten" v-model="form.Ten" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="Ten" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Ngày sinh</label>
            <Field name="NgaySinh" v-model="form.NgaySinh" v-slot="{ field }">
                <input v-bind="field" type="date" class="form-control" />
            </Field>
            <ErrorMessage name="NgaySinh" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Giới tính</label>
            <Field name="Phai" v-model="form.Phai" v-slot="{ field }">
                <select v-bind="field" class="form-select">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
            </Field>
            <ErrorMessage name="Phai" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Địa chỉ</label>
            <Field name="DiaChi" v-model="form.DiaChi" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="DiaChi" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Điện thoại</label>
            <Field name="DienThoai" v-model="form.DienThoai" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="DienThoai" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Mật khẩu</label>
            <Field name="Password" v-model="form.Password" v-slot="{ field }">
                <input v-bind="field" type="password" class="form-control" />
            </Field>
            <ErrorMessage name="Password" class="text-danger" />
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-outline-secondary w-100" @click="$emit('go-login')">
                Quay lại đăng nhập
            </button>
        </div>
    </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        modelValue: {
            type: Object,
            required: true,
        },
    },
    emits: ["update:modelValue", "submit"],
    computed: {
        form: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
    },
    data() {
        return {
            schema: yup.object({
                MaDocGia: yup.string().required("Mã độc giả là bắt buộc."),
                HoLot: yup.string().required("Họ lót là bắt buộc."),
                Ten: yup.string().required("Tên là bắt buộc."),
                NgaySinh: yup.string().nullable(),
                Phai: yup.string().required("Phái là bắt buộc."),
                DiaChi: yup.string().nullable(),
                DienThoai: yup
                    .string()
                    .matches(/^(\+?\d{10,11})$/, "Số điện thoại không hợp lệ.")
                    .nullable(),
                Password: yup
                    .string()
                    .required("Mật khẩu là bắt buộc.")
                    .min(4, "Mật khẩu phải ít nhất 4 ký tự."),
            }),
        };
    },
    methods: {
        onSubmit() {
            this.$emit("submit");
        },
    },
};
</script>
