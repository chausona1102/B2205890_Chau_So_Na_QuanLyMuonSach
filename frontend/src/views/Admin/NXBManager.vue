<template>
    <div>
        <h4><i class="fas fa-building me-1"></i>Quản lý nhà xuất bản</h4>

        <InputSearch v-model="searchText" @submit="timKiem" />

        <NXBForm :nxb="nxb" @them="themNXB" @capnhat="capNhatNXB" @cancel="resetForm" />

        <h5><i class="fa-solid fa-clipboard-list"></i>Danh sách nhà xuất bản</h5>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Mã NXB</th>
                    <th>Tên NXB</th>
                    <th>Địa chỉ</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in danhSachNXB" :key="p._id">
                    <td>{{ p.MaNXB }}</td>
                    <td>{{ p.TenNXB }}</td>
                    <td>{{ p.DiaChi }}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" @click="editNXB(p)"><i
                                class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger" @click="xoaNXB(p.MaNXB)"><i
                                class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import NXBForm from "@/components/NXBForm.vue";
import NhaXuatBanService from "@/services/nhaxuatban.service";
import InputSearch from "@/components/InputSearch.vue";

export default {
    components: { NXBForm, InputSearch },
    data() {
        return {
            searchText: "",
            allNXBs: [],
            danhSachNXB: [],
            nxb: {
                MaNXB: "",
                TenNXB: "",
                DiaChi: "",
                old: "",
            },
        };
    },
    methods: {
        async fetchNXBs() {
            this.allNXBs = await NhaXuatBanService.getAll();
            this.danhSachNXB = [...this.allNXBs];
        },
        timKiem() {
            const tuKhoa = this.searchText.trim().toLowerCase();
            if (!tuKhoa) {
                this.danhSachNXB = this.allNXBs;
            } else {
                this.danhSachNXB = this.allNXBs.filter(
                    (nxb) =>
                        nxb.MaNXB?.toLowerCase().includes(tuKhoa) ||
                        nxb.TenNXB?.toLowerCase().includes(tuKhoa)
                );
            }
        },
        async themNXB(data) {
            try {
                await NhaXuatBanService.create(data);
                this.$toast?.success?.("Thêm thành công!") || alert("Đã thêm.");
                this.fetchNXBs();
            } catch (err) {
                if (err.response?.status === 409) {
                    this.$toast?.error?.("Mã NXB đã tồn tại!") || alert("Mã đã tồn tại.");
                } else {
                    this.$toast?.error?.("Lỗi khi thêm!") || alert("Thêm thất bại.");
                }
            }
        },
        async capNhatNXB(data) {
            try {
                await NhaXuatBanService.update(this.nxb.old, data);
                this.$toast?.success?.("Cập nhật thành công!") || alert("Đã cập nhật.");
                this.fetchNXBs();
                this.nxb.old = data.MaNXB;
            } catch (err) {
                this.$toast?.error?.("Lỗi khi cập nhật!") || alert("Cập nhật thất bại.");
            }
        },
        editNXB(nxb) {
            this.nxb = { ...nxb, old: nxb.MaNXB, };
        },
        async xoaNXB(id) {
            if (confirm("Bạn có chắc muốn xoá không?")) {
                await NhaXuatBanService.delete(id);
                this.fetchNXBs();
                this.resetForm();
            }
        },
        resetForm() {
            this.nxb = {
                MaNXB: "",
                TenNXB: "",
                DiaChi: "",
            };
        },
    },
    mounted() {
        this.fetchNXBs();
    },
};
</script>
