'use strict';

const { request } = require("@octokit/request");
const axios = require("axios");
const md = require('markdown-it')();

module.exports = ({ strapi }) => ({

  getProjectForRepo: async (repo) => {
    const {id} = repo; 
    const matchingProjects = await strapi.entityService.findMany("plugin::github-projects.project", {
      filters: {
        repositoryId: id
      }
    });
    if (matchingProjects.length == 1)  return matchingProjects[0].id;
    return null;
  },

  getPublicRepos: async () => {
    const result = await request("GET /user/repos", {
      headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    });
    return Promise.all(result.data.map(async (item) => {
      const { id, name, description, html_url, owner, default_branch } = item;
      const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;

      try {
        const response = await axios.get(readmeUrl);
        // console.log("Response", response);
        if (response) readmeResponse = response.data;
      } catch (e) {
        // console.log(`Error occurred on item ${name}`);
        // console.log("Error", e);
      }

      const longDescription = md.render((await axios.get(readmeUrl)).data).replaceAll("\n", "<br/>");
      const repo = {
        id,
        name,
        shortDescription: description,
        url: html_url,
        longDescription,
      };

      


      const relatedProjectId = strapi.plugin("github-projects").service("getReposService").getProjectForRepo(repo);
        return { 
          ...repo,
          projectId: relatedProjectId
        }
      })
    );
  },
});

