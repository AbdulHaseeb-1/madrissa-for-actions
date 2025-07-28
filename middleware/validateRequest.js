const taarufValidator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: result.error.errors.map((e) => e.message),
    });
  }
  req.body = result.data;
  next();
};

module.exports = { taarufValidator };
