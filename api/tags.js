const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;

  try {
    // use our method to get posts by tag name from the db
    const postsByTag = await getPostsByTagName(tagName);

    const filteredPosts = postsByTag.filter((post) => {
      return post.active || (req.user && post.author.id === req.user.id);
    });

    // send out an object to the client { posts: // the posts }
    res.send({ posts: filteredPosts });
    next();
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message });
  }
});

module.exports = tagsRouter;
