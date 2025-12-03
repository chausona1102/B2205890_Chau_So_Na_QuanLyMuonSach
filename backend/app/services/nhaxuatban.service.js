const { ObjectId } = require("mongodb");

class NhaXuatBanService {
  constructor(client) {
    this.NXB = client.db().collection("nhaxuatban");
    this.NXB.createIndex({ MaNXB: 1 }, { unique: true });
  }

  extractData(payload) {
    const nhaXuatBan = {
      MaNXB: payload.MaNXB,
      TenNXB: payload.TenNXB,
      DiaChi: payload.DiaChi,
    };

    Object.keys(nhaXuatBan).forEach(
      (key) => nhaXuatBan[key] === undefined && delete nhaXuatBan[key]
    );

    return nhaXuatBan;
  }

  async create(payload) {
    const data = this.extractData(payload);
    const result = await this.NXB.insertOne(data);
    return result;
  }

  async find(filter) {
    const cursor = await this.NXB.find(filter);
    return await cursor.toArray();
  }

  async findAll() {
    return await this.find({});
  }

  async findByMaNXB(ma) {
    return await this.NXB.findOne({ MaNXB: ma });
  }

  async update(ma, payload) {
    const update = this.extractData(payload);
    const result = await this.NXB.findOneAndUpdate(
      { MaNXB: ma },
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(ma) {
    const result = await this.NXB.findOneAndDelete({ MaNXB: ma });
    return result;
  }

  async deleteAll() {
    const result = await this.NXB.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = NhaXuatBanService;
