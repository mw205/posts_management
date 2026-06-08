const joi = require("joi");

const postSchema = joi
  .object({
    title: joi.string().required(),
    body: joi.string().required(),
    views: joi.number().default(0).min(0),
  })
  .unknown(false);
module.exports = {
  body: postSchema,
};
