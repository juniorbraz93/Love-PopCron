const { test, trait } = use("Test/Suite")("Admin");
const Admin = use("App/Models/User");
const Factory = use("Factory");

trait("Test/ApiClient");
trait("Auth/Client");

test("Registor de Admin", async ({ assert, client }) => {
  const body = {
    name: "Leonardo Cunha",
    email: "test@gmail.com",
    password: "123123"
  };

  const response = await client
    .post("/register")
    .send(body)
    .end();

  // console.log(response);

  response.assertStatus(200);
  response.assertJSONSubset({
    data: { data: { name: body.name, email: body.email } }
  });
});

test("Login do Admin", async ({ assert, client }) => {
  const admin = await Factory.model("App/Models/User").create();

  const response = await client
    .post("/login")
    .send({ email: admin.email, password: "123123" })
    .end();

  // console.log(response.body.data.token);

  response.assertStatus(200);
  response.assertJSONSubset({});
});
