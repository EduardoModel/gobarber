import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token not provided',
    });
  }

  // Desconstruct the array that will be returned from the split operation
  const [, token] = authHeader.split(' ');

  try {
    // With promissify is possible to transform a function strucured into callback into a promise based
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Bind the user id to the req object to be utilized further inside the other routes
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token invalid',
    });
  }
};
