<template>
    <div>
        <div class="d-flex flex-column justify-content-center align-items-center mb-4" style="height: 10vh;">
            <h1 class="heading-booklist">Xin chào {{ userName() }}</h1>
        </div>
        <!-- Ô tìm kiếm -->
        <InputSearch v-model="searchText" @submit="timKiemSach" />

        <!-- Danh sách sách -->
        <div class="row mt-3 g-4 mb-5">
            <h4 class="title">
                <i class="fa-solid fa-book-open me-2"></i>Danh sách sách
            </h4>
            <div v-for="book in books" :key="book.MaSach" class="col-md-3">
                <div class="card book-card shadow-sm">

                    <!-- Ảnh sách -->
                    <img :src="book.image_url || '/img/no-image.png'" class="card-img-top book-img"
                        @error="e => e.target.src = '/img/no-image.png'" :alt="book.TenSach" :title="book.TenSach" />


                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title book-title">{{ book.TenSach }}</h5>

                        <p class="card-text text-muted small">
                            Tác giả: <b>{{ book.NguonGoc }}</b><br>
                            Năm xuất bản: <b>{{ book.NamXuatBan }}</b><br>
                            Số lượng:
                            <b :class="book.SoQuyen > 0 ? 'text-success' : 'text-danger'">
                                {{ book.SoQuyen }}
                            </b>
                        </p>

                        <button class="btn btn-primary w-100" @click="muonSach(book.MaSach)"
                            :disabled="book.SoQuyen <= 0">
                            {{ book.SoQuyen > 0 ? "Mượn sách" : "Hết sách" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/InputSearch.vue";
import SachService from "@/services/sach.service";
import MuonSachService from "@/services/muonsach.service";

export default {
    components: { InputSearch },
    data() {
        return {
            searchText: "",
            allBooks: [],
            books: [],
        };
    },
    async mounted() {
        await this.fetchBooks();
    },

    methods: {
        async fetchBooks() {
            try {
                const data = await SachService.getAll();
                this.allBooks = data;
                this.books = data;
            } catch (err) {
                console.error("Lỗi khi tải sách:", err);
            }
        },
        userName() {
            const userData = JSON.parse(localStorage.getItem("user") || "{}");
            if (!userData.user) return "Chưa đăng nhập";
            return `${userData.user.HoLot}${userData.user.Ten}`;
        },
        timKiemSach() {
            const tuKhoa = this.searchText.trim().toLowerCase();
            if (!tuKhoa) {
                this.books = this.allBooks;
                return;
            }

            this.books = this.allBooks.filter(
                (b) =>
                    b.TenSach?.toLowerCase().includes(tuKhoa) ||
                    b.NguonGoc?.toLowerCase().includes(tuKhoa)
            );
        },

        async muonSach(maSach) {
            const docGia = JSON.parse(localStorage.getItem("user"));
            if (!docGia || !docGia.user?.MaDocGia) {
                alert("Bạn cần đăng nhập để mượn sách.");
                return;
            }

            const maDocGia = docGia.user.MaDocGia;

            try {
                const danhSachPhieu = await MuonSachService.findByMaDocGia(maDocGia);

                const daMuon = danhSachPhieu.find(
                    (p) => p.MaSach === maSach && p.TrangThai !== "Đã trả"
                );

                if (daMuon) {
                    if (daMuon.TrangThai === "Chờ duyệt") {
                        alert("Bạn đã đăng ký mượn sách này và đang chờ duyệt.");
                    } else if (["Đã mượn", "Đã duyệt"].includes(daMuon.TrangThai)) {
                        alert("Bạn đang mượn sách này.");
                    }
                    return;
                }

                await MuonSachService.create({
                    MaDocGia: maDocGia,
                    MaSach: maSach,
                    TrangThai: "Chờ duyệt",
                    NgayMuon: "",
                    NgayTra: "",
                    NgayTraThuc: "",
                    TienPhatTreHan: 0,
                });

                alert("✅ Đăng ký mượn thành công. Vui lòng chờ duyệt!");
            } catch (err) {
                console.error(err);
                alert("Không thể đăng ký mượn sách.");
            }
        },
    },
};
</script>
