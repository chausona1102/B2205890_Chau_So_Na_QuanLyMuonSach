<template>
    <div>
        <h4><i class="fa-solid fa-user me-2"></i>Quản lý độc giả</h4>

        <!-- Ô tìm kiếm -->
        <InputSearch v-model="searchText" @submit="timKiemDocGia" />

        <!-- Form độc giả -->
        <DocGiaForm :docgia="docgia" @them="themDocGia" @capnhat="capNhatDocGia" @cancel="resetForm" />

        <!-- Danh sách độc giả -->
        <h5><i class="fa-solid fa-clipboard-list"></i>Danh sách đọc giả</h5>
        <table class="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>Mã đọc giả</th>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Phái</th>
                    <th>Địa chỉ</th>
                    <th>Điện thoại</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dg in docgias" :key="dg.MaDocGia">
                    <td> {{ dg.MaDocGia }}</td>
                    <td>{{ dg.HoLot }} {{ dg.Ten }}</td>
                    <td>{{ dg.NgaySinh }}</td>
                    <td>{{ dg.Phai }}</td>
                    <td>{{ dg.DiaChi }}</td>
                    <td>{{ dg.DienThoai }}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" @click="editDocGia(dg)"><i
                                class="fa-solid fa-user-pen"></i></button>
                        <button class="btn btn-sm btn-danger" @click="deleteDocGia(dg.MaDocGia)"><i
                                class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DocGiaForm from "@/components/DocGiaForm.vue";
import DocGiaService from "@/services/docgia.service";
import InputSearch from "@/components/InputSearch.vue";

export default {
    components: {
        DocGiaForm,
        InputSearch,
    },
    data() {
        return {
            searchText: "",
            allDocGias: [],
            docgias: [],
            docgia: {
                MaDocGia: "",
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "Nam",
                DiaChi: "",
                DienThoai: "",
                Password: "",
                old: "",
            },
        };
    },
    methods: {
        async fetchDocGias() {
            const data = await DocGiaService.getAll();
            this.allDocGias = data;
            this.docgias = data;
        },
        timKiemDocGia() {
            const tuKhoa = this.searchText.trim().toLowerCase();
            if (!tuKhoa) {
                this.docgias = this.allDocGias;
                return;
            }

            this.docgias = this.allDocGias.filter((dg) =>
                (dg.HoLot + " " + dg.Ten).toLowerCase().includes(tuKhoa) ||
                dg.MaDocGia?.toLowerCase().includes(tuKhoa)
            );
        },
        async themDocGia(data) {
            try {
                await DocGiaService.create(data);
                this.$toast?.success?.("Thêm độc giả thành công!") || alert("Đã thêm độc giả.");
                // this.resetForm();
                this.fetchDocGias();
            } catch (error) {
                if (error.response?.status === 409) {
                    this.$toast?.error?.("Mã độc giả đã tồn tại!") || alert("Mã độc giả đã tồn tại!");
                } else {
                    this.$toast?.error?.("Lỗi khi thêm độc giả!") || alert("Lỗi khi thêm độc giả.");
                    console.error(error);
                }
            }
        },
        async capNhatDocGia(data) {
            try {
                await DocGiaService.update(this.docgia.old, data);
                this.$toast?.success?.("Cập nhật độc giả thành công!") || alert("Đã cập nhật.");
                // this.resetForm();
                this.fetchDocGias();
                this.docgia.old = data.MaDocGia;
            } catch (error) {
                this.$toast?.error?.("Lỗi khi cập nhật độc giả!") || alert("Lỗi khi cập nhật.");
                console.error(error);
            }
        },
        editDocGia(dg) {
            this.docgia = { ...dg, Password: "", old: dg.MaDocGia };
        },
        async deleteDocGia(id) {
            if (confirm("Xóa độc giả này?")) {
                try {
                    await DocGiaService.delete(id);
                    this.resetForm();
                    this.fetchDocGias();
                } catch (error) {
                    this.$toast?.error?.("Lỗi khi xoá!") || alert("Xoá thất bại.");
                }
            }
        },
        resetForm() {
            this.docgia = {
                MaDocGia: "",
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "Nam",
                DiaChi: "",
                DienThoai: "",
                Password: "",
            };
        },
    },
    mounted() {
        this.fetchDocGias();
    },
};
</script>
