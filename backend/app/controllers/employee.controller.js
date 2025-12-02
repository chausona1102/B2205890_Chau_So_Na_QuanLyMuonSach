const NhanVienService = require("../services/employee.service");
const MongoDB = require("../utils/mongodb.utils");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.MSNV || !req.body?.HoTenNV) {
    return next(new ApiError(400, "Thiếu mã hoặc tên nhân viên"));
  }

  try {
    const service = new NhanVienService(MongoDB.client);
    const exists = await service.findByMSNV(req.body.MSNV);
    if (exists) {
      return next(new ApiError(409, "Mã nhân viên đã tồn tại"));
    }

    const result = await service.create(req.body);
    return res.send(result);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ApiError(409, "Mã nhân viên đã tồn tại"));
    }
    return next(new ApiError(500, "Lỗi khi tạo nhân viên"));
  }
};

exports.findAll = async (_req, res, next) => {
  try {
    const service = new NhanVienService(MongoDB.client);
    const docs = await service.findAll();
    return res.send(docs);
  } catch (err) {
    return next(new ApiError(500, "Không thể lấy danh sách nhân viên"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const service = new NhanVienService(MongoDB.client);
    const doc = await service.findByMSNV(req.params.id);
    if (!doc) return next(new ApiError(404, "Không tìm thấy nhân viên"));
    return res.send(doc);
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi tìm nhân viên"));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được rỗng"));
  }

  try {
    const service = new NhanVienService(MongoDB.client);
    const result = await service.update(req.params.id, req.body);
    if (!result) return next(new ApiError(404, "Không tìm thấy nhân viên"));
    return res.send({ message: "Cập nhật thành công" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi cập nhật nhân viên"));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const service = new NhanVienService(MongoDB.client);
    const result = await service.delete(req.params.id);
    if (!result) return next(new ApiError(404, "Không tìm thấy nhân viên"));
    return res.send({ message: "Xoá thành công" });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xoá nhân viên"));
  }
};

exports.deleteAll = async (_req, res, next) => {
  try {
    const service = new NhanVienService(MongoDB.client);
    const count = await service.deleteAll();
    return res.send({ message: `Đã xoá ${count} nhân viên` });
  } catch (err) {
    return next(new ApiError(500, "Lỗi khi xoá tất cả nhân viên"));
  }
};
