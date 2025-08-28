const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
  rolle,
}) => {
  try {
    if (!firstname || !email || !password) {
      throw new Error("All fields are required");
    }
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      rolle,
    });
    return user;
  } catch (error) {
    console.error("service Error registering user:", error);
  }
};
