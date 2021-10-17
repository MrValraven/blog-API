const router = require("express").Router();
const Blogpost = require("../models/Blogpost");
const { getCurrentMonth } = require("../functions/blogFunctions");
const { blogpostValidation } = require("../validation/validation");

router.post("/createBlogpost", async (req, res) => {
  blogpostValidation(req.body);

  const todaysDate = new Date();
  let seconds = todaysDate.getSeconds();
  let minutes = todaysDate.getMinutes();
  let hours = todaysDate.getHours();
  let day = todaysDate.getDate();
  let month = todaysDate.getMonth() + 1;
  let year = todaysDate.getFullYear();

  const date = `${day} de ${getCurrentMonth(month)}, ${year}`;
  let createdAt = `${year}${month}${day}${hours}${minutes}${seconds}`;
  createdAt = parseInt(createdAt);

  // Create new blogpost
  const blogpost = new Blogpost({
    title: req.body.title,
    category: req.body.category,
    categoryColor: req.body.categoryColor,
    date: date,
    createdAt: createdAt,
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
