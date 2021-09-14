const router = require('express').Router();
const Blogpost = require('../models/Blogpost');
const { blogpostValidation } = require('../validation/validation')

router.get('/getAllPosts', async (req, res) => {

    const blogposts = await Blogpost.find({})

    if(!blogposts) {
        return res.status(400).send("Error! No blogposts available");
    }

    res.send(blogposts);
});

router.post('/createBlogpost', async (req, res) => {

    blogpostValidation(req.body);

     // Create new blogpost
     const blogpost = new Blogpost({
        title: req.body.title,
        date: req.body.date,
        imageLink: req.body.imageLink,
        paragraphs: req.body.paragraphs,
        signature: req.body.signature,
    });

    try {
        //Save blogpost in Database
        const savedBlogpost = await blogpost.save();
        res.send({message: "Blog post added!"});
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;