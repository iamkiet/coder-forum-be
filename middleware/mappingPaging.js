const mappingPaging = (req, res, next) => {
  const { page } = req.query;
  const limit = 2;
  const skip = Math.max(0, page) * limit;
  req.paging = {
    limit,
    skip,
  };
  next();
};

module.exports = mappingPaging;
