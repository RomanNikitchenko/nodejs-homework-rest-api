const { User } = require('../../models/user');

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    ResponseBody: {
      email,
      subscription,
    }
  })
};

module.exports = getCurrent;
