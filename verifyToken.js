import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  if (req.path === '/users/login') {
    //   this path is the only path that no need auth-token
    return next();
  }

  const token = req.header('Auth-Token');
  if (!token) {
    const error = new Error();
    error.message = 'Missing token';
    error.status = 401;
    next(error);
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    next();
  } catch (err) {
    err.status = 400;
    next(err);
  }
}
