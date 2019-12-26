"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", table => {
      table.increments();
      // table
      //   .string("uid", 255)
      //   .notNullable()
      //   .unique();
      table.integer("admin_id").unsigned();
      table.string("title", 255).notNullable();
      table.string("name_client", 255).notNullable();
      table.string("quantity", 255).notNullable();
      table.string("size", 255).notNullable();
      table.string("popcorn_value", 255).notNullable();
      table.string("flavor", 255).notNullable();
      table.string("observation", 255);
      table
        .enu("form_payment", ["credito", "debito", "dinheiro", "picpay"])
        .defaultTo("dinheiro");
      table.integer("order_delivery", 11).defaultTo(0);
      table
        .foreign("admin_id")
        .references("id")
        .on("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
