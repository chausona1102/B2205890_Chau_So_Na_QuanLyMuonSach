const { ObjectId } = require("mongodb");

class MuonSachService {
  constructor(client) {
    this.client = client; // lưu client
    this.collection = client.db().collection("muonsach");
  }

  extractData(payload) {
    const data = {
      MaDocGia: payload.MaDocGia,
      MaSach: payload.MaSach,
      NgayMuon: payload.NgayMuon || "",
      NgayTra: payload.NgayTra || "",
      TrangThai: payload.TrangThai || "Chờ duyệt",
      NgayTraThuc: payload.NgayTraThuc || "",
      TienPhatTreHan: payload.TienPhatTreHan || 0,
    };

    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );

    return data;
  }

  async create(payload) {
    const data = this.extractData(payload);
    const result = await this.collection.insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async find(filter) {
    return await this.collection.find(filter).toArray();
  }

  async findAll() {
    return await this.find({});
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, payload) {
    const data = this.extractData(payload);
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result.modifiedCount > 0;
  }

  async delete(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async findByMaDocGia(maDocGia) {
    const records = await this.collection
      .find({ MaDocGia: maDocGia })
      .toArray();

    const sachCollection = this.client.db().collection("sach"); // ✅ Sửa đúng

    // Gắn thêm Tên Sách cho mỗi phiếu mượn
    for (const record of records) {
      const sach = await sachCollection.findOne({ MaSach: record.MaSach });
      record.TenSach = sach?.TenSach || "(Không tìm thấy tên sách)";
    }

    return records;
  }
}

module.exports = MuonSachService;
