<template>
    <div class="history-container">
        <h3 class="title">
            <i class="fa-solid fa-clock-rotate-left me-2"></i>
            Lịch sử mượn sách
        </h3>

        <div class="card shadow-sm p-3 rounded">
            <table class="table table-hover align-middle history-table">
                <thead>
                    <tr>
                        <th>Tên sách</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả dự kiến</th>
                        <th>Ngày trả thực tế</th>
                        <th>Trạng thái</th>
                        <th>Tiền phạt</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="history.length === 0">
                        <td colspan="6" class="text-center text-muted py-4">
                            Không có dữ liệu.
                        </td>
                    </tr>

                    <tr v-for="record in history" :key="record._id">
                        <td>{{ record.TenSach || "(Không rõ tên sách)" }}</td>
                        <td>{{ formatDate(record.NgayMuon) }}</td>
                        <td>{{ formatDate(record.NgayTra) }}</td>
                        <td>{{ formatDate(record.NgayTraThuc) || "Chưa trả" }}</td>

                        <td>
                            <span class="badge px-3 py-2" :class="{
                                'bg-warning text-dark': record.TrangThai === 'Chờ duyệt',
                                'bg-success': record.TrangThai === 'Đã mượn' || record.TrangThai === 'Đã duyệt',
                                'bg-secondary': record.TrangThai === 'Đã trả',
                                'bg-danger': record.TrangThai === 'Từ chối',
                            }">
                                {{ record.TrangThai }}
                            </span>
                        </td>

                        <td class="fw-bold text-danger">
                            {{ record.TienPhatTreHan ? record.TienPhatTreHan + 'đ' : '0đ' }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import MuonSachService from "@/services/muonsach.service";

export default {
    data() {
        return {
            history: [],
        };
    },
    methods: {
        formatDate(dateStr) {
            if (!dateStr) return "";
            return new Date(dateStr).toLocaleDateString("vi-VN");
        },
        async fetchHistory() {
            const docGia = JSON.parse(localStorage.getItem("user"));
            if (!docGia || !docGia.user?.MaDocGia) {
                alert("Bạn cần đăng nhập để xem lịch sử mượn sách.");
                return;
            }

            try {
                const data = await MuonSachService.findByMaDocGia(docGia.user.MaDocGia);
                this.history = data;
            } catch (err) {
                console.error(err);
                alert("Không thể tải lịch sử mượn sách.");
            }
        },
    },
    mounted() {
        this.fetchHistory();
    },
};
</script>
