const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Assumes payload has userId

    req.user = { id: decodedToken.userId }; // Use req.user instead of req.body

    next();
  } catch (error) {
    res.status(401).send({
      message: error.message,
      success: false
    });
  }
};
