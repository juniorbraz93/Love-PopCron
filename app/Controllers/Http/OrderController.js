const Order = use("App/Models/Order");

class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const filterParams = request.receiveParams;

    let data = Order.query();

    if (filterParams.name_client != "") {
      data.where("name_client", "like", `%${filterParams.name_client}%`);
    }
    if (filterParams.created_at != "") {
      data.where("created_at", "like", `%${filterParams.created_at}%`);
    }

    data = await data.paginate(filterParams.currentPage, filterParams.pageSize);

    return response.status(200).send({
      success: true,
      data: data
    });
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user;
    const body = request.only([
      "title",
      "name_client",
      "quantity",
      "size",
      "popcorn_value",
      "flavor",
      "observation",
      "form_payment",
      "order_delivery"
    ]);

    body.admin_id = id;

    const data = await Order.create(body);

    return response.status(200).send({
      success: true,
      data: { data, message: "Cadastrado com Sucesso!" }
    });
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const data = await Order.findOrFail(params.id);

    return response.status(200).send({
      success: true,
      data: data
    });
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = await Order.findOrFail(params.id);
    const body = request.only([
      "title",
      "name_client",
      "quantity",
      "size",
      "popcorn_value",
      "flavor",
      "observation",
      "form_payment",
      "order_delivery"
    ]);

    data.merge(body);

    await data.save();

    return response.status(200).send({
      success: true,
      data: { data, message: "Atualizado com sucesso" }
    });
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const data = await Order.findOrFail(params.id);

    await data.delete();

    return response.status(200).send({
      success: true,
      data: { message: "Excluído com sucesso" }
    });
  }
}

module.exports = OrderController;
