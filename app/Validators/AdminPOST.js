const ValidatorMessage = require("./ValidatorMessage/ValidatorMessage");

class AdminPOST {
  get rules() {
    return {
      name: "string|max: 80",
      email: "required|string|max: 250|unique: users",
      password: "required|string|max: 60"
    };
  }

  get sanitizationRules() {
    return {
      name: "trim",
      email: "trim",
      password: "trim"
    };
  }

  get messages() {
    return ValidatorMessage.Admin;
  }

  async fails(errorMessages) {
    const returnData = {
      success: false,
      validationFail: true,
      data: errorMessages
    };

    return this.ctx.response.send(returnData);
  }
}

module.exports = AdminPOST;
