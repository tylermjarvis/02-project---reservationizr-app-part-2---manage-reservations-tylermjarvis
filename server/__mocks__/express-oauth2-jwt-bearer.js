const auth = jest.fn().mockImplementation((options) => (req, res, next) => {
  req.auth = {
    payload: {
      sub: "",
    },
  };
  next();
});

module.exports = { auth };
