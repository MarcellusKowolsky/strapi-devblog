'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      await strapi.service("api::post.post").exampleService();
      try {
        ctx.body = 'ok';
      } catch (err) {
        ctx.body = err;
      }
    },
  
    // Solution 1, fetch all post and filter them afterward
    // async find(ctx) {
    //   const { data, meta } = super.find(ctx);
    //   if (ctx.state.user) return { data, meta };
    //   const filteredData = data.filter((post) => !post.attributes.premium);
    //   return { data: filteredData, meta}
    // },
  
    // Solution 2: rewrite the action to fetch onlsy needed posts
    // async find(ctx) {
    //   const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium == false;
    //   if (ctx.stale.user || isRequestingNonPremium) return await super.find(ctx);
    //   const { query } = ctx;
    //   const filteredPosts = await strapi.service("api::post.post").find({
    //     ...query,
    //     filters: {
    //       ...query.filters,
    //       premium: false,
    //     }
    //   });
    //   const SanitizedPosts = await this.sanitizeOutput(filteredPosts, ctx);
    //   return this.transformResponse(SanitizedPosts);
    // },

  //   async find(ctx) {
  //     const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium == false;
  //     if (ctx.stale.user || isRequestingNonPremium) return await super.find(ctx);
  //     const publicPosts = await strapi.service("api::post.post").findPublic(ctx.query);
      
  //     const SanitizedPosts = await this.sanitizeOutput(publicPosts, ctx);
  //     return this.transformResponse(SanitizedPosts);
  // },

  async findOne(ctx) {
    if(ctx.state.user) return await super.findOne(ctx);
    const { id } = ctx.params;
    const { query } = ctx;
    const postIfPublic = await strapi.service("api::post.post").findOneIfPublic({
      id, query
    });
    const sanitizedEntity = await this.sanitizeOutput(postIfPublic, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async likePost(ctx) {
    const user = ctx.state.user;
    const postId = ctx.params.id;
    const {query} = ctx;
    const updatePost = await strapi.service("api::post.post").likePost({
      postId, userId: user.id, query
    });
    const sanitizedEntity = await this.sanitizeOutput(updatePost, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  }));





