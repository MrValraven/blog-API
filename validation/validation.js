const Joi = require("joi");

//Register Validation
const registerValidation = async (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  try {
    const validation = await schema.validateAsync(data);
    return validation;
  } catch (error) {
    res.send(error.details[0].message);
  }
};

//Login Validation
const loginValidation = async (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  try {
    const validation = await schema.validateAsync(data);
    return validation;
  } catch (error) {
    res.send(error.details[0].message);
  }
};
//Blogpost Validation
const blogpostValidation = async (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    category: Joi.array().required(),
    categoryColor: Joi.string().required(),
    imageLink: Joi.string().required(),
    paragraphs: Joi.array().required(),
    signature: Joi.string().required(),
  });

  try {
    const validation = await schema.validateAsync(data);
    return validation;
  } catch (error) {
    res.send(error.details[0].message);
  }
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.blogpostValidation = blogpostValidation;
