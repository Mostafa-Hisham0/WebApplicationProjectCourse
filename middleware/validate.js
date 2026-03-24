const validate =
  ({ bodySchema, paramsSchema }) =>
  (req, _res, next) => {
    if (bodySchema) {
      req.body = bodySchema.parse(req.body);
    }

    if (paramsSchema) {
      req.params = paramsSchema.parse(req.params);
    }

    next();
  };

module.exports = validate;
