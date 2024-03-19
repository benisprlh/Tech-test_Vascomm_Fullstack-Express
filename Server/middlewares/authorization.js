const { Post } = require('../models');

async function authorization(req, res, next) {
  try {
    if (req.user.role === 'admin') {
      return next();
    }
    throw {name: "You don't have access"}
  } catch (error) {
    next(error);
  }
}


module.exports = {
  authorization,
};
