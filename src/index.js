'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) { },
 











  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {},
};

//   bootstrap({ strapi }) {
//     strapi.db.lifecycles.subscribe({
//       models: ["admin::user"],
//       afterCreate: async ({ result }) => {
//         const { id,
//            firstname,
//             lastname,
//             email,
//             unsername,
//             createdAt,
//             updatedAt
//            } = result;
//         await strapi.service("api::author.author").create({
//           data:  {
//             id,
//             firstname,
//             lastname,
//             email,
//             unsername,
//             createdAt,
//             updatedAt,
//             admin_user: [id]         
//           },
//         });
//       },
//       afterUpdate: async ({result}) => {
//         const correspondingAuthor = (await strapi.service("api::author.author").find({
//         admin_user: [result.id],
//      })
//      ).results[0];

//      const {firstname, lastname, email, unsername, updatedAt } = result;
//      await strapi.service("api::author.author").update(correspondingAuthor.id, {
//       data: {
//         firstname, lastname, email, unsername, updatedAt
//        }
//      });
//     },
//   });
// },
// };