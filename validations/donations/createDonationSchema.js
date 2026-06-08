const joi = require("joi");
const donationsSchema = joi
  .object({
    amount: joi.number().required().min(10),
  })
  .unknown(false);
module.exports = {
  body: donationsSchema,
};
