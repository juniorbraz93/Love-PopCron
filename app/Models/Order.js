/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  static get table() {
    return "orders";
  }

  Admin() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Order;
