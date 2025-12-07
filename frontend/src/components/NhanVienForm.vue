<template>
    <Form :validation-schema="schema" class="row g-3 mb-4 border rounded mt-4">
        <div class="col-md-6">
            <label>Mã nhân viên</label>
            <Field name="MSNV" v-model="nhanvienLocal.MSNV" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="MSNV" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Họ tên</label>
            <Field name="HoTenNV" v-model="nhanvienLocal.HoTenNV" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="HoTenNV" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Chức vụ</label>
            <Field name="Chucvu" v-model="nhanvienLocal.Chucvu" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="Chucvu" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Địa chỉ</label>
            <Field name="Diachi" v-model="nhanvienLocal.Diachi" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="Diachi" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Số điện thoại</label>
            <Field name="SoDienThoai" v-model="nhanvienLocal.SoDienThoai" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="SoDienThoai" class="text-danger" />
        </div>

        <div class="col-md-6" v-if="!nhanvienLocal._id">
            <label>Mật khẩu</label>
            <Field name="Password" v-model="nhanvienLocal.Password" v-slot="{ field }">
                <input v-bind="field" type="password" class="form-control" />
            </Field>
            <ErrorMessage name="Password" class="text-danger" />
        </div>

        <div class="col-12 d-flex justify-content-end mt-3 mb-2">
            <template v-if="nhanvienLocal._id">
                <button type="button" class="btn btn-warning me-2" @click="capNhat">Cập nhật</button>
            </template>
            <template v-else>
                <button type="button" class="btn btn-success me-2" @click="themMoi">Thêm mới</button>
            </template>
            <button type="button" class="btn btn-secondary" @click="cancel">Hủy</button>
        </div>
    </Form>
</template>


<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        nhanvien: { type: Object, required: true },
    },
    emits: ["them", "capnhat", "cancel"],
    data() {
        return {
            nhanvienLocal: {},
            schema: yup.object({
                MSNV: yup.string().required("Mã nhân viên là bắt buộc."),
                HoTenNV: yup.string().required("Họ tên là bắt buộc."),
                Chucvu: yup.string(),
                Diachi: yup.string(),
                SoDienThoai: yup
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
    watch: {
        nhanvien: {
            immediate: true,
            handler(newVal) {
                this.nhanvienLocal = { ...newVal };
            },
        },
    },
    methods: {
        capNhat() {
            this.$emit("capnhat", this.nhanvienLocal);
        },
        themMoi() {
            this.$emit("them", this.nhanvienLocal);
        },
        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>
