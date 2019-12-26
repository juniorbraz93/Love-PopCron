/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FilterList {
  async handle({ request }, next, ...args) {
    const params = args[0];
    const receiveParams = request.all();
    request.receiveParams = {};

    for (const xParms in params) {
      params[xParms] = params[xParms].trim();
      if (receiveParams[params[xParms]]) {
        if (params[xParms] === "currentPage") {
          request.receiveParams.page = receiveParams[params[xParms]]
            ? receiveParams[params[xParms]]
            : 1;
        } else if (params[xParms] === "pageSize") {
          request.receiveParams.limit = receiveParams[params[xParms]]
            ? receiveParams[params[xParms]]
            : 20;
        } else {
          request.receiveParams[params[xParms]] = receiveParams[params[xParms]];
        }
      } else if (params[xParms] === "currentPage") {
        request.receiveParams.page = 1;
      } else if (params[xParms] === "pageSize") {
        request.receiveParams.limit = 20;
      } else {
        request.receiveParams[params[xParms]] = "";
      }
    }
    request.paramsList = params;
    await next();
  }
}

module.exports = FilterList;
