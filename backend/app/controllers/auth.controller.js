const MongoDB = require("../utils/mongodb.util");
const bcrypt = require("bcryptjs");
const NhanVienService = require("../services/nhanvien.service");
const DocGiaService = require("../services/docgia.service");
const ApiError = require("../api-error");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new ApiError(400, "Thiếu tài khoản hoặc mật khẩu"));

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const docGiaService = new DocGiaService(MongoDB.client);

    let user = await nhanVienService.findByMSNV(username);

    if (user && (await bcrypt.compare(password, user.Password))) {
      delete user.Password;
      return res.send({ role: "admin", user });
    }

    user = await docGiaService.findByMaDocGia(username);
    if (user && (await bcrypt.compare(password, user.Password))) {
      delete user.Password;
      return res.send({ role: "user", user });
    }

    // const matched = await bcrypt.compare(password, user.Password);

    return next(new ApiError(401, "Sai tài khoản hoặc mật khẩu"));
  } catch (err) {
    return next(new ApiError(500, "Đăng nhập thất bại"));
  }
};
