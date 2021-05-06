module.exports = {
  log: options => {
    return (req, res, next) => {
      if (options.enabled) {
        console.log("### LOG #### : ", req.body);
      }
      next();
    };
  }
};
