const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/UserModel");
dotenv.config();
const { SECRET_CODE } = process.env;
const checkPermission = async (req, res, next) => {
  try {
    //console.log("check permission ");
    //Bước 1: Kiểm tra xem đã đăng nhập hay chưa?
    //(req.header.authorization co chua token) -> Check loi
    //console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Bạn chưa đăng nhập!" });
    }
    //b2 : chech token có hợp lệ k
    const decoded = jwt.verify(token, SECRET_CODE);
    console.log(decoded);
    //b3 tìm user từ token
    const user = await User.findById(decoded._id);
    console.log(user);
    //b4
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền thực hiện thao tác này!" });
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token hết hạn" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    // Handle other errors as needed
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};
module.exports = checkPermission;
