const Admin = use("App/Models/User");

class AdminController {
  /**
   *
   * metodo de registro de admins
   *
   */

  async register({ request, response }) {
    const admin = request.only(["email", "name", "password"]);

    const data = await Admin.create(admin);

    return response.status(200).send({
      success: true,
      data: { data, message: "Cadastrado com Sucesso!" }
    });
  }

  /**
   *
   * metodo de acesso a sessão do admin
   *
   */

  async login({ request, auth, response }) {
    const { email, password } = request.all();

    return response.status(200).send({
      success: true,
      data: await auth.attempt(email, password)
    });
  }

  /**
   *
   * currentUser
   *
   */

  async currentUser({ auth }) {
    const data = await User.findOrFail(auth.user.id);
    return data;
  }
}

module.exports = AdminController;
