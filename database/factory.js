"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/User", faker => {
  return {
    name: faker.name(),
    email: faker.email({ domain: "gmail.com" }),
    password: "123123"
  };
});

Factory.blueprint("App/Models/Order", faker => {
  return {
    title: "Love Popcorn Nutella",
    name_client: "Love",
    quantity: "10",
    size: "500g",
    popcorn_value: "10,00",
    flavor: "Nutella",
    observation: "Só Nutella",
    form_payment: "dinheiro",
    order_delivery: 0
  };
});
