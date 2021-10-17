const router = require("express").Router();
const Blogpost = require("../models/Blogpost");
const { getAllBlogpostTitles } = require("../functions/blogFunctions");

router.get("/getAllBlogposts", async (req, res) => {
  const blogposts = await Blogpost.find({}).sort({ createdAt: -1 });

  if (!blogposts) {
    return res.status(400).send("Error! No blogposts available");
  }

  res.send(blogposts);
});

router.get("/getAllBlogpostTitles", async (req, res) => {
  const blogposts = await Blogpost.find({}).sort({ createdAt: -1 });

  if (!blogposts) {
    return res.status(400).send("Error! No blogposts available");
  }

  let blogpostTitles = [];

  getAllBlogpostTitles(blogposts, blogpostTitles);

  res.send(blogpostTitles);
});

router.get("/getBlogpost/:id", async (req, res) => {
  const blogpost = await Blogpost.findOne({ _id: req.params.id });

  if (!blogpost) {
    return res.status(400).send("Error! Blogpost doesn't exist");
  }

  res.send(blogpost);
});

module.exports = router;
