require("dotenv").config();

module.exports = {
  env: {
    LOGIN_URL: process.env.LOGIN_URL,
    MATRIX_URL: process.env.MATRIX_URL,
  },
}
