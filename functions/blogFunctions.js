const getAllBlogpostTitles = (blogposts, blogpostTitles) => {
    blogposts.forEach(element => {
        blogpostTitles.push(element.title);
    });
}

module.exports.getAllBlogpostTitles = getAllBlogpostTitles;