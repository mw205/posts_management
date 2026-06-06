const joi = require("joi");

const postSchema = joi
  .object({
    title: joi.string(),
    body: joi.string(),
    userId: joi.number(),
    views: joi.number().default(0).min(0),
  })
  .unknown(false);
const paramsSchema = joi
  .object({
    id: joi.string().length(24).hex().required().messages({
      "string.length": "ID must be 24 characters long",
      "string.hex": "ID must be a valid hex string",
    }),
  })
  .unknown(false);

module.exports = {
  body: postSchema,
  params: paramsSchema,
};
