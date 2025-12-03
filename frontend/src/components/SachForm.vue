<template>
    <Form :validation-schema="schema" class="row g-3 mb-4 border rounded mt-4 p-3 bg-light">
        <div class="col-md-4">
            <label>Mã sách</label>
            <Field name="MaSach" v-model="sachLocal.MaSach" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="MaSach" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Tên sách</label>
            <Field name="TenSach" v-model="sachLocal.TenSach" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="TenSach" class="text-danger" />
        </div>

        <div class="col-md-2">
            <label>Đơn giá</label>
            <Field name="DonGia" v-model="sachLocal.DonGia" v-slot="{ field }">
                <input v-bind="field" type="number" class="form-control" />
            </Field>
            <ErrorMessage name="DonGia" class="text-danger" />
        </div>

        <div class="col-md-2">
            <label>Số quyển</label>
            <Field name="SoQuyen" v-model="sachLocal.SoQuyen" v-slot="{ field }">
                <input v-bind="field" type="number" class="form-control" />
            </Field>
            <ErrorMessage name="SoQuyen" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Năm xuất bản</label>
            <Field name="NamXuatBan" v-model="sachLocal.NamXuatBan" v-slot="{ field }">
                <input v-bind="field" type="number" class="form-control" />
            </Field>
            <ErrorMessage name="NamXuatBan" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Nhà xuất bản</label>
            <Field name="MaNXB" v-model="sachLocal.MaNXB" v-slot="{ field }">
                <select v-bind="field" class="form-select">
                    <option disabled value="">-- Chọn nhà xuất bản --</option>
                    <option v-for="nxb in dsNXB" :key="nxb.MaNXB" :value="nxb.MaNXB">
                        {{ nxb.TenNXB }} ({{ nxb.MaNXB }})
                    </option>
                </select>
            </Field>
            <ErrorMessage name="MaNXB" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Nguồn gốc / Tác giả</label>
            <Field name="NguonGoc" v-model="sachLocal.NguonGoc" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="NguonGoc" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Link ảnh</label>
            <Field name="image_url" v-model="sachLocal.image_url" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="image_url" class="text-danger" />
        </div>

        <div class="col-12 d-flex justify-content-end mt-3">
            <template v-if="sachLocal._id">
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
    components: { Form, Field, ErrorMessage },
    props: {
        sach: { type: Object, required: true },
        dsNXB: { type: Array, required: true }, // danh sách nhà xuất bản
    },
    emits: ["them", "capnhat", "cancel"],
    data() {
        return {
            sachLocal: {},
            schema: yup.object({
                MaSach: yup.string().required("Mã sách là bắt buộc."),
                TenSach: yup.string().required("Tên sách là bắt buộc."),
                DonGia: yup.number().typeError("Đơn giá phải là số").positive().nullable(),
                SoQuyen: yup.number().typeError("Số quyển phải là số").integer().min(0).nullable(),
                NamXuatBan: yup
                    .number()
                    .typeError("Năm xuất bản phải là số")
                    .min(1000)
                    .max(new Date().getFullYear())
                    .nullable(),
                MaNXB: yup.string().required("Mã NXB là bắt buộc."),
                NguonGoc: yup.string().nullable(),
                image_url: yup.string().nullable(),
            }),
        };
    },
    watch: {
        sach: {
            immediate: true,
            handler(newVal) {
                this.sachLocal = { ...newVal };
            },
        },
    },
    methods: {
        themMoi() {
            this.$emit("them", this.sachLocal);
        },
        capNhat() {
            this.$emit("capnhat", this.sachLocal);
        },
        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>
