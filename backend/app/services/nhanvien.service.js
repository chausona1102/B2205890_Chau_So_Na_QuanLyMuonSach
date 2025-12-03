const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

class NhanVienService {
  constructor(client) {
    this.NhanVien = client.db().collection("nhanvien");

    this.NhanVien.createIndex({ MSNV: 1 }, { unique: true });
  }

  extractData(payload) {
    const nhanvien = {
      MSNV: payload.MSNV,
      HoTenNV: payload.HoTenNV,
      Password: payload.Password,
      Chucvu: payload.Chucvu,
      Diachi: payload.Diachi,
      SoDienThoai: payload.SoDienThoai,
    };

    Object.keys(nhanvien).forEach(
      (key) => nhanvien[key] === undefined && delete nhanvien[key]
    );

    return nhanvien;
  }

  async create(payload) {
    const data = this.extractData(payload);

    // Mã hóa mật khẩu nếu có
    if (data.Password) {
      const salt = await bcrypt.genSalt(10);
      data.Password = await bcrypt.hash(data.Password, salt);
    }

    const result = await this.NhanVien.insertOne(data);
    return result;
  }

  async find(filter) {
    const cursor = await this.NhanVien.find(filter);
    return await cursor.toArray();
  }

  async findAll() {
    return await this.find({});
  }

  async findByMSNV(msnv) {
    return await this.NhanVien.findOne({ MSNV: msnv });
  }

  async update(msnv, payload) {
    const update = this.extractData(payload);

    if (update.Password) {
      const salt = await bcrypt.genSalt(10);
      update.Password = await bcrypt.hash(update.Password, salt);
    }

    const result = await this.NhanVien.findOneAndUpdate(
      { MSNV: msnv },
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(msnv) {
    const result = await this.NhanVien.findOneAndDelete({ MSNV: msnv });
    return result;
  }

  async deleteAll() {
    const result = await this.NhanVien.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = NhanVienService;
