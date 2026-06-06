const APIError = require("../utils/APIError.js");

module.exports = (err, req, res, next) => {
  console.error("❌ Error: ", err);

  if (err.name === "Validation Error") {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    const message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, value: ${Object.values(err.keyValue)}`;
    return res.status(400).json({ message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  res.status(500).json("something went wrong");
};
