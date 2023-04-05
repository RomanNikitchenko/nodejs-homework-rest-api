const messages = {
  400: "Missing Fields",
  401: "Not Authorize",
  403: "Fobidden",
  404: "Not Found",
  409: "Conflict Conflict",
};

const createError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createError;
