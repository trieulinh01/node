const Category = require('../models/Category')
const categoriesValidators = require("../validations/categories");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const { SECRET_CODE } = process.env;
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class UsersController {
  // [GET] /
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
  //[GET] /users/ :id
  async getCategoryDetail(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
  //post /users
  async createCategory(req, res) {
    try {
      const { username, email, password } = req.body;

      // Bước 1: Validate email
      const { error } = categoriesValidators.validate(req.body, {
        abortEarly: false, // check hết các lỗi
      });
      if (error) {
        console.log(error.details.map((err) => err.message));
        return res.json({ message: error });
      }
      // Bước 2: Email người dùng đăng ký đã tồn tại
      const userExist = await Category.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          message: "Email này đã được đăng ký",
        });
      }
      // Bước 3: Mã hoá mật khẩu
      const hashPassword = await bcryptjs.hash(password, 10);

      await User.create({ username, email, password: hashPassword });
      //* Bước 5: Gửi thông báo cho người dùng.
      res.status(200).json({ message: "Add user successfull" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async editCategory(req, res) {
    await User.updateOne({ _id: req.params.user._id }, req.body).then(() => {
      res.json({ message: "edit user successfull" });
    });
  }
  //<post>users/login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      // Bước 1: Validate email
      const { error } = createUserValidator.validate(req.body, {
        abortEarly: false, // check hết các lỗi
      });
      if (error) {
        console.log(error.details.map((err) => err.message));
        return res.json({ message: error });
      }
      // Bước 2: Kiểm tra xem email có trong db hay không?
      const user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        return res.status(404).json({
          message: "Email or Password chưa tồn tại, vui lòng kiểm tra lại!",
        });
      }
      // Bước 3: Kiểm tra password
      const isMatch = await bcryptjs.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({
          message: "Email or Password không đúng, vui lòng kiểm tra lại!",
        });
      }
      // Bước 4: Tạo ra token
      const token = jwt.sign({ _id: user._id }, SECRET_CODE, {
        expiresIn: "1h",
      });
      if (!token) {
        return res.status(400).json({ message: "Invalid token" });
      }
      res.json({
        message: "Login successfull",
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
  // [DELETE] /users/:id
  async deleteCategory(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ mess: "xóa thành công" });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
}

module.exports = new UsersController();
