const { test, trait } = use("Test/Suite")("Order");
const Order = use("App/Models/Order");
const Factory = use("Factory");

trait("Test/ApiClient");
trait("Auth/Client");

const body = {
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

test("Cadastro de pedidos", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();

  const response = await client
    .post("orders")
    .loginVia(admin, "jwt")
    .send(body)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: {
      data: { ...body }
    }
  });
});

test("Listagem de todos os pedidos", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();
  await Order.create({
    title: "Love Popcorn Nutella",
    name_client: "Love",
    quantity: "10",
    size: "500g",
    popcorn_value: "10,00",
    flavor: "Nutella",
    observation: "Só Nutella",
    form_payment: "dinheiro",
    order_delivery: 0
  });

  const response = await client
    .get("orders")
    .loginVia(admin, "jwt")
    .query(body)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ data: [{ ...body }] });
});

test("Buscar de um pedido pelo id no Banco de dados", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();

  const body1 = {
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

  const response = await client
    .get("orders/1")
    .loginVia(admin, "jwt")
    .query(body1)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: { ...body }
  });
});

test("Buscar de um pedido teste de Falha", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();

  const body1 = {
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

  const response = await client
    .get("orders/0")
    .loginVia(admin, "jwt")
    .query(body1)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({ success: false });
});

test("Buscar no Banco para atualizar um ou mais campos", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();
  const order = await Factory.model("App/Models/Order").create();

  const data = {
    title: `${order.title} test`,
    name_client: "Love",
    quantity: "10",
    size: "500g",
    popcorn_value: "10,00",
    flavor: "Nutella",
    observation: "Só Nutella",
    form_payment: "dinheiro",
    order_delivery: 0
  };

  const response = await client
    .put(`orders/${order.id}`)
    .loginVia(admin, "jwt")
    .send(data)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: {
      data: { ...data }
    }
  });
});

test("Atualizar um ou mais campos teste de Falha", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();
  const order = await Factory.model("App/Models/Order").create();

  const data = {
    title: `${order.title} test`,
    name_client: "Love",
    quantity: "10",
    size: "500g",
    popcorn_value: "10,00",
    flavor: "Nutella",
    observation: "Só Nutella",
    form_payment: "dinheiro",
    order_delivery: 0
  };

  const response = await client
    .put(`orders/0`)
    .loginVia(admin, "jwt")
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({ success: false });
});

test("Delete de pedidos do banco", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();
  const order = await Factory.model("App/Models/Order").create();

  const response = await client
    .delete(`orders/${order.id}`)
    .loginVia(admin, "jwt")
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({});
});

test("Delete teste de Falha registro não existe", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create();
  const order = await Factory.model("App/Models/Order").create();

  const response = await client
    .delete(`orders/0`)
    .loginVia(admin, "jwt")
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({ success: false });
});
