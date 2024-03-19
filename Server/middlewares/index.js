const authentication = require('./authentication');
const { authorizationAddUser, authorization } = require('./authorization');
const errorHandler = require('./errorhandler');

module.exports = {
  errorHandler,
  authentication,
  authorization,
  authorizationAddUser,
};
