const getAllBlogpostTitles = (blogposts, blogpostTitles) => {
    blogposts.forEach(element => {
        blogpostTitles.push({
            title: element.title,
            id: element.id
        });
    });
}

module.exports.getAllBlogpostTitles = getAllBlogpostTitles;