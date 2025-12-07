<template>
    <div>
        <h4><i class="fa-solid fa-user-tie me-2"></i>Quản lý nhân viên</h4>

        <!-- Ô tìm kiếm -->
        <InputSearch v-model="searchText" @submit="timKiemNhanVien" />

        <!-- Form -->
        <NhanVienForm :nhanvien="nhanvien" @them="themNhanVien" @capnhat="capNhatNhanVien" @cancel="resetForm" />

        <!-- Danh sách nhân viên -->
        <h5><i class="fa-solid fa-clipboard-list"></i>Danh sách nhân viên</h5>
        <table class="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>MSNV</th>
                    <th>Họ tên</th>
                    <th>Chức vụ</th>
                    <th>Địa chỉ</th>
                    <th>Điện thoại</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="nv in nhanviens" :key="nv.MSNV">
                    <td>{{ nv.MSNV }}</td>
                    <td>{{ nv.HoTenNV }}</td>
                    <td>{{ nv.Chucvu }}</td>
                    <td>{{ nv.Diachi }}</td>
                    <td>{{ nv.SoDienThoai }}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" @click="editNhanVien(nv)"><i
                                class="fa-solid fa-user-pen"></i></button>
                        <button class="btn btn-sm btn-danger" @click="deleteNhanVien(nv.MSNV)"><i
                                class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import NhanVienForm from "@/components/NhanVienForm.vue";
import NhanVienService from "@/services/nhanvien.service";
import InputSearch from "@/components/InputSearch.vue";

export default {
    components: { NhanVienForm, InputSearch },
    data() {
        return {
            searchText: "",
            allNhanViens: [],
            nhanviens: [],
            nhanvien: {
                HoTenNV: "",
                MSNV: "",
                Chucvu: "",
                Diachi: "",
                SoDienThoai: "",
                Password: "",
                oldMSNV: "",
            },
        };
    },
    methods: {
        async fetchNhanViens() {
            const data = await NhanVienService.getAll();
            this.allNhanViens = data;
            this.nhanviens = data;
        },

        timKiemNhanVien() {
            const tuKhoa = this.searchText.trim().toLowerCase();
            if (!tuKhoa) {
                this.nhanviens = this.allNhanViens;
                return;
            }

            this.nhanviens = this.allNhanViens.filter((nv) =>
                nv.HoTenNV?.toLowerCase().includes(tuKhoa) ||
                nv.MSNV?.toLowerCase().includes(tuKhoa)
            );
        },

        async themNhanVien(data) {
            try {
                await NhanVienService.create(data);
                this.$toast?.success?.("Thêm nhân viên thành công!") || alert("Đã thêm nhân viên.");
                // this.resetForm();
                this.fetchNhanViens();
            } catch (error) {
                if (error.response?.status === 409) {
                    this.$toast?.error?.("Mã nhân viên đã tồn tại!") || alert("Mã nhân viên đã tồn tại!");
                } else {
                    this.$toast?.error?.("Lỗi khi thêm nhân viên!") || alert("Lỗi khi thêm nhân viên.");
                    console.error(error);
                }
            }
        },

        async capNhatNhanVien(data) {
            try {
                if (data.Password) delete data.Password;

                await NhanVienService.update(this.nhanvien.oldMSNV, data);
                this.$toast?.success?.("Cập nhật nhân viên thành công!") || alert("Đã cập nhật.");
                // this.resetForm();
                this.fetchNhanViens();
                this.nhanvien.oldMSNV = data.MSNV;
            } catch (error) {
                this.$toast?.error?.("Lỗi khi cập nhật nhân viên!") || alert("Lỗi khi cập nhật.");
                console.error(error);
            }
        },

        editNhanVien(nv) {
            this.nhanvien = { ...nv, oldMSNV: nv.MSNV };
        },


        async deleteNhanVien(id) {
            if (confirm("Xóa nhân viên này?")) {
                try {
                    await NhanVienService.delete(id);
                    this.fetchNhanViens();
                    this.resetForm();
                } catch (error) {
                    this.$toast?.error?.("Lỗi khi xoá!") || alert("Xoá thất bại.");
                }
            }
        },

        resetForm() {
            this.nhanvien = {
                HoTenNV: "",
                MSNV: "",
                Chucvu: "",
                Diachi: "",
                SoDienThoai: "",
                // Password: "",
            };
        },
    },
    mounted() {
        this.fetchNhanViens();
    },
};
</script>
