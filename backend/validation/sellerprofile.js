const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateProfileInput(data) {
  let errors = {};
  data.contactno = !isEmpty(data.contactno) ? data.contactno : "";
  if (Validator.isEmpty(data.contactno)) {
    errors.contactno = "Contact Number is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
