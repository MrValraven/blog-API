const router = require('express').Router();
const Blogpost = require('../models/Blogpost');
const { blogpostValidation } = require('../validation/validation')
const { getAllBlogpostTitles } = require('../functions/blogFunctions')

router.get('/getAllBlogposts', async (req, res) => {

    const blogposts = await Blogpost.find({})

    if(!blogposts) {
        return res.status(400).send("Error! No blogposts available");
    }

    res.send(blogposts);
});

router.get('/getAllBlogpostTitles', async (req, res) => {

    const blogposts = await Blogpost.find({})

    if(!blogposts) {
        return res.status(400).send("Error! No blogposts available");
    }

    let blogpostTitles = [];

    getAllBlogpostTitles(blogposts, blogpostTitles);

    res.send(blogpostTitles);
});

router.get('/getBlogpost', async (req, res) => {

    const blogpost = await Blogpost.findOne({title: req.body.title});

    if(!blogpost) {
        return res.status(400).send("Error! Blogpost doesn't exist");
    }

    res.send(blogpost);

})

router.post('/createBlogpost', async (req, res) => {

    blogpostValidation(req.body);

     // Create new blogpost
     const blogpost = new Blogpost({
        title: req.body.title,
        category: req.body.category,
        categoryColor: req.body.categoryColor,
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
});

router.put('/updateBlogpost'), async (req, res) => {

    const blogpost = await Blogpost.findOne({title: req.body.title})

    if(!blogpost) {
        return res.status(400).send("Error! Blogpost doesn't exist");
    }

    try {
        const updatedBlogpost = await Blogpost.updateOne();
        res.send(updatedBlogpost)
    } catch (error) {
        res.status(400).send({message: error})
    }
}

router.delete('/deleteBlogpost', async (req, res) => {

    const blogpost = await Blogpost.findOne({title: req.body.title})

    if(!blogpost) {
        return res.status(400).send("Error! Blogpost doesn't exist");
    }

    try {
        const removedBlogpost = await blogpost.remove();
        res.send({message: "Blogpost deleted!"})
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;