<template>
    <Form :validation-schema="schema" class="row mt-2 g-3 mb-4 p-3 border rounded bg-light">
        <div class="col-md-4">
            <label>Mã NXB</label>
            <Field name="MaNXB" v-model="nxbLocal.MaNXB" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="MaNXB" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Tên NXB</label>
            <Field name="TenNXB" v-model="nxbLocal.TenNXB" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="TenNXB" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Địa chỉ</label>
            <Field name="DiaChi" v-model="nxbLocal.DiaChi" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
            </Field>
            <ErrorMessage name="DiaChi" class="text-danger" />
        </div>

        <div class="col-12 d-flex justify-content-end mt-3">
            <template v-if="nxbLocal._id">
                <button type="button" class="btn btn-warning me-2" @click="capNhat">Cập nhật</button>
            </template>
            <template v-else>
                <button type="button" class="btn btn-success me-2" @click="themMoi">Thêm mới</button>
            </template>
            <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Hủy</button>
        </div>
    </Form>
</template>


<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: { Form, Field, ErrorMessage },
    props: {
        nxb: { type: Object, required: true },
    },
    emits: ["them", "capnhat", "cancel"],
    data() {
        return {
            nxbLocal: {},
            schema: yup.object({
                MaNXB: yup.string().required("Mã NXB là bắt buộc."),
                TenNXB: yup.string().required("Tên NXB là bắt buộc."),
                DiaChi: yup.string().nullable(),
            }),
        };
    },
    watch: {
        nxb: {
            immediate: true,
            handler(newVal) {
                this.nxbLocal = { ...newVal };
            },
        },
    },
    methods: {
        themMoi() {
            this.$emit("them", this.nxbLocal);
        },
        capNhat() {
            this.$emit("capnhat", this.nxbLocal);
        },
    },
};
</script>
