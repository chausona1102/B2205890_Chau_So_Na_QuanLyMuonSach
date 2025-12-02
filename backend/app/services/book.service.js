const { ObjectId } = require("mongodb");

class SachService {
  constructor(client) {
    this.Sach = client.db().collection("sach");

    this.Sach.createIndex({ MaSach: 1 }, { unique: true });
  }

  extractData(payload) {
    const sach = {
      MaSach: payload.MaSach,
      TenSach: payload.TenSach,
      DonGia: payload.DonGia,
      SoQuyen: payload.SoQuyen,
      NamXuatBan: payload.NamXuatBan,
      MaNXB: payload.MaNXB,
      NguonGoc: payload.NguonGoc,
    };
    Object.keys(sach).forEach(
      (key) => sach[key] === undefined && delete sach[key]
    );
    return sach;
  }

  async create(payload) {
    const data = this.extractData(payload);
    const result = await this.Sach.insertOne(data);
    return result;
  }

  async find(filter) {
    const cursor = await this.Sach.find(filter);
    return await cursor.toArray();
  }

  async findAll() {
    return await this.find({});
  }

  async findByMaSach(masach) {
    return await this.Sach.findOne({ MaSach: masach });
  }

  async update(masach, payload) {
    const update = this.extractData(payload);
    const result = await this.Sach.findOneAndUpdate(
      { MaSach: masach },
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(masach) {
    const result = await this.Sach.findOneAndDelete({ MaSach: masach });
    return result;
  }

  async deleteAll() {
    const result = await this.Sach.deleteMany({});
    return result.deletedCount;
  }
  async findByCondition({ ten, masach, tacgia }) {
    const filter = {};

    if (ten) {
      filter.TenSach = { $regex: new RegExp(ten, "i") }; // tìm không phân biệt hoa thường
    }
    if (masach) {
      filter.MaSach = { $regex: new RegExp(masach, "i") };
    }
    if (tacgia) {
      filter.NguonGoc = { $regex: new RegExp(tacgia, "i") }; // bạn có thể đổi lại là TacGia nếu dùng tên đó
    }

    return await this.collection.find(filter).toArray();
  }

  async truSoLuong(maSach, soLuongCanTru) {
    if (typeof soLuongCanTru !== "number" || soLuongCanTru <= 0) {
      throw new Error("Giá trị cần trừ phải là một số dương");
    }

    // Kiểm tra trước khi trừ (không để âm số lượng)
    const sach = await this.Sach.findOne({ MaSach: maSach });
    if (!sach) {
      throw new Error("Không tìm thấy sách");
    }

    if (sach.SoQuyen < soLuongCanTru) {
      throw new Error("Không đủ số lượng sách để trừ");
    }

    const result = await this.Sach.findOneAndUpdate(
      { MaSach: maSach },
      { $inc: { SoQuyen: -soLuongCanTru } }, // ✔ trừ đi
      { returnDocument: "after" }
    );

    return result.value;
  }
}

module.exports = SachService;
