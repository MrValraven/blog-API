const router = require("express").Router();
const Blogpost = require("../models/Blogpost");
const { createCurrentDate } = require("../functions/blogFunctions");
const { blogpostValidation } = require("../validation/validation");

router.post("/createBlogpost", async (req, res) => {
  blogpostValidation(req.body);

  const todaysDate = createCurrentDate();

  // Create new blogpost
  const blogpost = new Blogpost({
    title: req.body.title,
    category: req.body.category,
    categoryColor: req.body.categoryColor,
    date: todaysDate.date,
    createdAt: parseInt(todaysDate.createdAt),
    imageLink: req.body.imageLink,
    paragraphs: req.body.paragraphs,
    signature: req.body.signature,
  });

  try {
    //Save blogpost in Database
    const savedBlogpost = await blogpost.save();
    res.send({ message: "Blog post added!" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.put("/updateBlogpost"),
  async (req, res) => {
    const blogpost = await Blogpost.findOne({ title: req.body.title });

    if (!blogpost) {
      return res.status(400).send("Error! Blogpost doesn't exist");
    }

    try {
      const updatedBlogpost = await Blogpost.updateOne();
      res.send(updatedBlogpost);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

router.delete("/deleteBlogpost", async (req, res) => {
  const blogpost = await Blogpost.findOne({ title: req.body.title });

  if (!blogpost) {
    return res.status(400).send("Error! Blogpost doesn't exist");
  }

  try {
    const removedBlogpost = await blogpost.remove();
    res.send({ message: "Blogpost deleted!" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
