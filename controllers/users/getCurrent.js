const { User } = require('../../models/user');
// const { createError } = require('../../helpers');
// const { Conflict } = require('http-errors');
// const bcrypt = require('bcryptjs');

const getCurrent = async (req, res, next) => {
  try {
    console.log(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
