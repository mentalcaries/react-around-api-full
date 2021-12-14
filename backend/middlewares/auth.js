const jwt = require('jsonwebtoken');

module.exports = (res, req, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  req.user = payload;
  next();
};
