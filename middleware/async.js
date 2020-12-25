module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      res.status(500).send("Something went wrong!");
      next(error);
    }
  };
};
