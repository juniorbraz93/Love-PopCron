/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/register", "AdminController.register").validator("AdminPOST");
Route.post("/login", "AdminController.login"); //.validator("AdminPOST");

// Routas

Route.post("orders", "OrderController.store")
  .middleware(["auth"])
  .validator("OrderPOST");
Route.get("orders", "OrderController.index")
  .middleware(["filterList: page, limit, name_client, created_at"])
  .middleware(["auth"]);
Route.get("orders/:id", "OrderController.show").middleware(["auth"]);
Route.put("orders/:id", "OrderController.update")
  .middleware(["auth"])
  .validator("OrderPOST");
Route.delete("orders/:id", "OrderController.destroy").middleware(["auth"]);
