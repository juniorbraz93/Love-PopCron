const ValidatorMessage = require("./ValidatorMessage/ValidatorMessage");

class OrderPOST {
  get rules() {
    return {
      title: "required|string|max: 250",
      name_client: "required|string|max: 250",
      quantity: "required|string|max: 250",
      size: "required|string|max: 250",
      popcorn_value: "required|string|max: 250",
      flavor: "required|string|max: 250",
      observation: "string|max: 250"
    };
  }

  get sanitizationRules() {
    return {
      title: "trim",
      name_client: "trim",
      quantity: "trim",
      size: "trim",
      popcorn_value: "trim",
      flavor: "trim",
      observation: "trim"
    };
  }

  get messages() {
    return ValidatorMessage.Order;
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

module.exports = OrderPOST;
