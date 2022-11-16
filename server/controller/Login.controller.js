const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const AccountModel = require("../model/Login.model");


const register = async (ctx) => {
  console.log(ctx.request.body.password, process.env.PASS_SEC)
  const newUser = new AccountModel({
    name: ctx.request.body.name,
    password: CryptoJS.AES.encrypt(ctx.request.body.password, process.env.PASS_SEC).toString(),
  });
  try {
    ctx.body = await newUser.save();
  } catch (err) {
    ctx.body = err;
  }
};

const login = async (ctx) => {
    const user = await AccountModel.findOne({
      name: ctx.request.body.name,
    });
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = ctx.request.body.password;

    const token = jwt.sign({ id: user._id }, process.env.PASS_SEC, { expiresIn: "1h" });
    const { password, ...others } = user._doc;
    ctx.body = { ...others, token };
};

const getUser = async (ctx) => {
      const data = await AccountModel.findById(ctx.params.id);
      ctx.body = data;
  };

module.exports = { login: login, register: register, getUser: getUser };