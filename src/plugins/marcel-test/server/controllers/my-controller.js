'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('marcel-test')
      .service('myService')
      .getWelcomeMessage();
  },
});
