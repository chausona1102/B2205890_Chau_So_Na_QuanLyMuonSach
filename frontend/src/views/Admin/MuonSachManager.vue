<template>
    <div>
        <h4><i class="fa-solid fa-book me-2"></i>Quản lý phiếu mượn sách</h4>

        <!-- Tìm kiếm -->
        <InputSearch v-model="searchText" @submit="timKiem" />

        <!-- Form phiếu mượn -->
        <FormMuonSach :phieu="phieu" @them="themPhieu" @capnhat="capNhatPhieu" @cancel="resetForm" />

        <!-- Danh sách -->
        <h5><i class="fa-solid fa-clipboard-list mt-4"></i>Danh sách mượn</h5>
        <table class="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>Mã độc giả</th>
                    <th>Mã sách</th>
                    <th>Ngày mượn</th>
                    <th>Ngày trả</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in phieus" :key="p._id">
                    <td>{{ p.MaDocGia }}</td>
                    <td>{{ p.MaSach }}</td>
                    <td>{{ p.NgayMuon }}</td>
                    <td>{{ p.NgayTra }}</td>
                    <td>{{ p.TrangThai }}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" @click="editPhieu(p)"><i
                                class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger" @click="xoaPhieu(p._id)"><i
                                class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import FormMuonSach from "@/components/FormMuonSach.vue";
import InputSearch from "@/components/InputSearch.vue";
import MuonSachService from "@/services/muonsach.service";
import Sach from "@/services/sach.service";

export default {
    components: { FormMuonSach, InputSearch },
    data() {
        return {
            searchText: "",
            allPhieus: [],
            phieus: [],
            phieu: {
                MaDocGia: "",
                MaSach: "",
                NgayMuon: "",
                NgayTra: "",
                TrangThai: "Chờ duyệt",
                _id: null,
                oldAct: "",
            },
        };
    },
    methods: {
        async fetchPhieus() {
            this.allPhieus = await MuonSachService.getAll();
            this.phieus = this.allPhieus;
        },
        timKiem() {
            const tuKhoa = this.searchText.toLowerCase().trim();
            this.phieus = this.allPhieus.filter((p) =>
                p.MaDocGia?.toLowerCase().includes(tuKhoa) ||
                p.MaSach?.toLowerCase().includes(tuKhoa)
            );
        },
        async themPhieu(data) {
            try {
                await MuonSachService.create(data);
                if (data.TrangThai == "Đã duyệt") {
                    await Sach.updateNumber(data.MaSach, { soLuong: 1 });
                }
                alert("Thêm phiếu thành công");
                this.fetchPhieus();
                // this.resetForm();
            } catch (err) {
                alert("Lỗi khi thêm phiếu");
            }
        },
        async capNhatPhieu(data) {
            try {
                await MuonSachService.update(data._id, data);
                if (data.TrangThai == "Đã duyệt" && this.phieu.TrangThai != "Đã duyệt") {
                    await Sach.updateNumber(data.MaSach, { soLuong: 1 });
                }
                alert("Cập nhật thành công");
                this.fetchPhieus();
                // this.resetForm();
            } catch (err) {
                alert("Lỗi khi cập nhật");
            }
        },
        editPhieu(p) {
            this.phieu = { ...p, oldAct: p.TrangThai };
        },
        async xoaPhieu(id) {
            if (confirm("Bạn có chắc muốn xóa phiếu mượn này?")) {
                try {
                    await MuonSachService.delete(id);
                    alert("Đã xóa thành công");
                    this.fetchPhieus();
                    this.resetForm();
                } catch (err) {
                    alert("Lỗi khi xóa phiếu mượn");
                }
            }
        },
        resetForm() {
            this.phieu = {
                MaDocGia: "",
                MaSach: "",
                NgayMuon: "",
                NgayTra: "",
                TrangThai: "Chờ duyệt",
                _id: null,
            };
        },
    },
    mounted() {
        this.fetchPhieus();
    },
};
</script>
