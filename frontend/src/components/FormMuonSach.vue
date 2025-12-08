<template>
    <Form :validation-schema="schema" class="row g-3 p-3 border rounded bg-light mt-2">
        <div class="col-md-6">
            <label>Mã độc giả</label>
            <Field name="MaDocGia" v-model="local.MaDocGia" v-slot="{ field }">
                <select v-bind="field" class="form-select">
                    <option value="">-- Chọn độc giả --</option>
                    <option v-for="docGia in docGias" :key="docGia.MaDocGia" :value="docGia.MaDocGia">
                        {{ docGia.MaDocGia }} - {{ docGia.HoLot }} {{ docGia.Ten }}
                    </option>
                </select>
            </Field>
            <ErrorMessage name="MaDocGia" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Mã sách</label>
            <Field name="MaSach" v-model="local.MaSach" v-slot="{ field }">
                <select v-bind="field" class="form-select">
                    <option value="">-- Chọn sách --</option>
                    <option v-for="sach in sachs" :key="sach.MaSach" :value="sach.MaSach">
                        {{ sach.MaSach }} - {{ sach.TenSach }}
                    </option>
                </select>
            </Field>
            <ErrorMessage name="MaSach" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Ngày mượn</label>
            <Field name="NgayMuon" v-model="local.NgayMuon" v-slot="{ field }">
                <input v-bind="field" type="date" class="form-control" />
            </Field>
            <ErrorMessage name="NgayMuon" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label>Ngày trả</label>
            <Field name="NgayTra" v-model="local.NgayTra" v-slot="{ field }">
                <input v-bind="field" type="date" class="form-control" />
            </Field>
            <ErrorMessage name="NgayTra" class="text-danger" />
        </div>
        <div class="col-md-4">
            <label>Trạng thái</label>
            <Field name="TrangThai" v-model="local.TrangThai" v-slot="{ field }">
                <select v-bind="field" class="form-select" :disabled="isTrangThaiDisabled">
                    <option v-for="trangThai in trangThaiOptions" :key="trangThai" :value="trangThai">
                        {{ trangThai }}
                    </option>
                </select>
            </Field>
            <ErrorMessage name="TrangThai" class="text-danger" />
        </div>

        <div class="col-md-4">
            <label>Ngày trả thực</label>
            <Field name="NgayTraThuc" v-model="local.NgayTraThuc" v-slot="{ field }">
                <input v-bind="field" type="date" class="form-control" />
            </Field>
        </div>

        <div class="col-md-4">
            <label>Tiền phạt trễ hạn (VND)</label>
            <Field name="TienPhatTreHan" v-model="local.TienPhatTreHan" v-slot="{ field }">
                <input v-bind="field" type="number" class="form-control" disabled />
            </Field>
        </div>

        <div class="col-12 d-flex justify-content-end gap-2 mt-3">
            <button type="button" class="btn btn-success" v-if="!local._id" @click="themMoi">Thêm mới</button>
            <button type="button" class="btn btn-warning" v-else @click="capNhat">Cập nhật</button>
            <button type="button" class="btn btn-secondary" @click="cancel">Hủy</button>
        </div>
    </Form>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";

export default {
    components: { Form, Field, ErrorMessage },
    props: {
        phieu: { type: Object, required: true },
    },
    emits: ["them", "capnhat", "cancel"],
    data() {
        return {
            local: {},
            docGias: [],
            sachs: [],
            schema: yup.object({
                MaDocGia: yup.string().required("Mã độc giả là bắt buộc."),
                MaSach: yup.string().required("Mã sách là bắt buộc."),
                NgayMuon: yup.string().required("Ngày mượn là bắt buộc."),
                NgayTra: yup.string().required("Ngày trả là bắt buộc."),
                TrangThai: yup.string().required("Trạng thái là bắt buộc."),
            }),
        };
    },
    computed: {
        isTrangThaiDisabled() {
            return this.local.TrangThai === "Đã trả";
        },
        trangThaiOptions() {
            const current = this.local.TrangThai;
            if (current === "Chờ duyệt") return ["Đã duyệt", "Từ chối"];
            if (current === "Chờ trả") return ["Đã trả", "Từ chối"];
            return [current]; // Đã trả thì không sửa nữa
        },
    },
    watch: {
        phieu: {
            immediate: true,
            handler(newVal) {
                this.local = { ...newVal };
            },
        },
        // "local.NgayTraThuc"(newVal) {
        //     const ngayTra = new Date(this.local.NgayTra);
        //     const ngayTraThuc = new Date(newVal);

        //     if (!this.local.NgayTra || !newVal) {
        //         this.local.TienPhatTreHan = 0;
        //         return;
        //     }
        //     const soNgayTre = Math.floor((ngayTraThuc - ngayTra) / 86400000);
        //     this.local.TienPhatTreHan = soNgayTre > 0 ? soNgayTre * 5000 : 0;
        // }
        "local.NgayTraThuc"(newVal) {
            const ngayMuon = new Date(this.local.NgayMuon);
            const ngayTra = new Date(this.local.NgayTra);
            const ngayTraThuc = new Date(newVal);
            if (!this.local.NgayMuon || !this.local.NgayTra || !newVal) {
                this.local.TienPhatTreHan = 0;
                return;
            }
            if (ngayTraThuc < ngayMuon) {
                alert("Ngày trả thực không được nhỏ hơn ngày mượn.");
                this.local.NgayTraThuc = "";
                this.local.TienPhatTreHan = 0;
                return;
            }
            const soNgayTre = Math.floor((ngayTraThuc - ngayTra) / 86400000);
            this.local.TienPhatTreHan = soNgayTre > 0 ? soNgayTre * 5000 : 0;
        }
    },
    async mounted() {
        this.docGias = await DocGiaService.getAll();
        this.sachs = await SachService.getAll();
    },
    methods: {
        themMoi() {
            this.$emit("them", this.local);
        },
        capNhat() {
            this.$emit("capnhat", this.local);
        },
        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>
